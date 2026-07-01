/* =========================================
   SMOOTH SCROLL JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Provide one safe global smooth-scroll system.
   - Handle same-page anchor links with sticky header offset.
   - Support homepage section navigation.
   - Support direct hash loading like /#projects.
   - Respect reduced-motion preference.
   - Close mobile menu safely after anchor click.
   - Dispatch events for active-nav.js and future modules.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const SMOOTH_SCROLL_SELECTORS = {
    header: "#site-header",
    mobilePanel: ".mobile-navigation-panel",
    mobileToggle: ".mobile-menu-toggle"
};

const SMOOTH_SCROLL_CLASSES = {
    bodyMenuOpen: "mobile-menu-open",
    headerMenuOpen: "mobile-menu-is-open"
};

const DEFAULT_HEADER_OFFSET = 120;
const DEFAULT_EXTRA_GAP = 14;
const INITIAL_HASH_RETRY_LIMIT = 24;
const INITIAL_HASH_RETRY_DELAY = 80;

/* =========================================
   2. State
========================================= */

let isInitialized = false;
let initialHashHandled = false;

/* =========================================
   3. Small Utilities
========================================= */

function isSmoothScrollEnabled() {
    return siteConfig?.features?.smoothScroll !== false;
}

function prefersReducedMotion() {
    const query = siteConfig?.ui?.reducedMotionQuery || "(prefers-reduced-motion: reduce)";
    return window.matchMedia(query).matches;
}

function getConfiguredHeaderOffset() {
    const offset = Number(siteConfig?.ui?.headerOffset);
    return Number.isFinite(offset) && offset > 0 ? offset : DEFAULT_HEADER_OFFSET;
}

function getHeaderOffset() {
    const header = document.querySelector(SMOOTH_SCROLL_SELECTORS.header);

    if (!header) {
        return getConfiguredHeaderOffset();
    }

    const headerHeight = header.getBoundingClientRect().height;

    if (!headerHeight) {
        return getConfiguredHeaderOffset();
    }

    return Math.ceil(headerHeight + DEFAULT_EXTRA_GAP);
}

function normalizePathname(pathname = "") {
    const normalized = String(pathname || "/").replace(/\/+$/, "");
    return normalized || "/";
}

function getURLFromHref(href = "") {
    try {
        return new URL(href, window.location.href);
    } catch (error) {
        return null;
    }
}

function isModifiedClick(event) {
    return Boolean(
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
    );
}

function isSamePageHashURL(url) {
    if (!url) {
        return false;
    }

    const sameOrigin = url.origin === window.location.origin;
    const samePath = normalizePathname(url.pathname) === normalizePathname(window.location.pathname);
    const hasHash = Boolean(url.hash && url.hash.length > 1);

    return sameOrigin && samePath && hasHash;
}

function getTargetFromHash(hash = "") {
    if (!hash || hash === "#") {
        return null;
    }

    let target = null;

    try {
        target = document.querySelector(hash);
    } catch (error) {
        return null;
    }

    return target;
}

function getScrollTopForTarget(targetElement) {
    if (!targetElement) {
        return 0;
    }

    if (targetElement.id === "home") {
        return 0;
    }

    const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
    return Math.max(targetTop - getHeaderOffset(), 0);
}

function updateURLHash(hash) {
    if (!hash || hash === window.location.hash) {
        return;
    }

    window.history.pushState(null, "", hash);
}

function focusTargetSafely(targetElement) {
    if (!targetElement || targetElement.id === "home") {
        return;
    }

    const hadTabIndex = targetElement.hasAttribute("tabindex");
    const previousTabIndex = targetElement.getAttribute("tabindex");

    if (!hadTabIndex) {
        targetElement.setAttribute("tabindex", "-1");
    }

    try {
        targetElement.focus({ preventScroll: true });
    } catch (error) {
        targetElement.focus();
    }

    if (!hadTabIndex) {
        targetElement.removeAttribute("tabindex");
    } else {
        targetElement.setAttribute("tabindex", previousTabIndex);
    }
}

function dispatchSmoothScrollEvent(eventName, detail = {}) {
    document.dispatchEvent(
        new CustomEvent(eventName, {
            detail
        })
    );
}

/* =========================================
   4. Mobile Menu Safety
========================================= */

function closeMobileMenuIfOpen() {
    const header = document.querySelector(SMOOTH_SCROLL_SELECTORS.header);

    if (!header || !header.classList.contains(SMOOTH_SCROLL_CLASSES.headerMenuOpen)) {
        return;
    }

    const toggleButton = header.querySelector(SMOOTH_SCROLL_SELECTORS.mobileToggle);
    const mobilePanel = header.querySelector(SMOOTH_SCROLL_SELECTORS.mobilePanel);

    document.body.classList.remove(SMOOTH_SCROLL_CLASSES.bodyMenuOpen);
    header.classList.remove(SMOOTH_SCROLL_CLASSES.headerMenuOpen);

    if (toggleButton) {
        toggleButton.setAttribute("aria-expanded", "false");
        toggleButton.setAttribute("aria-label", "Open navigation menu");
    }

    if (mobilePanel) {
        mobilePanel.setAttribute("aria-hidden", "true");
    }

    dispatchSmoothScrollEvent("mobile-menu:close", {
        reason: "smooth-scroll-link-click",
        header,
        panel: mobilePanel,
        isOpen: false
    });
}

/* =========================================
   5. Core Scroll Function
========================================= */

export function scrollToTarget(targetElement, options = {}) {
    if (!targetElement) {
        return false;
    }

    const hash = options.hash || `#${targetElement.id}`;
    const shouldUpdateHash = options.updateHash !== false;
    const shouldFocus = options.focus !== false;
    const top = getScrollTopForTarget(targetElement);
    const behavior = prefersReducedMotion() ? "auto" : "smooth";

    closeMobileMenuIfOpen();

    window.scrollTo({
        top,
        behavior
    });

    if (shouldUpdateHash && hash) {
        updateURLHash(hash);
    }

    if (shouldFocus) {
        window.setTimeout(function () {
            focusTargetSafely(targetElement);
        }, prefersReducedMotion() ? 0 : 350);
    }

    dispatchSmoothScrollEvent("smooth-scroll:target", {
        target: targetElement,
        hash,
        top,
        behavior
    });

    return true;
}

/* =========================================
   6. Click Handling
========================================= */

function handleAnchorClick(event) {
    if (event.defaultPrevented || isModifiedClick(event)) {
        return;
    }

    const link = event.target.closest("a[href]");

    if (!link) {
        return;
    }

    const href = link.getAttribute("href");

    if (!href || href === "#") {
        return;
    }

    if (link.hasAttribute("download")) {
        return;
    }

    if (link.getAttribute("target") === "_blank") {
        return;
    }

    if (link.dataset.smoothScroll === "false") {
        return;
    }

    const url = getURLFromHref(href);

    if (!isSamePageHashURL(url)) {
        return;
    }

    const targetElement = getTargetFromHash(url.hash);

    if (!targetElement) {
        return;
    }

    /*
       Capture-phase handling prevents duplicate smooth-scroll systems
       from also processing the same same-page anchor click.
    */
    event.preventDefault();
    event.stopImmediatePropagation();

    scrollToTarget(targetElement, {
        hash: url.hash,
        updateHash: true,
        focus: true
    });
}

/* =========================================
   7. Initial Hash Handling
========================================= */

function handleInitialHash(retryCount = 0) {
    if (initialHashHandled) {
        return;
    }

    const hash = window.location.hash;

    if (!hash || hash === "#") {
        initialHashHandled = true;
        return;
    }

    const targetElement = getTargetFromHash(hash);

    if (!targetElement) {
        if (retryCount < INITIAL_HASH_RETRY_LIMIT) {
            window.setTimeout(function () {
                handleInitialHash(retryCount + 1);
            }, INITIAL_HASH_RETRY_DELAY);
        }

        return;
    }

    initialHashHandled = true;

    /*
       Small delay allows JS-rendered homepage sections and header
       height to settle before scrolling.
    */
    window.setTimeout(function () {
        scrollToTarget(targetElement, {
            hash,
            updateHash: false,
            focus: false
        });
    }, 60);
}

function handleHashChange() {
    const targetElement = getTargetFromHash(window.location.hash);

    if (!targetElement) {
        return;
    }

    scrollToTarget(targetElement, {
        hash: window.location.hash,
        updateHash: false,
        focus: false
    });
}

/* =========================================
   8. Initializer
========================================= */

export function initSmoothScroll() {
    if (isInitialized) {
        return true;
    }

    if (!isSmoothScrollEnabled()) {
        return false;
    }

    isInitialized = true;

    /*
       Capture mode is intentional:
       it allows this file to become the single scroll controller
       and prevents duplicate local scroll listeners from handling
       the same anchor click.
    */
    document.addEventListener("click", handleAnchorClick, {
        capture: true,
        passive: false
    });

    window.addEventListener("hashchange", handleHashChange, {
        passive: true
    });

    if (document.readyState === "complete") {
        handleInitialHash();
    } else {
        window.addEventListener("load", function () {
            handleInitialHash();
        }, { once: true });
    }

    document.addEventListener("navigation:ready", function () {
        handleInitialHash();
    }, { once: true });

    dispatchSmoothScrollEvent("smooth-scroll:ready", {
        enabled: true
    });

    return true;
}

/* =========================================
   9. Boot Logic
========================================= */

function bootSmoothScroll() {
    initSmoothScroll();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootSmoothScroll, { once: true });
} else {
    bootSmoothScroll();
}