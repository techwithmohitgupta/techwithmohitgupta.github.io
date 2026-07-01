/* =========================================
   REVEAL JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Add safe reveal-on-scroll animations.
   - Work with JS-rendered homepage sections.
   - Work with future inner pages.
   - Use IntersectionObserver for performance.
   - Respect reduced-motion preference.
   - Avoid layout break and heavy animation.
   - Add optional skill progress animation.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const REVEAL_STYLE_ID = "mohit-reveal-style";

const REVEAL_CLASSES = {
    ready: "reveal-ready",
    item: "reveal-item",
    visible: "is-revealed",
    progressReady: "skill-progress-ready",
    progressVisible: "skill-progress-visible"
};

const REVEAL_SELECTORS = {
    app: "#app",
    main: "#main-content",

    /*
       Homepage selectors.
       These are safe because they target already successful
       cards/sections without changing structure.
    */
    homepageItems: [
        ".home-section-header",
        ".about-centered-header",
        ".contact-section-header",
        ".about-main-card",
        ".about-value-card",
        ".skills-progress-card",
        ".workflow-card",
        ".project-showcase-card",
        ".journey-card",
        ".contact-info-card",
        ".contact-form-card",
        ".footer-brand-block",
        ".footer-nav",
        ".footer-connect",
        ".footer-bottom"
    ].join(", "),

    /*
       Future inner page selectors.
       These will no-op safely if elements are not available.
    */
    genericItems: [
        ".section-header",
        ".section-card",
        ".card",
        ".project-card",
        ".skill-card",
        ".experience-card",
        ".timeline-item",
        ".contact-card",
        "[data-reveal]"
    ].join(", "),

    progressFill: ".skill-progress-fill"
};

const DEFAULT_REVEAL_THRESHOLD = 0.12;
const DEFAULT_REVEAL_ROOT_MARGIN = "0px 0px -80px 0px";

/* =========================================
   2. State
========================================= */

let isInitialized = false;
let observer = null;
let mutationObserver = null;

/* =========================================
   3. Small Utilities
========================================= */

function isRevealEnabled() {
    return siteConfig?.features?.revealAnimations !== false;
}

function prefersReducedMotion() {
    const query = siteConfig?.ui?.reducedMotionQuery || "(prefers-reduced-motion: reduce)";
    return window.matchMedia(query).matches;
}

function getRevealThreshold() {
    const threshold = Number(siteConfig?.ui?.revealThreshold);

    if (!Number.isFinite(threshold)) {
        return DEFAULT_REVEAL_THRESHOLD;
    }

    return Math.min(Math.max(threshold, 0), 1);
}

function getRevealRootMargin() {
    return siteConfig?.ui?.revealRootMargin || DEFAULT_REVEAL_ROOT_MARGIN;
}

function supportsIntersectionObserver() {
    return "IntersectionObserver" in window;
}

function safeArrayFromNodeList(nodeList) {
    return Array.from(nodeList || []);
}

function isElementVisible(element) {
    if (!element) {
        return false;
    }

    return Boolean(
        element.offsetWidth ||
        element.offsetHeight ||
        element.getClientRects().length
    );
}

function isInsideHero(element) {
    return Boolean(element?.closest?.("#home, .home-hero-centered"));
}

function dispatchRevealEvent(eventName, detail = {}) {
    document.dispatchEvent(
        new CustomEvent(eventName, {
            detail
        })
    );
}

/* =========================================
   4. CSS Injection
========================================= */

function injectRevealStyles() {
    if (document.getElementById(REVEAL_STYLE_ID)) {
        return;
    }

    const style = document.createElement("style");
    style.id = REVEAL_STYLE_ID;

    style.textContent = `
        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item} {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
            transition:
                opacity 0.72s ease,
                transform 0.72s ease;
            transition-delay: var(--reveal-delay, 0ms);
            will-change: opacity, transform;
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}.${REVEAL_CLASSES.visible} {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            will-change: auto;
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}[data-reveal="fade"] {
            transform: none;
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}[data-reveal="scale"] {
            transform: translate3d(0, 18px, 0) scale(0.985);
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}.${REVEAL_CLASSES.visible}[data-reveal="scale"] {
            transform: translate3d(0, 0, 0) scale(1);
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}[data-reveal="left"] {
            transform: translate3d(-22px, 0, 0);
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}[data-reveal="right"] {
            transform: translate3d(22px, 0, 0);
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}.${REVEAL_CLASSES.visible}[data-reveal="left"],
        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}.${REVEAL_CLASSES.visible}[data-reveal="right"] {
            transform: translate3d(0, 0, 0);
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.progressReady} {
            width: 0 !important;
            transition: width 1.05s ease;
            transition-delay: var(--reveal-delay, 0ms);
        }

        body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.progressReady}.${REVEAL_CLASSES.progressVisible} {
            width: var(--skill-level, 0%) !important;
        }

        @media (prefers-reduced-motion: reduce) {
            body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item},
            body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.item}.${REVEAL_CLASSES.visible} {
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
                will-change: auto !important;
            }

            body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.progressReady},
            body.${REVEAL_CLASSES.ready} .${REVEAL_CLASSES.progressReady}.${REVEAL_CLASSES.progressVisible} {
                width: var(--skill-level, 0%) !important;
                transition: none !important;
            }
        }
    `;

    document.head.appendChild(style);
}

/* =========================================
   5. Reveal Target Preparation
========================================= */

function getRevealCandidates() {
    const selectors = [
        REVEAL_SELECTORS.homepageItems,
        REVEAL_SELECTORS.genericItems
    ].join(", ");

    return safeArrayFromNodeList(document.querySelectorAll(selectors))
        .filter(isElementVisible)
        .filter(function (element) {
            /*
               Avoid animating hero above-the-fold content by default.
               Hero already has its own typing/particle behavior.
            */
            return !isInsideHero(element);
        });
}

function getRevealTypeForElement(element) {
    if (!element) {
        return "up";
    }

    if (element.dataset.reveal) {
        return element.dataset.reveal;
    }

    if (
        element.matches(".project-showcase-card") ||
        element.matches(".contact-info-card") ||
        element.matches(".contact-form-card") ||
        element.matches(".about-main-card")
    ) {
        return "scale";
    }

    if (element.matches(".footer-nav")) {
        return "left";
    }

    if (element.matches(".footer-connect")) {
        return "right";
    }

    return "up";
}

function getRevealDelay(index, element) {
    if (element?.dataset?.revealDelay) {
        return element.dataset.revealDelay;
    }

    /*
       Keep delays small for performance and smoothness.
    */
    const delay = Math.min(index * 45, 220);
    return `${delay}ms`;
}

function prepareRevealElement(element, index = 0) {
    if (!element || element.dataset.revealPrepared === "true") {
        return;
    }

    element.classList.add(REVEAL_CLASSES.item);
    element.dataset.revealPrepared = "true";
    element.dataset.reveal = getRevealTypeForElement(element);
    element.style.setProperty("--reveal-delay", getRevealDelay(index, element));
}

function prepareRevealElements() {
    const elements = getRevealCandidates();

    elements.forEach(function (element, index) {
        prepareRevealElement(element, index);
    });

    return elements;
}

/* =========================================
   6. Skill Progress Preparation
========================================= */

function getProgressFills() {
    return safeArrayFromNodeList(document.querySelectorAll(REVEAL_SELECTORS.progressFill))
        .filter(isElementVisible);
}

function prepareProgressFill(fill, index = 0) {
    if (!fill || fill.dataset.progressPrepared === "true") {
        return;
    }

    fill.dataset.progressPrepared = "true";
    fill.classList.add(REVEAL_CLASSES.progressReady);
    fill.style.setProperty("--reveal-delay", `${Math.min(index * 35, 180)}ms`);
}

function prepareProgressFills() {
    const fills = getProgressFills();

    fills.forEach(function (fill, index) {
        prepareProgressFill(fill, index);
    });

    return fills;
}

/* =========================================
   7. Reveal Actions
========================================= */

function revealElement(element) {
    if (!element) {
        return;
    }

    element.classList.add(REVEAL_CLASSES.visible);

    dispatchRevealEvent("reveal:item", {
        element
    });
}

function revealProgressFill(fill) {
    if (!fill) {
        return;
    }

    fill.classList.add(REVEAL_CLASSES.progressVisible);

    dispatchRevealEvent("reveal:progress", {
        element: fill
    });
}

function revealEverythingImmediately() {
    prepareRevealElements().forEach(revealElement);
    prepareProgressFills().forEach(revealProgressFill);

    document.body.classList.add(REVEAL_CLASSES.ready);

    dispatchRevealEvent("reveal:ready", {
        enabled: true,
        reducedMotion: true
    });
}

/* =========================================
   8. Observer Logic
========================================= */

function disconnectObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

function createObserver() {
    disconnectObserver();

    observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                const target = entry.target;

                if (target.classList.contains(REVEAL_CLASSES.progressReady)) {
                    revealProgressFill(target);
                } else {
                    revealElement(target);
                }

                observer.unobserve(target);
            });
        },
        {
            root: null,
            rootMargin: getRevealRootMargin(),
            threshold: getRevealThreshold()
        }
    );

    return observer;
}

function observePreparedItems() {
    const currentObserver = observer || createObserver();

    const revealElements = prepareRevealElements();
    const progressFills = prepareProgressFills();

    revealElements.forEach(function (element) {
        if (!element.classList.contains(REVEAL_CLASSES.visible)) {
            currentObserver.observe(element);
        }
    });

    progressFills.forEach(function (fill) {
        if (!fill.classList.contains(REVEAL_CLASSES.progressVisible)) {
            currentObserver.observe(fill);
        }
    });

    document.body.classList.add(REVEAL_CLASSES.ready);

    dispatchRevealEvent("reveal:refresh", {
        revealCount: revealElements.length,
        progressCount: progressFills.length
    });
}

/* =========================================
   9. Mutation Observer for JS-rendered Pages
========================================= */

function disconnectMutationObserver() {
    if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
    }
}

function initMutationObserver() {
    const app = document.querySelector(REVEAL_SELECTORS.app);
    const main = document.querySelector(REVEAL_SELECTORS.main);
    const target = app || main || document.body;

    if (!target || !("MutationObserver" in window)) {
        return;
    }

    disconnectMutationObserver();

    let refreshTimer = null;

    mutationObserver = new MutationObserver(function () {
        window.clearTimeout(refreshTimer);

        refreshTimer = window.setTimeout(function () {
            refreshReveal();
        }, 80);
    });

    mutationObserver.observe(target, {
        childList: true,
        subtree: true
    });
}

/* =========================================
   10. Public Refresh Function
========================================= */

export function refreshReveal() {
    if (!isRevealEnabled()) {
        return false;
    }

    if (prefersReducedMotion() || !supportsIntersectionObserver()) {
        revealEverythingImmediately();
        return true;
    }

    injectRevealStyles();
    observePreparedItems();

    return true;
}

/* =========================================
   11. Initializer
========================================= */

export function initReveal() {
    if (isInitialized) {
        refreshReveal();
        return true;
    }

    if (!isRevealEnabled()) {
        return false;
    }

    isInitialized = true;

    injectRevealStyles();

    if (prefersReducedMotion() || !supportsIntersectionObserver()) {
        revealEverythingImmediately();
        return true;
    }

    initMutationObserver();

    /*
       Multiple safe refresh points are intentional:
       - navigation.js renders header
       - home.js renders homepage after main.js
       - future page-control.js may render inner pages
    */
    refreshReveal();

    window.setTimeout(refreshReveal, 120);
    window.setTimeout(refreshReveal, 450);

    document.addEventListener("navigation:ready", refreshReveal);
    document.addEventListener("homepage:ready", refreshReveal);
    document.addEventListener("page-content:ready", refreshReveal);
    document.addEventListener("active-nav:ready", refreshReveal);
    document.addEventListener("smooth-scroll:ready", refreshReveal);

    window.addEventListener(
        "load",
        function () {
            refreshReveal();
        },
        { once: true }
    );

    document.dispatchEvent(
        new CustomEvent("reveal:ready", {
            detail: {
                enabled: true,
                reducedMotion: false
            }
        })
    );

    return true;
}

/* =========================================
   12. Boot Logic
========================================= */

function bootReveal() {
    initReveal();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootReveal, { once: true });
} else {
    bootReveal();
}