/* =========================================
   PAGE TRANSITION JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Smooth page-to-page transition for internal links.
   - Safe-mode navigation enhancement.
   - Does not affect same-page hash scrolling.
   - Does not affect external, mail, tel, WhatsApp, download,
     target="_blank", or modified-click links.
   - Controlled by siteConfig.features.pageTransitions.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const TRANSITION_IDS = {
    overlay: "page-transition-overlay",
    style: "page-transition-style"
};

const TRANSITION_CLASSES = {
    enabled: "page-transition-enabled",
    ready: "page-transition-ready",
    leaving: "page-transition-leaving",
    locked: "page-transition-locked"
};

const DEFAULT_OPTIONS = {
    leaveDelay: 260,
    minimumDelay: 120,
    label: "Loading next view"
};

/* =========================================
   2. State
========================================= */

let isInitialized = false;
let isTransitioning = false;
let navigationTimer = null;

/* =========================================
   3. Utilities
========================================= */

function isPageTransitionEnabled() {
    return siteConfig?.features?.pageTransitions === true;
}

function prefersReducedMotion() {
    const query = siteConfig?.ui?.reducedMotionQuery || "(prefers-reduced-motion: reduce)";
    return window.matchMedia(query).matches;
}

function canUsePageTransition() {
    return Boolean(isPageTransitionEnabled() && !prefersReducedMotion());
}

function getTransitionOptions() {
    return {
        leaveDelay: Number(siteConfig?.pageTransition?.leaveDelay || DEFAULT_OPTIONS.leaveDelay),
        minimumDelay: Number(siteConfig?.pageTransition?.minimumDelay || DEFAULT_OPTIONS.minimumDelay),
        label: siteConfig?.pageTransition?.label || DEFAULT_OPTIONS.label
    };
}

function dispatchTransitionEvent(eventName, detail = {}) {
    document.dispatchEvent(
        new CustomEvent(eventName, {
            detail
        })
    );
}

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
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

function getClosestAnchor(target) {
    if (!target?.closest) {
        return null;
    }

    return target.closest("a[href]");
}

function normalizeURL(href) {
    try {
        return new URL(href, window.location.href);
    } catch (error) {
        return null;
    }
}

function isSamePageHashNavigation(url) {
    if (!url) {
        return false;
    }

    const current = new URL(window.location.href);

    return (
        url.origin === current.origin &&
        url.pathname === current.pathname &&
        url.search === current.search &&
        Boolean(url.hash)
    );
}

function isSameExactURL(url) {
    if (!url) {
        return false;
    }

    return url.href === window.location.href;
}

function shouldIgnoreAnchor(anchor, event) {
    if (!anchor || !event) {
        return true;
    }

    if (event.defaultPrevented || isModifiedClick(event)) {
        return true;
    }

    if (anchor.hasAttribute("download")) {
        return true;
    }

    if (anchor.target && anchor.target !== "_self") {
        return true;
    }

    if (
        anchor.closest("[data-no-transition]") ||
        anchor.dataset.noTransition === "true"
    ) {
        return true;
    }

    const rawHref = anchor.getAttribute("href") || "";

    if (!rawHref || rawHref === "#") {
        return true;
    }

    const lowerHref = rawHref.trim().toLowerCase();

    if (
        lowerHref.startsWith("mailto:") ||
        lowerHref.startsWith("tel:") ||
        lowerHref.startsWith("sms:") ||
        lowerHref.startsWith("javascript:") ||
        lowerHref.startsWith("https://wa.me/") ||
        lowerHref.startsWith("http://wa.me/") ||
        lowerHref.startsWith("https://api.whatsapp.com/") ||
        lowerHref.startsWith("http://api.whatsapp.com/")
    ) {
        return true;
    }

    const url = normalizeURL(anchor.href);

    if (!url) {
        return true;
    }

    if (url.origin !== window.location.origin) {
        return true;
    }

    if (isSameExactURL(url)) {
        return true;
    }

    if (isSamePageHashNavigation(url)) {
        return true;
    }

    return false;
}

/* =========================================
   4. CSS Injection
========================================= */

function injectTransitionStyles() {
    if (document.getElementById(TRANSITION_IDS.style)) {
        return;
    }

    const style = document.createElement("style");
    style.id = TRANSITION_IDS.style;

    style.textContent = `
        #${TRANSITION_IDS.overlay} {
            position: fixed;
            inset: 0;
            z-index: 99998;
            display: grid;
            place-items: center;
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
            background:
                radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.22), transparent 32%),
                radial-gradient(circle at 82% 20%, rgba(124, 58, 237, 0.18), transparent 32%),
                linear-gradient(135deg, rgba(2, 6, 23, 0.96), rgba(15, 23, 42, 0.96));
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            transition:
                opacity 0.26s ease,
                visibility 0.26s ease;
        }

        #${TRANSITION_IDS.overlay}::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px);
            background-size: 34px 34px;
            opacity: 0.42;
        }

        #${TRANSITION_IDS.overlay}::after {
            content: "";
            position: absolute;
            top: 0;
            left: -30%;
            width: 30%;
            height: 3px;
            background: linear-gradient(90deg, transparent, #38bdf8, #7c3aed, transparent);
            box-shadow: 0 0 22px rgba(56, 189, 248, 0.55);
            animation: pageTransitionLine 1.1s ease-in-out infinite;
        }

        .page-transition-panel {
            position: relative;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 15px 18px;
            border: 1px solid rgba(148, 163, 184, 0.20);
            border-radius: 999px;
            background:
                linear-gradient(135deg, rgba(15, 23, 42, 0.82), rgba(2, 6, 23, 0.72));
            color: #e5f0ff;
            font-size: 0.92rem;
            font-weight: 900;
            line-height: 1;
            letter-spacing: 0.01em;
            box-shadow:
                0 24px 60px rgba(2, 6, 23, 0.40),
                inset 0 1px 0 rgba(255, 255, 255, 0.08);
            transform: translateY(10px) scale(0.98);
            opacity: 0;
            transition:
                transform 0.28s ease,
                opacity 0.28s ease;
        }

        .page-transition-dot {
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: #38bdf8;
            box-shadow:
                0 0 16px rgba(56, 189, 248, 0.72),
                0 0 30px rgba(37, 99, 235, 0.34);
            animation: pageTransitionPulse 0.9s ease-in-out infinite;
        }

        body.${TRANSITION_CLASSES.leaving} #${TRANSITION_IDS.overlay} {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        body.${TRANSITION_CLASSES.leaving} .page-transition-panel {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        body.${TRANSITION_CLASSES.leaving} .site-header,
        body.${TRANSITION_CLASSES.leaving} #main-content,
        body.${TRANSITION_CLASSES.leaving} main,
        body.${TRANSITION_CLASSES.leaving} .site-footer,
        body.${TRANSITION_CLASSES.leaving} .inner-footer-modern {
            filter: blur(2px);
            transform: translateY(-4px);
            opacity: 0.84;
            transition:
                filter 0.22s ease,
                transform 0.22s ease,
                opacity 0.22s ease;
        }

        body.${TRANSITION_CLASSES.locked} {
            pointer-events: none;
        }

        @keyframes pageTransitionPulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }

            50% {
                transform: scale(1.35);
                opacity: 0.72;
            }
        }

        @keyframes pageTransitionLine {
            0% {
                left: -30%;
            }

            100% {
                left: 100%;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            #${TRANSITION_IDS.overlay},
            .page-transition-panel,
            .page-transition-dot,
            body.${TRANSITION_CLASSES.leaving} .site-header,
            body.${TRANSITION_CLASSES.leaving} #main-content,
            body.${TRANSITION_CLASSES.leaving} main,
            body.${TRANSITION_CLASSES.leaving} .site-footer,
            body.${TRANSITION_CLASSES.leaving} .inner-footer-modern {
                animation: none !important;
                transition: none !important;
                transform: none !important;
                filter: none !important;
            }
        }
    `;

    document.head.appendChild(style);
}

/* =========================================
   5. Overlay
========================================= */

function getOverlay() {
    return document.getElementById(TRANSITION_IDS.overlay);
}

function createOverlay() {
    const existingOverlay = getOverlay();

    if (existingOverlay) {
        return existingOverlay;
    }

    const options = getTransitionOptions();

    const overlay = document.createElement("div");
    overlay.id = TRANSITION_IDS.overlay;
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
        <div class="page-transition-panel">
            <span class="page-transition-dot" aria-hidden="true"></span>
            <span>${escapeHTML(options.label)}</span>
        </div>
    `;

    document.body.appendChild(overlay);

    return overlay;
}

function removeOverlay() {
    getOverlay()?.remove();
}

/* =========================================
   6. Transition Actions
========================================= */

function resetTransitionState() {
    isTransitioning = false;

    if (navigationTimer) {
        window.clearTimeout(navigationTimer);
        navigationTimer = null;
    }

    document.body.classList.remove(
        TRANSITION_CLASSES.leaving,
        TRANSITION_CLASSES.locked
    );
}

function navigateWithTransition(url) {
    if (!url || isTransitioning) {
        return;
    }

    isTransitioning = true;

    createOverlay();

    document.body.classList.add(
        TRANSITION_CLASSES.leaving,
        TRANSITION_CLASSES.locked
    );

    dispatchTransitionEvent("page-transition:leave", {
        url
    });

    const options = getTransitionOptions();
    const delay = Math.max(options.leaveDelay, options.minimumDelay);

    navigationTimer = window.setTimeout(function () {
        window.location.href = url;
    }, delay);
}

/* =========================================
   7. Event Handlers
========================================= */

function handleDocumentClick(event) {
    if (!canUsePageTransition()) {
        return;
    }

    const anchor = getClosestAnchor(event.target);

    if (shouldIgnoreAnchor(anchor, event)) {
        return;
    }

    const url = normalizeURL(anchor.href);

    if (!url) {
        return;
    }

    event.preventDefault();

    navigateWithTransition(url.href);
}

function handlePageShow(event) {
    resetTransitionState();

    if (event.persisted) {
        document.body.classList.add(TRANSITION_CLASSES.ready);
    }

    dispatchTransitionEvent("page-transition:pageshow", {
        persisted: Boolean(event.persisted)
    });
}

function handlePageHide() {
    resetTransitionState();
}

function handleKeyDown(event) {
    if (event.key === "Escape" && isTransitioning) {
        resetTransitionState();
    }
}

/* =========================================
   8. Public API
========================================= */

export function refreshPageTransition() {
    if (!canUsePageTransition()) {
        document.body.classList.remove(
            TRANSITION_CLASSES.enabled,
            TRANSITION_CLASSES.ready,
            TRANSITION_CLASSES.leaving,
            TRANSITION_CLASSES.locked
        );

        removeOverlay();

        return false;
    }

    injectTransitionStyles();
    createOverlay();

    document.body.classList.add(
        TRANSITION_CLASSES.enabled,
        TRANSITION_CLASSES.ready
    );

    dispatchTransitionEvent("page-transition:ready", {
        enabled: true
    });

    return true;
}

export function startPageTransition(url) {
    if (!canUsePageTransition()) {
        window.location.href = url;
        return false;
    }

    navigateWithTransition(url);
    return true;
}

/* =========================================
   9. Initializer
========================================= */

export function initPageTransition() {
    if (isInitialized) {
        refreshPageTransition();
        return true;
    }

    isInitialized = true;

    refreshPageTransition();

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);

    document.addEventListener("navigation:ready", refreshPageTransition);
    document.addEventListener("page-content:ready", refreshPageTransition);
    document.addEventListener("homepage:ready", refreshPageTransition);

    return true;
}

/* =========================================
   10. Boot Logic
========================================= */

function bootPageTransition() {
    initPageTransition();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPageTransition, { once: true });
} else {
    bootPageTransition();
}