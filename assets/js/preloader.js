/* =========================================
   PRELOADER JS - LOGO ONLY SPLASH
   Mohit Gupta Data Analytics Portfolio

   Shows only website logo in center.
   First visit: 4.5 seconds.
   Same session next pages: 1.3 seconds.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Settings
========================================= */

const PRELOADER_ID = "site-preloader";
const PRELOADER_STYLE_ID = "site-preloader-style";

const PRELOADER_CLASSES = {
    visible: "preloader-visible",
    hiding: "preloader-hiding",
    done: "preloader-done",
    firstVisit: "preloader-first-visit",
    repeatVisit: "preloader-repeat-visit"
};

const DEFAULT_PRELOADER = {
    firstDuration: 4500,
    repeatDuration: 1300,
    removeDelay: 520,
    sessionKey: "mohit_portfolio_logo_splash_seen",
    logoSrc: "/assets/images/brand/mohit-gupta-logo.png",
    logoAlt: "Mohit Gupta Logo"
};

/* =========================================
   2. State
========================================= */

let initialized = false;
let startTime = 0;
let activeDuration = DEFAULT_PRELOADER.firstDuration;
let hideTimer = null;
let removeTimer = null;

/* =========================================
   3. Helpers
========================================= */

function isEnabled() {
    return siteConfig?.features?.preloader === true;
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getOptions() {
    const config = siteConfig?.preloader || {};

    return {
        firstDuration: Number(config.firstDuration ?? DEFAULT_PRELOADER.firstDuration),
        repeatDuration: Number(config.repeatDuration ?? DEFAULT_PRELOADER.repeatDuration),
        removeDelay: Number(config.removeDelay ?? DEFAULT_PRELOADER.removeDelay),
        sessionKey: config.sessionKey || DEFAULT_PRELOADER.sessionKey,
        logoSrc: config.logoSrc || DEFAULT_PRELOADER.logoSrc,
        logoAlt: config.logoAlt || DEFAULT_PRELOADER.logoAlt
    };
}

function hasSeenThisSession() {
    const options = getOptions();

    try {
        return sessionStorage.getItem(options.sessionKey) === "true";
    } catch {
        return false;
    }
}

function markSeenThisSession() {
    const options = getOptions();

    try {
        sessionStorage.setItem(options.sessionKey, "true");
    } catch {
        // Ignore storage errors safely.
    }
}

function getDuration() {
    const options = getOptions();
    const repeatVisit = hasSeenThisSession();

    if (prefersReducedMotion()) {
        return repeatVisit ? 500 : 900;
    }

    return repeatVisit ? options.repeatDuration : options.firstDuration;
}

function getPreloader() {
    return document.getElementById(PRELOADER_ID);
}

function clearPreloaderTimers() {
    if (hideTimer) {
        window.clearTimeout(hideTimer);
        hideTimer = null;
    }

    if (removeTimer) {
        window.clearTimeout(removeTimer);
        removeTimer = null;
    }
}

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================================
   4. Styles
========================================= */

function injectStyles() {
    if (document.getElementById(PRELOADER_STYLE_ID)) {
        return;
    }

    const style = document.createElement("style");
    style.id = PRELOADER_STYLE_ID;

    style.textContent = `
        body.${PRELOADER_CLASSES.visible} {
            overflow: hidden;
        }

        #${PRELOADER_ID} {
            position: fixed;
            inset: 0;
            z-index: 999999;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 32px;
            background:
                radial-gradient(circle at 50% 44%, rgba(37, 99, 235, 0.10), transparent 34%),
                linear-gradient(135deg, #f8fbff 0%, #eef6ff 48%, #ffffff 100%);

            opacity: 1;
            visibility: visible;
            pointer-events: auto;

            transition:
                opacity 0.52s ease,
                visibility 0.52s ease;
        }

        #${PRELOADER_ID}::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px);
            background-size: 44px 44px;
            opacity: 0.45;
            pointer-events: none;
        }

        .preloader-logo-only {
            position: relative;
            z-index: 1;

            display: flex;
            align-items: center;
            justify-content: center;

            width: min(72vw, 620px);

            animation: preloaderLogoPulse 2.6s ease-in-out infinite;
        }

        .preloader-logo-only img {
            display: block;
            width: 100%;
            max-width: 620px;
            height: auto;
            object-fit: contain;

            filter:
                drop-shadow(0 24px 50px rgba(15, 23, 42, 0.12))
                drop-shadow(0 0 32px rgba(59, 130, 246, 0.10));
        }

        body.${PRELOADER_CLASSES.hiding} #${PRELOADER_ID} {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        body.${PRELOADER_CLASSES.hiding} .preloader-logo-only {
            transform: scale(0.985);
            opacity: 0;
            transition:
                transform 0.48s ease,
                opacity 0.48s ease;
        }

        body.${PRELOADER_CLASSES.done} #${PRELOADER_ID} {
            display: none;
        }

        @keyframes preloaderLogoPulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }

            50% {
                transform: scale(1.025);
                opacity: 0.96;
            }
        }

        @media (max-width: 768px) {
            .preloader-logo-only {
                width: min(78vw, 460px);
            }
        }

        @media (max-width: 480px) {
            #${PRELOADER_ID} {
                padding: 24px;
            }

            .preloader-logo-only {
                width: min(84vw, 350px);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            #${PRELOADER_ID},
            .preloader-logo-only,
            body.${PRELOADER_CLASSES.hiding} .preloader-logo-only {
                animation: none !important;
                transition: none !important;
                transform: none !important;
            }
        }
    `;

    document.head.appendChild(style);
}

/* =========================================
   5. Create Preloader
========================================= */

function createPreloader() {
    const existing = getPreloader();

    if (existing) {
        return existing;
    }

    const options = getOptions();

    const preloader = document.createElement("div");
    preloader.id = PRELOADER_ID;
    preloader.setAttribute("role", "status");
    preloader.setAttribute("aria-label", options.logoAlt);

    preloader.innerHTML = `
        <div class="preloader-logo-only">
            <img
                src="${escapeHTML(options.logoSrc)}"
                alt="${escapeHTML(options.logoAlt)}"
                loading="eager"
                decoding="async"
            >
        </div>
    `;

    document.body.appendChild(preloader);

    return preloader;
}

/* =========================================
   6. Hide / Remove
========================================= */

function removePreloader() {
    const preloader = getPreloader();

    if (preloader) {
        preloader.remove();
    }

    document.body.classList.remove(
        PRELOADER_CLASSES.visible,
        PRELOADER_CLASSES.hiding,
        PRELOADER_CLASSES.firstVisit,
        PRELOADER_CLASSES.repeatVisit
    );

    document.body.classList.add(PRELOADER_CLASSES.done);
}

export function hidePreloader(force = false) {
    const preloader = getPreloader();

    if (!preloader) {
        return false;
    }

    if (hideTimer) {
        window.clearTimeout(hideTimer);
        hideTimer = null;
    }

    const elapsed = Date.now() - startTime;
    const remaining = force ? 0 : Math.max(activeDuration - elapsed, 0);

    hideTimer = window.setTimeout(function () {
        markSeenThisSession();

        document.body.classList.add(PRELOADER_CLASSES.hiding);
        document.body.classList.remove(PRELOADER_CLASSES.visible);

        const options = getOptions();

        removeTimer = window.setTimeout(function () {
            clearPreloaderTimers();
            removePreloader();
        }, prefersReducedMotion() ? 0 : options.removeDelay);
    }, prefersReducedMotion() ? 0 : remaining);

    return true;
}

/* =========================================
   7. Show Preloader
========================================= */

export function showPreloader() {
    if (!isEnabled()) {
        removePreloader();
        return false;
    }

    const repeatVisit = hasSeenThisSession();

    startTime = Date.now();
    activeDuration = getDuration();

    clearPreloaderTimers();
    injectStyles();
    createPreloader();

    document.body.classList.add(PRELOADER_CLASSES.visible);
    document.body.classList.remove(PRELOADER_CLASSES.hiding, PRELOADER_CLASSES.done);

    document.body.classList.toggle(PRELOADER_CLASSES.firstVisit, !repeatVisit);
    document.body.classList.toggle(PRELOADER_CLASSES.repeatVisit, repeatVisit);

    hideTimer = window.setTimeout(function () {
        hidePreloader();
    }, activeDuration);

    return true;
}

/* =========================================
   8. Lifecycle
========================================= */

function handlePageShow(event) {
    if (event.persisted) {
        hidePreloader(true);
    }
}

function handlePageHide() {
    clearPreloaderTimers();
}

function handleVisibilityChange() {
    if (document.hidden) {
        return;
    }

    const preloader = getPreloader();

    if (!preloader) {
        return;
    }

    const elapsed = Date.now() - startTime;

    if (elapsed >= activeDuration) {
        hidePreloader(true);
    }
}

/* =========================================
   9. Init
========================================= */

export function initPreloader() {
    if (initialized) {
        return true;
    }

    initialized = true;

    if (!isEnabled()) {
        removePreloader();
        return false;
    }

    showPreloader();

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return true;
}

/* =========================================
   10. Boot
========================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPreloader, { once: true });
} else {
    initPreloader();
}