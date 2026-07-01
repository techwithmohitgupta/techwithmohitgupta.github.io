/* =========================================
   NAVIGATION JS
   Global dynamic header / navbar renderer.

   Purpose:
   - Render same global header across homepage and inner pages.
   - Homepage uses same-page section links.
   - Inner pages use page-to-page links.
   - Provides desktop nav + mobile hamburger menu structure.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

const siteHeader = document.getElementById("site-header");

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getCurrentPageName() {
    return document.body.dataset.page || "home";
}

function isHomepage() {
    return getCurrentPageName() === "home";
}

function getNavigationItems() {
    return isHomepage() ? siteConfig.homepageNavigation : siteConfig.pageNavigation;
}

function getLogoHref() {
    return isHomepage() ? "#home" : siteConfig.pageLinks.home;
}

function getCTAHref() {
    return isHomepage() ? siteConfig.cta.homepageHref : siteConfig.cta.pageHref;
}

function isPageLinkActive(navItem) {
    const currentPage = getCurrentPageName();

    if (isHomepage()) {
        return navItem.href === "#home";
    }

    const pageMap = {
        home: "/",
        about: "/about/",
        skills: "/skills/",
        projects: "/projects/",
        experience: "/experience/",
        contact: "/contact/",
        "not-found": "/404/"
    };

    return pageMap[currentPage] === navItem.href;
}

function isCTAActive() {
    return getCurrentPageName() === "contact";
}

function createNavigationLinks(linkClass = "nav-link") {
    return getNavigationItems()
        .map(function (navItem) {
            const isActive = isPageLinkActive(navItem);

            return `
                <a
                    href="${escapeHTML(navItem.href)}"
                    class="${escapeHTML(linkClass)} ${isActive ? "active" : ""}"
                    ${isActive ? 'aria-current="page"' : ""}
                >
                    ${escapeHTML(navItem.label)}
                </a>
            `;
        })
        .join("");
}

function renderNavigation() {
    if (!siteHeader) {
        return;
    }

    const ctaActiveClass = isCTAActive() ? " active" : "";
    const ctaAriaCurrent = isCTAActive() ? 'aria-current="page"' : "";

    siteHeader.innerHTML = `
        <div class="container">
            <nav class="navbar" aria-label="Main navigation">
                <a href="${escapeHTML(getLogoHref())}" class="logo" aria-label="${escapeHTML(siteConfig.brand.name)} Home">
                    <img
                        src="${escapeHTML(siteConfig.brand.logoImage)}"
                        alt="${escapeHTML(siteConfig.brand.logoAlt)}"
                        class="navbar-brand-logo"
                        loading="eager"
                        decoding="async"
                    >
                </a>

                <div class="nav-links" aria-label="Primary navigation">
                    ${createNavigationLinks("nav-link")}
                </div>

                <a
                    href="${escapeHTML(getCTAHref())}"
                    class="nav-cta${ctaActiveClass}"
                    ${ctaAriaCurrent}
                >
                    ${escapeHTML(siteConfig.cta.label)}
                </a>

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
                </button>
            </nav>

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

                        <a
                            href="${escapeHTML(getCTAHref())}"
                            class="mobile-nav-link mobile-nav-cta${ctaActiveClass}"
                            ${ctaAriaCurrent}
                        >
                            ${escapeHTML(siteConfig.cta.label)}
                        </a>
                    </div>
                </div>
            </div>

            <div class="mobile-navigation-overlay" aria-hidden="true"></div>
        </div>
    `;
}

renderNavigation();