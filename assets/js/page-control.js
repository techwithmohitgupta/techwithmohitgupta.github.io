/* =========================================
   PAGE CONTROL JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Global page-level safety and control layer.
   - Detect current page and sync body state.
   - Support homepage-only mode safely.
   - Convert hold/unfinished page links into safe homepage anchors.
   - Enhance external link safety.
   - Dispatch page-ready events for reveal, active-nav, and future modules.
   - Prepare safe future page-specific module loading without duplicate loading.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const PAGE_CONTROL_CLASSES = {
    jsEnabled: "js-enabled",
    pageReady: "page-ready",
    innerPage: "inner-page",
    homepageOnlyMode: "mode-homepage-only",
    fullSiteMode: "mode-full-site",
    pageHold: "page-status-hold",
    pageActive: "page-status-active",
    pageFuture: "page-status-future"
};

const PAGE_CONTROL_SELECTORS = {
    footer: ".site-footer",
    footerNav: ".footer-nav",
    footerCTA: ".footer-cta-link",
    app: "#app",
    main: "#main-content",
    anchors: "a[href]"
};

const PAGE_MODULES = {
    home: "./home.js",
    about: "./about.js",
    skills: "./skills.js",
    projects: "./projects.js",
    experience: "./experience.js",
    contact: "./contact.js",
    notFound: "./not-found.js"
};

const TEXT_TO_PAGE_KEY = {
    home: "home",
    about: "about",
    skills: "skills",
    projects: "projects",
    experience: "experience",
    contact: "contact",
    "let's connect": "contact",
    "lets connect": "contact",
    "get in touch": "contact"
};

/* =========================================
   2. State
========================================= */

let isInitialized = false;
let mutationObserver = null;
let currentPageModuleLoaded = false;

/* =========================================
   3. Small Utilities
========================================= */

function isPageControlEnabled() {
    return siteConfig?.features?.pageControl !== false;
}

function isHomepageOnlyMode() {
    return Boolean(
        siteConfig?.site?.isHomepageOnlyMode ||
        siteConfig?.site?.mode === "homepage-only"
    );
}

function normalizePageKey(value = "") {
    const key = String(value)
        .trim()
        .toLowerCase()
        .replace("#", "")
        .replace("/", "")
        .replace(/\s+/g, "-");

    if (key === "not-found" || key === "404") {
        return "notFound";
    }

    return key || "home";
}

function normalizePath(pathname = "") {
    const normalized = String(pathname || "/").replace(/\/+$/, "");
    return normalized || "/";
}

function safeArray(value) {
    return Array.isArray(value) ? value : [];
}

function isExternalURL(href = "") {
    return /^https?:\/\//i.test(String(href));
}

function isSpecialProtocol(href = "") {
    return /^(mailto:|tel:|sms:|whatsapp:)/i.test(String(href));
}

function getURL(href = "") {
    try {
        return new URL(href, window.location.href);
    } catch (error) {
        return null;
    }
}

function getBodyPageKey() {
    return normalizePageKey(document.body?.dataset?.page || "");
}

function inferPageKeyFromPath() {
    const currentPath = normalizePath(window.location.pathname);
    const routes = siteConfig?.routes || siteConfig?.pageLinks || {};

    const routeEntries = Object.entries(routes);

    for (const [key, route] of routeEntries) {
        if (normalizePath(route) === currentPath) {
            return normalizePageKey(key);
        }
    }

    if (currentPath === "/404") {
        return "notFound";
    }

    return "home";
}

function getCurrentPageKey() {
    const bodyPageKey = getBodyPageKey();

    if (bodyPageKey) {
        return bodyPageKey;
    }

    return inferPageKeyFromPath();
}

function getPageConfig(pageKey = "home") {
    const normalizedKey = normalizePageKey(pageKey);
    return siteConfig?.pages?.[normalizedKey] || null;
}

function getPageStatus(pageKey = "home") {
    return getPageConfig(pageKey)?.status || (pageKey === "home" ? "active" : "hold");
}

function isPageOnHold(pageKey = "home") {
    return getPageStatus(pageKey) === "hold";
}

function getAnchor(pageKey = "home") {
    const normalizedKey = normalizePageKey(pageKey);
    return siteConfig?.anchors?.[normalizedKey] || "#home";
}

function getRoute(pageKey = "home") {
    const normalizedKey = normalizePageKey(pageKey);
    return siteConfig?.routes?.[normalizedKey] || siteConfig?.pageLinks?.[normalizedKey] || "/";
}

function getHomeRoute() {
    return getRoute("home") || "/";
}

function isCurrentPageHomepage() {
    return getCurrentPageKey() === "home";
}

function getSafeHomepageAnchor(pageKey = "home") {
    const anchor = getAnchor(pageKey);

    if (isCurrentPageHomepage()) {
        return anchor;
    }

    return `${getHomeRoute()}${anchor}`;
}

function getSafeHrefForPage(pageKey = "home") {
    const normalizedKey = normalizePageKey(pageKey);

    if (isHomepageOnlyMode()) {
        return getSafeHomepageAnchor(normalizedKey);
    }

    if (isPageOnHold(normalizedKey)) {
        return getSafeHomepageAnchor(normalizedKey);
    }

    return getRoute(normalizedKey);
}

function getPageKeyFromURL(url) {
    if (!url || url.origin !== window.location.origin) {
        return "";
    }

    const routes = siteConfig?.routes || siteConfig?.pageLinks || {};
    const currentPath = normalizePath(url.pathname);

    for (const [key, route] of Object.entries(routes)) {
        if (normalizePath(route) === currentPath) {
            return normalizePageKey(key);
        }
    }

    return "";
}

function normalizeLinkText(text = "") {
    return String(text)
        .replace(/\s+/g, " ")
        .replace(/[→↗]/g, "")
        .trim()
        .toLowerCase();
}

function inferPageKeyFromLink(link) {
    if (!link) {
        return "";
    }

    const datasetKey =
        link.dataset.pageKey ||
        link.dataset.navKey ||
        link.dataset.sectionTarget ||
        link.dataset.footerKey ||
        "";

    if (datasetKey) {
        return normalizePageKey(datasetKey);
    }

    const ariaLabelKey = normalizeLinkText(link.getAttribute("aria-label") || "");
    const textKey = normalizeLinkText(link.textContent || "");

    if (TEXT_TO_PAGE_KEY[ariaLabelKey]) {
        return TEXT_TO_PAGE_KEY[ariaLabelKey];
    }

    if (TEXT_TO_PAGE_KEY[textKey]) {
        return TEXT_TO_PAGE_KEY[textKey];
    }

    return "";
}

function isFooterLink(link) {
    return Boolean(link?.closest?.(PAGE_CONTROL_SELECTORS.footer));
}

function dispatchPageControlEvent(eventName, detail = {}) {
    document.dispatchEvent(
        new CustomEvent(eventName, {
            detail: {
                page: getCurrentPageKey(),
                homepageOnlyMode: isHomepageOnlyMode(),
                ...detail
            }
        })
    );
}

/* =========================================
   4. Body State
========================================= */

function syncBodyPageState() {
    const pageKey = getCurrentPageKey();
    const pageStatus = getPageStatus(pageKey);

    document.documentElement.classList.add(PAGE_CONTROL_CLASSES.jsEnabled);
    document.body.classList.add(PAGE_CONTROL_CLASSES.jsEnabled);

    document.body.dataset.page = pageKey === "notFound" ? "not-found" : pageKey;
    document.body.dataset.pageStatus = pageStatus;
    document.body.dataset.siteMode = isHomepageOnlyMode() ? "homepage-only" : "full-site";

    document.body.classList.add(`page-${pageKey === "notFound" ? "not-found" : pageKey}`);

    if (pageKey !== "home") {
        document.body.classList.add(PAGE_CONTROL_CLASSES.innerPage);
    }

    document.body.classList.toggle(PAGE_CONTROL_CLASSES.homepageOnlyMode, isHomepageOnlyMode());
    document.body.classList.toggle(PAGE_CONTROL_CLASSES.fullSiteMode, !isHomepageOnlyMode());

    document.body.classList.remove(
        PAGE_CONTROL_CLASSES.pageHold,
        PAGE_CONTROL_CLASSES.pageActive,
        PAGE_CONTROL_CLASSES.pageFuture
    );

    if (pageStatus === "active") {
        document.body.classList.add(PAGE_CONTROL_CLASSES.pageActive);
    } else if (pageStatus === "future") {
        document.body.classList.add(PAGE_CONTROL_CLASSES.pageFuture);
    } else {
        document.body.classList.add(PAGE_CONTROL_CLASSES.pageHold);
    }

    return {
        pageKey,
        pageStatus
    };
}

/* =========================================
   5. Link Safety / Homepage-Only Routing
========================================= */

function enhanceExternalLink(link, href) {
    if (!link || !href) {
        return;
    }

    const isExternal = isExternalURL(href);

    if (!isExternal) {
        return;
    }

    if (link.getAttribute("target") === "_blank") {
        const currentRel = link.getAttribute("rel") || "";
        const relParts = new Set(
            currentRel
                .split(" ")
                .map(function (item) {
                    return item.trim();
                })
                .filter(Boolean)
        );

        relParts.add("noopener");
        relParts.add("noreferrer");

        link.setAttribute("rel", Array.from(relParts).join(" "));
    }
}

function enhanceEmptyFooterLink(link) {
    if (!link || !isFooterLink(link)) {
        return false;
    }

    const pageKey = inferPageKeyFromLink(link);

    if (!pageKey) {
        return false;
    }

    const safeHref = getSafeHrefForPage(pageKey);

    link.setAttribute("href", safeHref);
    link.dataset.pageControlEnhanced = "true";
    link.dataset.pageKey = pageKey;

    return true;
}

function enhanceHoldRouteLink(link, href) {
    if (!link || !href || href === "#") {
        return false;
    }

    if (isSpecialProtocol(href) || isExternalURL(href)) {
        return false;
    }

    if (href.startsWith("#")) {
        return false;
    }

    const url = getURL(href);
    const pageKeyFromURL = getPageKeyFromURL(url);

    if (!pageKeyFromURL) {
        return false;
    }

    const shouldUseSafeAnchor = isHomepageOnlyMode() || isPageOnHold(pageKeyFromURL);

    if (!shouldUseSafeAnchor) {
        return false;
    }

    const safeHref = getSafeHrefForPage(pageKeyFromURL);

    link.setAttribute("href", safeHref);
    link.dataset.pageControlEnhanced = "true";
    link.dataset.pageKey = pageKeyFromURL;

    return true;
}

function enhanceLink(link) {
    if (!link || link.dataset.pageControlChecked === "true") {
        return;
    }

    const rawHref = link.getAttribute("href");
    const href = rawHref === null ? "" : rawHref.trim();

    enhanceExternalLink(link, href);

    if (!href) {
        enhanceEmptyFooterLink(link);
        link.dataset.pageControlChecked = "true";
        return;
    }

    enhanceHoldRouteLink(link, href);

    link.dataset.pageControlChecked = "true";
}

function refreshLinks() {
    const links = Array.from(document.querySelectorAll(PAGE_CONTROL_SELECTORS.anchors));

    links.forEach(enhanceLink);

    dispatchPageControlEvent("page-control:links-ready", {
        count: links.length
    });

    return links.length;
}

function handleDocumentClick(event) {
    const link = event.target.closest?.("a[href]");

    if (!link) {
        return;
    }

    const rawHref = link.getAttribute("href") || "";

    /*
       This handles dynamically-added links that were not enhanced yet.
    */
    if (!rawHref.trim()) {
        const pageKey = inferPageKeyFromLink(link);

        if (!pageKey) {
            return;
        }

        const safeHref = getSafeHrefForPage(pageKey);

        link.setAttribute("href", safeHref);
        link.dataset.pageControlEnhanced = "true";
        link.dataset.pageControlChecked = "true";

        /*
           Let smooth-scroll handle same-page hash on next user click.
           For the current click, navigate safely.
        */
        event.preventDefault();
        window.location.href = safeHref;
        return;
    }

    const url = getURL(rawHref);
    const pageKeyFromURL = getPageKeyFromURL(url);

    if (!pageKeyFromURL) {
        return;
    }

    const shouldUseSafeAnchor = isHomepageOnlyMode() || isPageOnHold(pageKeyFromURL);

    if (!shouldUseSafeAnchor) {
        return;
    }

    const safeHref = getSafeHrefForPage(pageKeyFromURL);

    if (safeHref && safeHref !== rawHref) {
        event.preventDefault();
        link.setAttribute("href", safeHref);
        link.dataset.pageControlEnhanced = "true";
        link.dataset.pageControlChecked = "true";
        window.location.href = safeHref;
    }
}

/* =========================================
   6. Future Page Module Loading
========================================= */

function shouldAutoLoadPageModule() {
    /*
       Default is intentionally false for safe mode.

       Why?
       - Homepage currently loads home.js separately in index.html.
       - Some inner pages may also directly include their page JS.
       - Auto-loading now could create duplicate page-specific execution.

       Future activation options:
       - Add data-auto-page-module="true" on body, OR
       - Add siteConfig.features.autoPageModules = true
    */

    return Boolean(
        document.body?.dataset?.autoPageModule === "true" ||
        siteConfig?.features?.autoPageModules === true
    );
}

async function loadCurrentPageModule() {
    if (currentPageModuleLoaded) {
        return false;
    }

    if (!shouldAutoLoadPageModule()) {
        return false;
    }

    const pageKey = getCurrentPageKey();
    const modulePath = PAGE_MODULES[pageKey];

    if (!modulePath) {
        return false;
    }

    currentPageModuleLoaded = true;

    try {
        const pageModule = await import(modulePath);

        if (typeof pageModule.default === "function") {
            pageModule.default();
        } else if (typeof pageModule.initPage === "function") {
            pageModule.initPage();
        }

        dispatchPageControlEvent("page-control:module-loaded", {
            pageKey,
            modulePath
        });

        return true;
    } catch (error) {
        currentPageModuleLoaded = false;

        console.warn(`[page-control] Could not load page module: ${modulePath}`, error);

        dispatchPageControlEvent("page-control:module-error", {
            pageKey,
            modulePath,
            error
        });

        return false;
    }
}

/* =========================================
   7. Dynamic Content Watch
========================================= */

function disconnectMutationObserver() {
    if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
    }
}

function initMutationObserver() {
    if (!("MutationObserver" in window)) {
        return;
    }

    const app = document.querySelector(PAGE_CONTROL_SELECTORS.app);
    const main = document.querySelector(PAGE_CONTROL_SELECTORS.main);
    const target = app || main || document.body;

    if (!target) {
        return;
    }

    disconnectMutationObserver();

    let refreshTimer = null;

    mutationObserver = new MutationObserver(function () {
        window.clearTimeout(refreshTimer);

        refreshTimer = window.setTimeout(function () {
            refreshPageControl({
                reason: "mutation"
            });
        }, 120);
    });

    mutationObserver.observe(target, {
        childList: true,
        subtree: true
    });
}

/* =========================================
   8. Public Refresh Function
========================================= */

export function getPageControlState() {
    return {
        page: getCurrentPageKey(),
        status: getPageStatus(getCurrentPageKey()),
        homepageOnlyMode: isHomepageOnlyMode(),
        autoPageModules: shouldAutoLoadPageModule()
    };
}

export function refreshPageControl(options = {}) {
    if (!isPageControlEnabled()) {
        return false;
    }

    const state = syncBodyPageState();
    const linkCount = refreshLinks();

    dispatchPageControlEvent("page-content:ready", {
        reason: options.reason || "refresh",
        pageKey: state.pageKey,
        pageStatus: state.pageStatus,
        linkCount
    });

    return true;
}

/* =========================================
   9. Initializer
========================================= */

export async function initPageControl() {
    if (isInitialized) {
        refreshPageControl({
            reason: "already-initialized"
        });

        return true;
    }

    if (!isPageControlEnabled()) {
        return false;
    }

    isInitialized = true;

    syncBodyPageState();
    refreshLinks();

    document.addEventListener("click", handleDocumentClick, {
        capture: true,
        passive: false
    });

    initMutationObserver();

    /*
       Safe refresh points:
       - navigation.js renders header
       - home.js renders homepage content
       - reveal/active-nav/smooth-scroll may need page-content event
    */
    document.addEventListener("navigation:ready", function () {
        refreshPageControl({
            reason: "navigation-ready"
        });
    });

    document.addEventListener("homepage:ready", function () {
        refreshPageControl({
            reason: "homepage-ready"
        });
    });

    window.addEventListener(
        "load",
        function () {
            refreshPageControl({
                reason: "window-load"
            });
        },
        { once: true }
    );

    window.setTimeout(function () {
        refreshPageControl({
            reason: "delayed-120"
        });
    }, 120);

    window.setTimeout(function () {
        refreshPageControl({
            reason: "delayed-500"
        });
    }, 500);

    await loadCurrentPageModule();

    document.body.classList.add(PAGE_CONTROL_CLASSES.pageReady);

    dispatchPageControlEvent("page-control:ready", {
        state: getPageControlState()
    });

    dispatchPageControlEvent("page-content:ready", {
        reason: "page-control-ready",
        state: getPageControlState()
    });

    return true;
}

/* =========================================
   10. Boot Logic
========================================= */

function bootPageControl() {
    initPageControl();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPageControl, { once: true });
} else {
    bootPageControl();
}