/* =========================================
   ACTIVE NAV JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Keep desktop and mobile navigation active states synced.
   - Highlight the current homepage section while scrolling.
   - Support direct hash URLs like /#projects and /#contact.
   - Sync nav links, mobile nav links, desktop CTA, and mobile CTA.
   - Update aria-current safely for accessibility.
   - Work with navigation.js and smooth-scroll.js.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const ACTIVE_NAV_SELECTORS = {
    header: "#site-header",
    desktopLinks: ".nav-link",
    mobileLinks: ".mobile-nav-link",
    desktopCTA: ".nav-cta",
    mobileCTA: ".mobile-nav-cta",
    section: "section[id], [data-section-id]"
};

const ACTIVE_NAV_CLASSES = {
    active: "active"
};

const DEFAULT_HEADER_OFFSET = 120;
const DEFAULT_SCROLL_THROTTLE = 80;

/* =========================================
   2. State
========================================= */

let isInitialized = false;
let ticking = false;
let lastActiveKey = "";
let observer = null;

/* =========================================
   3. Small Utilities
========================================= */

function isActiveNavEnabled() {
    return siteConfig?.features?.activeNav !== false;
}

function isHomepage() {
    return (document.body?.dataset?.page || "home") === "home";
}

function isHomepageOnlyMode() {
    return Boolean(
        siteConfig?.site?.isHomepageOnlyMode ||
        siteConfig?.site?.mode === "homepage-only"
    );
}

function getCurrentPageKey() {
    const page = document.body?.dataset?.page || "home";

    if (page === "not-found") {
        return "notFound";
    }

    return page;
}

function getConfiguredHeaderOffset() {
    const offset = Number(siteConfig?.ui?.headerOffset);
    return Number.isFinite(offset) && offset > 0 ? offset : DEFAULT_HEADER_OFFSET;
}

function getHeaderOffset() {
    const header = document.querySelector(ACTIVE_NAV_SELECTORS.header);

    if (!header) {
        return getConfiguredHeaderOffset();
    }

    const height = header.getBoundingClientRect().height;

    if (!height) {
        return getConfiguredHeaderOffset();
    }

    return Math.ceil(height + 16);
}

function normalizeKey(value = "") {
    return String(value)
        .trim()
        .toLowerCase()
        .replace("#", "")
        .replace("not-found", "notFound");
}

function mapSectionToNavKey(sectionId = "") {
    const key = normalizeKey(sectionId);

    const sectionMap = {
        home: "home",
        about: "about",
        skills: "skills",
        workflow: "skills",
        projects: "projects",
        experience: "experience",
        contact: "contact"
    };

    return sectionMap[key] || key || "home";
}

function getHashKey() {
    const hash = window.location.hash;

    if (!hash || hash === "#") {
        return "";
    }

    return mapSectionToNavKey(hash);
}

function getHeader() {
    return document.querySelector(ACTIVE_NAV_SELECTORS.header);
}

function getAllNavElements() {
    const header = getHeader();

    if (!header) {
        return [];
    }

    return Array.from(
        header.querySelectorAll(
            [
                ACTIVE_NAV_SELECTORS.desktopLinks,
                ACTIVE_NAV_SELECTORS.mobileLinks,
                ACTIVE_NAV_SELECTORS.desktopCTA,
                ACTIVE_NAV_SELECTORS.mobileCTA
            ].join(", ")
        )
    );
}

function getSectionElements() {
    return Array.from(document.querySelectorAll(ACTIVE_NAV_SELECTORS.section))
        .filter(function (section) {
            const id = section.id || section.dataset.sectionId || "";
            return Boolean(id);
        });
}

function getSectionId(section) {
    if (!section) {
        return "";
    }

    return section.id || section.dataset.sectionId || "";
}

function isSectionVisible(section) {
    if (!section) {
        return false;
    }

    const rect = section.getBoundingClientRect();
    return rect.height > 0 && rect.width > 0;
}

function getActiveKeyFromCurrentScroll() {
    const sections = getSectionElements().filter(isSectionVisible);

    if (!sections.length) {
        return isHomepage() ? "home" : getCurrentPageKey();
    }

    const headerOffset = getHeaderOffset();
    const scrollPosition = window.scrollY + headerOffset + 40;

    let activeSectionId = "home";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;

        if (sectionTop <= scrollPosition) {
            activeSectionId = getSectionId(section);
        }
    });

    /*
       If user is near the bottom, make sure the final section can become active.
    */
    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );

    const viewportBottom = window.scrollY + window.innerHeight;

    if (viewportBottom >= documentHeight - 8) {
        const lastSection = sections[sections.length - 1];
        activeSectionId = getSectionId(lastSection);
    }

    return mapSectionToNavKey(activeSectionId);
}

function getInitialActiveKey() {
    if (isHomepage()) {
        return getHashKey() || getActiveKeyFromCurrentScroll() || "home";
    }

    if (isHomepageOnlyMode()) {
        return "home";
    }

    return getCurrentPageKey();
}

function clearAriaCurrent(element) {
    if (!element) {
        return;
    }

    element.removeAttribute("aria-current");
}

function setAriaCurrent(element) {
    if (!element) {
        return;
    }

    element.setAttribute("aria-current", "page");
}

function dispatchActiveNavEvent(activeKey) {
    document.dispatchEvent(
        new CustomEvent("active-nav:change", {
            detail: {
                activeKey,
                page: getCurrentPageKey(),
                isHomepage: isHomepage(),
                homepageOnlyMode: isHomepageOnlyMode()
            }
        })
    );
}

/* =========================================
   4. Core Active State Logic
========================================= */

export function setActiveNav(activeKey = "home", options = {}) {
    const normalizedActiveKey = mapSectionToNavKey(activeKey);
    const navElements = getAllNavElements();

    if (!navElements.length) {
        return false;
    }

    navElements.forEach(function (element) {
        const navKey = mapSectionToNavKey(
            element.dataset.navKey ||
            element.dataset.sectionTarget ||
            ""
        );

        const isActive = navKey === normalizedActiveKey;

        element.classList.toggle(ACTIVE_NAV_CLASSES.active, isActive);

        if (isActive) {
            setAriaCurrent(element);
        } else {
            clearAriaCurrent(element);
        }
    });

    if (lastActiveKey !== normalizedActiveKey || options.forceEvent) {
        lastActiveKey = normalizedActiveKey;
        dispatchActiveNavEvent(normalizedActiveKey);
    }

    return true;
}

function updateActiveNavFromScroll() {
    if (!isHomepage()) {
        setActiveNav(getInitialActiveKey());
        return;
    }

    const activeKey = getActiveKeyFromCurrentScroll();
    setActiveNav(activeKey);
}

function requestActiveNavUpdate() {
    if (ticking) {
        return;
    }

    ticking = true;

    window.requestAnimationFrame(function () {
        updateActiveNavFromScroll();
        ticking = false;
    });
}

function updateActiveNavFromHash() {
    const hashKey = getHashKey();

    if (hashKey) {
        setActiveNav(hashKey);
        return;
    }

    updateActiveNavFromScroll();
}

/* =========================================
   5. IntersectionObserver Support
========================================= */

function disconnectObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

function initObserver() {
    if (!isHomepage()) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        return;
    }

    disconnectObserver();

    const sections = getSectionElements();

    if (!sections.length) {
        return;
    }

    const headerOffset = getHeaderOffset();

    observer = new IntersectionObserver(
        function () {
            requestActiveNavUpdate();
        },
        {
            root: null,
            rootMargin: `-${headerOffset}px 0px -55% 0px`,
            threshold: [0, 0.12, 0.25, 0.5]
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

/* =========================================
   6. Event Handlers
========================================= */

function handleScroll() {
    requestActiveNavUpdate();
}

function handleResize() {
    initObserver();
    requestActiveNavUpdate();
}

function handleHashChange() {
    window.setTimeout(updateActiveNavFromHash, 40);
}

function handleSmoothScrollTarget(event) {
    const target = event?.detail?.target;
    const hash = event?.detail?.hash;

    if (target) {
        setActiveNav(mapSectionToNavKey(getSectionId(target)));
        return;
    }

    if (hash) {
        setActiveNav(mapSectionToNavKey(hash));
    }
}

function handleNavigationReady() {
    window.setTimeout(function () {
        setActiveNav(getInitialActiveKey(), { forceEvent: true });
        initObserver();
    }, 40);
}

function handlePageContentReady() {
    window.setTimeout(function () {
        setActiveNav(getInitialActiveKey(), { forceEvent: true });
        initObserver();
    }, 80);
}

/* =========================================
   7. Initializer
========================================= */

export function initActiveNav() {
    if (isInitialized) {
        return true;
    }

    if (!isActiveNavEnabled()) {
        return false;
    }

    isInitialized = true;

    document.addEventListener("scroll", handleScroll, {
        passive: true
    });

    window.addEventListener("resize", handleResize, {
        passive: true
    });

    window.addEventListener("hashchange", handleHashChange, {
        passive: true
    });

    document.addEventListener("smooth-scroll:target", handleSmoothScrollTarget);
    document.addEventListener("navigation:ready", handleNavigationReady);
    document.addEventListener("homepage:ready", handlePageContentReady);
    document.addEventListener("page-content:ready", handlePageContentReady);

    /*
       Initial delayed runs:
       Useful because homepage content is rendered by home.js after DOM ready.
    */
    window.setTimeout(function () {
        setActiveNav(getInitialActiveKey(), { forceEvent: true });
        initObserver();
    }, 60);

    window.setTimeout(function () {
        setActiveNav(getInitialActiveKey(), { forceEvent: true });
        initObserver();
    }, 350);

    document.dispatchEvent(
        new CustomEvent("active-nav:ready", {
            detail: {
                enabled: true
            }
        })
    );

    return true;
}

/* =========================================
   8. Boot Logic
========================================= */

function bootActiveNav() {
    initActiveNav();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootActiveNav, { once: true });
} else {
    bootActiveNav();
}