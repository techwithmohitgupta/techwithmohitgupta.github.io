/* =========================================
   NAVIGATION JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Render global website header/navigation.
   - Support homepage-only mode safely.
   - Support future full-site mode.
   - Render desktop navigation, CTA, mobile hamburger,
     mobile navigation panel, close button, and overlay.
   - Keep markup compatible with mobile-menu.js and CSS.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Small Utilities
========================================= */

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function safeArray(value) {
    return Array.isArray(value) ? value : [];
}

function getBodyPageName() {
    return document.body?.dataset?.page || "home";
}

function isHomepage() {
    return getBodyPageName() === "home";
}

function isHomepageOnlyMode() {
    return Boolean(siteConfig?.site?.isHomepageOnlyMode || siteConfig?.site?.mode === "homepage-only");
}

function getCurrentHash() {
    return window.location.hash || "";
}

function isExternalURL(href = "") {
    return /^https?:\/\//i.test(String(href));
}

function createExternalLinkAttrs(href = "") {
    if (!isExternalURL(href)) {
        return "";
    }

    return 'target="_blank" rel="noopener noreferrer"';
}

function normalizePageKey(key = "") {
    return String(key)
        .trim()
        .toLowerCase()
        .replace("not-found", "notFound");
}

function getRoute(pageKey = "home") {
    const normalizedKey = normalizePageKey(pageKey);
    return siteConfig?.routes?.[normalizedKey] || siteConfig?.pageLinks?.[normalizedKey] || "/";
}

function getAnchor(pageKey = "home") {
    const normalizedKey = normalizePageKey(pageKey);
    return siteConfig?.anchors?.[normalizedKey] || "#home";
}

function getHomepageLink(pageKey = "home") {
    const anchor = getAnchor(pageKey);

    if (isHomepage()) {
        return anchor;
    }

    return `${getRoute("home")}${anchor}`;
}

function getSafePageLink(pageKey = "home") {
    if (isHomepageOnlyMode()) {
        return getHomepageLink(pageKey);
    }

    return getRoute(pageKey);
}

function getLogoHref() {
    if (isHomepage()) {
        return getAnchor("home");
    }

    return getRoute("home");
}

function getCTAHref() {
    if (isHomepageOnlyMode()) {
        return getHomepageLink("contact");
    }

    return isHomepage()
        ? siteConfig?.cta?.homepageHref || getAnchor("contact")
        : siteConfig?.cta?.pageHref || getRoute("contact");
}

/* =========================================
   2. Navigation Data Helpers
========================================= */

function getHomepageNavigationItems() {
    const navItems = safeArray(siteConfig?.homepageNavigation);

    return navItems.map(function (item) {
        const pageKey = item.sectionId || item.pageKey || item.key || item.label?.toLowerCase() || "home";

        return {
            label: item.label || "Navigation Item",
            href: isHomepage() ? item.href || getAnchor(pageKey) : getHomepageLink(pageKey),
            pageKey,
            sectionId: item.sectionId || pageKey
        };
    });
}

function getPageNavigationItems() {
    const navItems = safeArray(siteConfig?.pageNavigation);

    return navItems.map(function (item) {
        const pageKey = item.pageKey || item.key || item.label?.toLowerCase() || "home";

        return {
            label: item.label || "Navigation Item",
            href: getSafePageLink(pageKey),
            pageKey,
            sectionId: item.sectionId || pageKey
        };
    });
}

function getNavigationItems() {
    if (isHomepage() || isHomepageOnlyMode()) {
        return getHomepageNavigationItems();
    }

    return getPageNavigationItems();
}

function getActivePageKeyFromHash() {
    const hash = getCurrentHash();

    if (!hash) {
        return "home";
    }

    const hashKey = hash.replace("#", "").trim();

    const hashToNavMap = {
        home: "home",
        about: "about",
        skills: "skills",
        workflow: "skills",
        projects: "projects",
        experience: "experience",
        contact: "contact"
    };

    return hashToNavMap[hashKey] || "home";
}

function getCurrentPageKey() {
    const currentPage = getBodyPageName();

    if (currentPage === "not-found") {
        return "notFound";
    }

    return currentPage || "home";
}

function isNavigationItemActive(navItem = {}) {
    if (isHomepage()) {
        const activeKey = getActivePageKeyFromHash();
        return navItem.pageKey === activeKey || navItem.sectionId === activeKey;
    }

    if (isHomepageOnlyMode()) {
        return navItem.pageKey === "home";
    }

    return navItem.pageKey === getCurrentPageKey();
}

function isCTAActive() {
    if (isHomepage()) {
        return getActivePageKeyFromHash() === "contact";
    }

    return getCurrentPageKey() === "contact";
}

/* =========================================
   3. Markup Helpers
========================================= */

function createIcon(iconClass = "") {
    if (!iconClass) {
        return "";
    }

    return `<i class="${escapeHTML(iconClass)}" aria-hidden="true"></i>`;
}

function createAriaCurrent(isActive) {
    return isActive ? 'aria-current="page"' : "";
}

function createNavigationLinks(linkClass = "nav-link") {
    return getNavigationItems()
        .map(function (navItem) {
            const isActive = isNavigationItemActive(navItem);
            const safeHref = navItem.href || "#home";
            const pageKey = navItem.pageKey || "";
            const sectionId = navItem.sectionId || pageKey;

            return `
                <a
                    href="${escapeHTML(safeHref)}"
                    class="${escapeHTML(linkClass)}${isActive ? " active" : ""}"
                    data-nav-key="${escapeHTML(pageKey)}"
                    data-section-target="${escapeHTML(sectionId)}"
                    ${createAriaCurrent(isActive)}
                    ${createExternalLinkAttrs(safeHref)}
                >
                    <span>${escapeHTML(navItem.label)}</span>
                </a>
            `;
        })
        .join("");
}

function createDesktopCTA() {
    const isActive = isCTAActive();
    const href = getCTAHref();
    const label = siteConfig?.cta?.label || "Let’s Connect";

    return `
        <a
            href="${escapeHTML(href)}"
            class="nav-cta${isActive ? " active" : ""}"
            data-nav-key="contact"
            data-section-target="contact"
            ${createAriaCurrent(isActive)}
            ${createExternalLinkAttrs(href)}
        >
            <span>${escapeHTML(label)}</span>
        </a>
    `;
}

function createMobileCTA() {
    const isActive = isCTAActive();
    const href = getCTAHref();
    const label = siteConfig?.cta?.label || "Let’s Connect";
    const icon = createIcon(siteConfig?.cta?.icon || "fa-solid fa-envelope");

    return `
        <a
            href="${escapeHTML(href)}"
            class="mobile-nav-link mobile-nav-cta${isActive ? " active" : ""}"
            data-nav-key="contact"
            data-section-target="contact"
            ${createAriaCurrent(isActive)}
            ${createExternalLinkAttrs(href)}
        >
            <span>${escapeHTML(label)}</span>
            ${icon}
        </a>
    `;
}

function createLogoMarkup() {
    const logoHref = getLogoHref();
    const brandName = siteConfig?.brand?.name || "Mohit Gupta";
    const logoImage = siteConfig?.brand?.logoImage || "";
    const logoAlt = siteConfig?.brand?.logoAlt || `${brandName} Logo`;

    if (!logoImage) {
        return `
            <a
                href="${escapeHTML(logoHref)}"
                class="logo"
                aria-label="${escapeHTML(brandName)} Home"
            >
                <span class="navbar-brand-text">${escapeHTML(siteConfig?.brand?.logoText || brandName)}</span>
            </a>
        `;
    }

    return `
        <a
            href="${escapeHTML(logoHref)}"
            class="logo"
            aria-label="${escapeHTML(brandName)} Home"
        >
            <img
                src="${escapeHTML(logoImage)}"
                alt="${escapeHTML(logoAlt)}"
                class="navbar-brand-logo"
                loading="eager"
                decoding="async"
            >
        </a>
    `;
}

function createMobileNavigationPanel() {
    return `
        <div
            id="mobile-navigation-panel"
            class="mobile-navigation-panel"
            aria-hidden="true"
        >
            <div class="mobile-navigation-inner">
                <div class="mobile-navigation-top">
                    <span class="mobile-navigation-title">Menu</span>

                    <button
                        type="button"
                        class="mobile-menu-close"
                        aria-label="Close navigation menu"
                    >
                        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                    </button>
                </div>

                <div class="mobile-nav-links" aria-label="Mobile navigation">
                    ${createNavigationLinks("mobile-nav-link")}
                    ${createMobileCTA()}
                </div>
            </div>
        </div>

        <div class="mobile-navigation-overlay" aria-hidden="true"></div>
    `;
}

/* =========================================
   4. Render Navigation
========================================= */

export function renderNavigation() {
    if (siteConfig?.features?.navigation === false) {
        return false;
    }

    const siteHeader = document.getElementById("site-header");

    if (!siteHeader) {
        return false;
    }

    const brandName = siteConfig?.brand?.name || "Mohit Gupta";

    siteHeader.innerHTML = `
        <div class="container">
            <nav class="navbar" aria-label="Main navigation">
                ${createLogoMarkup()}

                <div class="nav-links" aria-label="Primary navigation">
                    ${createNavigationLinks("nav-link")}
                </div>

                ${createDesktopCTA()}

                <button
                    type="button"
                    class="mobile-menu-toggle"
                    aria-label="Open navigation menu"
                    aria-controls="mobile-navigation-panel"
                    aria-expanded="false"
                >
                    <span class="mobile-menu-line" aria-hidden="true"></span>
                    <span class="mobile-menu-line" aria-hidden="true"></span>
                    <span class="mobile-menu-line" aria-hidden="true"></span>
                    <span class="sr-only">Open ${escapeHTML(brandName)} navigation menu</span>
                </button>
            </nav>

            ${createMobileNavigationPanel()}
        </div>
    `;

    siteHeader.dataset.navigationReady = "true";

    document.dispatchEvent(
        new CustomEvent("navigation:ready", {
            detail: {
                page: getBodyPageName(),
                homepageOnlyMode: isHomepageOnlyMode()
            }
        })
    );

    return true;
}

/* =========================================
   5. Initializer
========================================= */

function initNavigation() {
    renderNavigation();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavigation, { once: true });
} else {
    initNavigation();
}