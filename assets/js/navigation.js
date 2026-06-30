/* =========================================
   NAVIGATION JS
   Renders dynamic navbar based on page type.
========================================= */

import { siteConfig } from "./config.js";

/* Select header container from HTML */
const siteHeader = document.getElementById("site-header");

/* Get current page name from body data-page */
function getCurrentPageName() {
    return document.body.dataset.page || "home";
}

/* Check if current page is homepage */
function isHomepage() {
    return getCurrentPageName() === "home";
}

/* Get navigation links based on page type */
function getNavigationItems() {
    if (isHomepage()) {
        return siteConfig.homepageNavigation;
    }

    return siteConfig.pageNavigation;
}

/* Get logo link based on page type */
function getLogoHref() {
    if (isHomepage()) {
        return "#home";
    }

    return siteConfig.pageLinks.home;
}

/* Get CTA link based on page type */
function getCTAHref() {
    if (isHomepage()) {
        return siteConfig.cta.homepageHref;
    }

    return siteConfig.cta.pageHref;
}

/* Check active state for non-home pages */
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
        contact: "/contact/"
    };

    return pageMap[currentPage] === navItem.href;
}

/* Create navigation links */
function createNavigationLinks() {
    return getNavigationItems()
        .map(function (navItem) {
            const isActive = isPageLinkActive(navItem);

            return `
                <a 
                    href="${navItem.href}" 
                    class="nav-link ${isActive ? "active" : ""}"
                    ${isActive ? 'aria-current="page"' : ""}
                >
                    ${navItem.label}
                </a>
            `;
        })
        .join("");
}

/* Render navigation */
function renderNavigation() {
    if (!siteHeader) {
        return;
    }

    siteHeader.innerHTML = `
        <div class="container">
            <nav class="navbar" aria-label="Main navigation">

                <a href="${getLogoHref()}" class="logo" aria-label="${siteConfig.brand.name} Home">
                    <img
                        src="${siteConfig.brand.logoImage}"
                        alt="${siteConfig.brand.logoAlt}"
                        class="navbar-brand-logo"
                        loading="eager"
                        decoding="async"
                    >
                </a>

                <div class="nav-links">
                    ${createNavigationLinks()}
                </div>

                <a href="${getCTAHref()}" class="nav-cta">
                    ${siteConfig.cta.label}
                </a>

            </nav>
        </div>
    `;
}

/* Initialize navigation */
renderNavigation();