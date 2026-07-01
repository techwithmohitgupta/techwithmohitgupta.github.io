/* =========================================
   CURSOR JS - ADVANCED ANALYTICS PULSE CURSOR
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Premium custom cursor for desktop experience.
   - Dot + ring + glow + contextual label.
   - Interactive states for links, buttons, cards, WhatsApp and text fields.
   - Click ripple feedback.
   - Disabled on mobile/touch and reduced-motion.
   - Controlled by siteConfig.features.customCursor.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const CURSOR_IDS = {
    dot: "custom-cursor-dot",
    ring: "custom-cursor-ring",
    glow: "custom-cursor-glow",
    label: "custom-cursor-label",
    style: "custom-cursor-style"
};

const CURSOR_CLASSES = {
    enabled: "custom-cursor-enabled",
    visible: "custom-cursor-visible",
    hidden: "custom-cursor-hidden",
    hovering: "custom-cursor-hovering",
    clicking: "custom-cursor-clicking",
    link: "custom-cursor-link",
    button: "custom-cursor-button",
    card: "custom-cursor-card",
    text: "custom-cursor-text",
    whatsapp: "custom-cursor-whatsapp"
};

const SELECTORS = {
    interactive: [
        "a[href]",
        "button",
        "input",
        "textarea",
        "select",
        "label",
        "[contenteditable='true']",
        "[role='button']",
        "[tabindex]:not([tabindex='-1'])",
        ".home-btn",
        ".nav-link",
        ".nav-cta",
        ".mobile-nav-link",
        ".project-card",
        ".project-action",
        ".skill-card",
        ".experience-card",
        ".workflow-step",
        ".stat-card",
        ".contact-card",
        ".inner-footer-socials a",
        ".quick-whatsapp-button"
    ].join(", "),

    textInput: [
        "input",
        "textarea",
        "select",
        "[contenteditable='true']"
    ].join(", "),

    buttons: [
        "button",
        ".home-btn",
        ".nav-cta",
        ".mobile-nav-cta",
        ".contact-submit-btn",
        "[role='button']"
    ].join(", "),

    cards: [
        ".project-card",
        ".skill-card",
        ".experience-card",
        ".workflow-step",
        ".stat-card",
        ".contact-card",
        ".dashboard-card",
        ".analytics-card"
    ].join(", "),

    whatsapp: ".quick-whatsapp-button"
};

/* =========================================
   2. State
========================================= */

let isInitialized = false;

let dotElement = null;
let ringElement = null;
let glowElement = null;
let labelElement = null;

let animationFrame = null;

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

let glowX = 0;
let glowY = 0;

let isVisible = false;
let activeMode = "";
let activeLabel = "";

/* =========================================
   3. Utilities
========================================= */

function isCursorEnabled() {
    return siteConfig?.features?.customCursor === true;
}

function prefersReducedMotion() {
    const query = siteConfig?.ui?.reducedMotionQuery || "(prefers-reduced-motion: reduce)";
    return window.matchMedia(query).matches;
}

function isTouchDevice() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
    );
}

function canUseCustomCursor() {
    return Boolean(
        isCursorEnabled() &&
        !isTouchDevice() &&
        !prefersReducedMotion() &&
        window.matchMedia("(min-width: 981px)").matches
    );
}

function dispatchCursorEvent(eventName, detail = {}) {
    document.dispatchEvent(
        new CustomEvent(eventName, {
            detail
        })
    );
}

function getClosestTarget(target, selector) {
    if (!target?.closest) {
        return null;
    }

    try {
        return target.closest(selector);
    } catch (error) {
        return null;
    }
}

function cleanLabel(value = "") {
    return String(value)
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 18);
}

function getReadableLabel(element) {
    if (!element) {
        return "";
    }

    const customLabel = element.getAttribute("data-cursor-label");

    if (customLabel) {
        return cleanLabel(customLabel);
    }

    if (getClosestTarget(element, SELECTORS.whatsapp)) {
        return "Chat";
    }

    if (getClosestTarget(element, SELECTORS.textInput)) {
        return "Type";
    }

    if (getClosestTarget(element, SELECTORS.cards)) {
        return "Explore";
    }

    if (getClosestTarget(element, SELECTORS.buttons)) {
        return "Action";
    }

    if (element.matches?.("a[href]")) {
        const text = cleanLabel(element.textContent);

        if (text) {
            return text.length > 14 ? "Open" : text;
        }

        return "Open";
    }

    const link = getClosestTarget(element, "a[href]");

    if (link) {
        const text = cleanLabel(link.textContent);
        return text.length > 14 ? "Open" : text || "Open";
    }

    return "";
}

function setBodyMode(mode = "") {
    const body = document.body;

    body.classList.remove(
        CURSOR_CLASSES.link,
        CURSOR_CLASSES.button,
        CURSOR_CLASSES.card,
        CURSOR_CLASSES.text,
        CURSOR_CLASSES.whatsapp
    );

    if (mode) {
        body.classList.add(mode);
    }

    activeMode = mode;
}

function setCursorLabel(label = "") {
    const finalLabel = cleanLabel(label);

    if (activeLabel === finalLabel) {
        return;
    }

    activeLabel = finalLabel;

    if (!labelElement) {
        return;
    }

    labelElement.textContent = finalLabel;
    labelElement.classList.toggle("has-label", Boolean(finalLabel));
}

/* =========================================
   4. CSS Injection
========================================= */

function injectCursorStyles() {
    if (document.getElementById(CURSOR_IDS.style)) {
        return;
    }

    const style = document.createElement("style");
    style.id = CURSOR_IDS.style;

    style.textContent = `
        body.${CURSOR_CLASSES.enabled} {
            cursor: none;
        }

        body.${CURSOR_CLASSES.enabled} a,
        body.${CURSOR_CLASSES.enabled} button,
        body.${CURSOR_CLASSES.enabled} input,
        body.${CURSOR_CLASSES.enabled} textarea,
        body.${CURSOR_CLASSES.enabled} select,
        body.${CURSOR_CLASSES.enabled} label,
        body.${CURSOR_CLASSES.enabled} [role="button"],
        body.${CURSOR_CLASSES.enabled} [tabindex]:not([tabindex="-1"]) {
            cursor: none;
        }

        #${CURSOR_IDS.dot},
        #${CURSOR_IDS.ring},
        #${CURSOR_IDS.glow},
        #${CURSOR_IDS.label} {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99999;
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
            transform: translate3d(-50%, -50%, 0);
            will-change: transform, opacity;
        }

        #${CURSOR_IDS.dot} {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: linear-gradient(135deg, #38bdf8, #2563eb);
            box-shadow:
                0 0 14px rgba(56, 189, 248, 0.78),
                0 0 28px rgba(37, 99, 235, 0.34);
        }

        #${CURSOR_IDS.ring} {
            width: 38px;
            height: 38px;
            border: 1px solid rgba(56, 189, 248, 0.48);
            border-radius: 999px;
            background:
                radial-gradient(circle, rgba(56, 189, 248, 0.08), transparent 62%);
            box-shadow:
                0 0 32px rgba(56, 189, 248, 0.16),
                inset 0 0 18px rgba(37, 99, 235, 0.09);
            transition:
                width 0.22s ease,
                height 0.22s ease,
                border-radius 0.22s ease,
                border-color 0.22s ease,
                background 0.22s ease,
                box-shadow 0.22s ease;
        }

        #${CURSOR_IDS.glow} {
            width: 92px;
            height: 92px;
            border-radius: 999px;
            background:
                radial-gradient(circle, rgba(56, 189, 248, 0.16), transparent 68%);
            filter: blur(1px);
            mix-blend-mode: multiply;
        }

        #${CURSOR_IDS.label} {
            min-width: max-content;
            padding: 6px 10px;
            border: 1px solid rgba(56, 189, 248, 0.26);
            border-radius: 999px;
            background: rgba(2, 6, 23, 0.84);
            color: #e5f0ff;
            font-size: 0.72rem;
            font-weight: 900;
            line-height: 1;
            letter-spacing: 0.02em;
            box-shadow: 0 12px 30px rgba(2, 6, 23, 0.24);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transform: translate3d(-50%, calc(-50% + 34px), 0);
        }

        #${CURSOR_IDS.label}.has-label {
            opacity: 1;
            visibility: visible;
        }

        body.${CURSOR_CLASSES.visible} #${CURSOR_IDS.dot},
        body.${CURSOR_CLASSES.visible} #${CURSOR_IDS.ring},
        body.${CURSOR_CLASSES.visible} #${CURSOR_IDS.glow} {
            opacity: 1;
            visibility: visible;
        }

        body.${CURSOR_CLASSES.hidden} #${CURSOR_IDS.dot},
        body.${CURSOR_CLASSES.hidden} #${CURSOR_IDS.ring},
        body.${CURSOR_CLASSES.hidden} #${CURSOR_IDS.glow},
        body.${CURSOR_CLASSES.hidden} #${CURSOR_IDS.label} {
            opacity: 0;
            visibility: hidden;
        }

        body.${CURSOR_CLASSES.hovering} #${CURSOR_IDS.ring} {
            width: 58px;
            height: 58px;
            border-color: rgba(124, 58, 237, 0.58);
            background:
                radial-gradient(circle, rgba(124, 58, 237, 0.13), transparent 64%);
            box-shadow:
                0 0 38px rgba(124, 58, 237, 0.18),
                inset 0 0 20px rgba(56, 189, 248, 0.08);
        }

        body.${CURSOR_CLASSES.hovering} #${CURSOR_IDS.dot} {
            background: linear-gradient(135deg, #a855f7, #2563eb);
            box-shadow:
                0 0 16px rgba(168, 85, 247, 0.78),
                0 0 30px rgba(56, 189, 248, 0.28);
        }

        body.${CURSOR_CLASSES.button} #${CURSOR_IDS.ring} {
            width: 66px;
            height: 66px;
            border-color: rgba(37, 99, 235, 0.62);
            background:
                radial-gradient(circle, rgba(37, 99, 235, 0.16), transparent 66%);
        }

        body.${CURSOR_CLASSES.link} #${CURSOR_IDS.ring} {
            width: 58px;
            height: 58px;
            border-color: rgba(56, 189, 248, 0.62);
        }

        body.${CURSOR_CLASSES.card} #${CURSOR_IDS.ring} {
            width: 74px;
            height: 74px;
            border-color: rgba(14, 165, 233, 0.56);
            background:
                radial-gradient(circle, rgba(14, 165, 233, 0.14), transparent 68%);
        }

        body.${CURSOR_CLASSES.text} #${CURSOR_IDS.ring} {
            width: 20px;
            height: 40px;
            border-radius: 12px;
            border-color: rgba(15, 23, 42, 0.48);
            background: rgba(15, 23, 42, 0.05);
        }

        body.${CURSOR_CLASSES.whatsapp} #${CURSOR_IDS.dot} {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            box-shadow:
                0 0 16px rgba(34, 197, 94, 0.82),
                0 0 34px rgba(22, 163, 74, 0.28);
        }

        body.${CURSOR_CLASSES.whatsapp} #${CURSOR_IDS.ring} {
            width: 70px;
            height: 70px;
            border-color: rgba(34, 197, 94, 0.58);
            background:
                radial-gradient(circle, rgba(34, 197, 94, 0.16), transparent 68%);
        }

        body.${CURSOR_CLASSES.clicking} #${CURSOR_IDS.ring} {
            width: 30px;
            height: 30px;
            background: rgba(56, 189, 248, 0.16);
        }

        .custom-cursor-ripple {
            position: fixed;
            z-index: 99998;
            pointer-events: none;
            width: 12px;
            height: 12px;
            border: 1px solid rgba(56, 189, 248, 0.62);
            border-radius: 999px;
            opacity: 0.65;
            transform: translate(-50%, -50%) scale(1);
            animation: customCursorRipple 0.52s ease-out forwards;
        }

        @keyframes customCursorRipple {
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(5.2);
            }
        }

        @media (max-width: 980px), (pointer: coarse), (prefers-reduced-motion: reduce) {
            body.${CURSOR_CLASSES.enabled},
            body.${CURSOR_CLASSES.enabled} a,
            body.${CURSOR_CLASSES.enabled} button,
            body.${CURSOR_CLASSES.enabled} input,
            body.${CURSOR_CLASSES.enabled} textarea,
            body.${CURSOR_CLASSES.enabled} select,
            body.${CURSOR_CLASSES.enabled} label,
            body.${CURSOR_CLASSES.enabled} [role="button"] {
                cursor: auto;
            }

            #${CURSOR_IDS.dot},
            #${CURSOR_IDS.ring},
            #${CURSOR_IDS.glow},
            #${CURSOR_IDS.label} {
                display: none !important;
            }
        }
    `;

    document.head.appendChild(style);
}

/* =========================================
   5. Element Creation
========================================= */

function createElement(id) {
    let element = document.getElementById(id);

    if (!element) {
        element = document.createElement("div");
        element.id = id;
        element.setAttribute("aria-hidden", "true");
        document.body.appendChild(element);
    }

    return element;
}

function createCursorElements() {
    dotElement = createElement(CURSOR_IDS.dot);
    ringElement = createElement(CURSOR_IDS.ring);
    glowElement = createElement(CURSOR_IDS.glow);
    labelElement = createElement(CURSOR_IDS.label);
}

function removeCursorElements() {
    document.getElementById(CURSOR_IDS.dot)?.remove();
    document.getElementById(CURSOR_IDS.ring)?.remove();
    document.getElementById(CURSOR_IDS.glow)?.remove();
    document.getElementById(CURSOR_IDS.label)?.remove();

    dotElement = null;
    ringElement = null;
    glowElement = null;
    labelElement = null;
}

/* =========================================
   6. Position / Animation
========================================= */

function updateCursorPosition() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    if (dotElement) {
        dotElement.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    if (ringElement) {
        ringElement.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }

    if (glowElement) {
        glowElement.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
    }

    if (labelElement) {
        labelElement.style.transform = `translate3d(${ringX}px, ${ringY + 42}px, 0) translate(-50%, -50%)`;
    }

    animationFrame = window.requestAnimationFrame(updateCursorPosition);
}

function startAnimationLoop() {
    if (animationFrame) {
        return;
    }

    animationFrame = window.requestAnimationFrame(updateCursorPosition);
}

function stopAnimationLoop() {
    if (!animationFrame) {
        return;
    }

    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
}

/* =========================================
   7. Interaction Detection
========================================= */

function updateInteractionState(target) {
    const interactive = getClosestTarget(target, SELECTORS.interactive);

    document.body.classList.toggle(CURSOR_CLASSES.hovering, Boolean(interactive));

    if (!interactive) {
        setBodyMode("");
        setCursorLabel("");
        return;
    }

    if (getClosestTarget(interactive, SELECTORS.whatsapp)) {
        setBodyMode(CURSOR_CLASSES.whatsapp);
        setCursorLabel("Chat");
        return;
    }

    if (getClosestTarget(interactive, SELECTORS.textInput)) {
        setBodyMode(CURSOR_CLASSES.text);
        setCursorLabel("Type");
        return;
    }

    if (getClosestTarget(interactive, SELECTORS.cards)) {
        setBodyMode(CURSOR_CLASSES.card);
        setCursorLabel(getReadableLabel(interactive) || "Explore");
        return;
    }

    if (getClosestTarget(interactive, SELECTORS.buttons)) {
        setBodyMode(CURSOR_CLASSES.button);
        setCursorLabel(getReadableLabel(interactive) || "Action");
        return;
    }

    if (getClosestTarget(interactive, "a[href]")) {
        setBodyMode(CURSOR_CLASSES.link);
        setCursorLabel(getReadableLabel(interactive) || "Open");
        return;
    }

    setBodyMode("");
    setCursorLabel(getReadableLabel(interactive));
}

function createClickRipple(x, y) {
    const ripple = document.createElement("span");
    ripple.className = "custom-cursor-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.setAttribute("aria-hidden", "true");

    document.body.appendChild(ripple);

    window.setTimeout(function () {
        ripple.remove();
    }, 560);
}

/* =========================================
   8. Event Handlers
========================================= */

function showCursor() {
    if (isVisible) {
        return;
    }

    isVisible = true;
    document.body.classList.add(CURSOR_CLASSES.visible);
    document.body.classList.remove(CURSOR_CLASSES.hidden);
}

function hideCursor() {
    isVisible = false;
    document.body.classList.remove(CURSOR_CLASSES.visible);
    document.body.classList.add(CURSOR_CLASSES.hidden);
    document.body.classList.remove(CURSOR_CLASSES.hovering);
    setBodyMode("");
    setCursorLabel("");
}

function handlePointerMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (!isVisible) {
        ringX = mouseX;
        ringY = mouseY;
        glowX = mouseX;
        glowY = mouseY;
        showCursor();
    }

    updateInteractionState(event.target);
}

function handlePointerDown(event) {
    document.body.classList.add(CURSOR_CLASSES.clicking);
    createClickRipple(event.clientX, event.clientY);
}

function handlePointerUp() {
    document.body.classList.remove(CURSOR_CLASSES.clicking);
}

function handleMouseLeave() {
    hideCursor();
}

function handleWindowBlur() {
    hideCursor();
}

function handleResize() {
    refreshCursor();
}

function handleVisibilityChange() {
    if (document.hidden) {
        hideCursor();
        stopAnimationLoop();
        return;
    }

    if (canUseCustomCursor()) {
        startAnimationLoop();
    }
}

/* =========================================
   9. Enable / Disable
========================================= */

export function enableCustomCursor() {
    if (!canUseCustomCursor()) {
        disableCustomCursor();
        return false;
    }

    injectCursorStyles();
    createCursorElements();

    document.body.classList.add(CURSOR_CLASSES.enabled);
    document.body.classList.remove(CURSOR_CLASSES.hidden);

    startAnimationLoop();

    dispatchCursorEvent("cursor:enabled", {
        enabled: true,
        version: "advanced-analytics-pulse"
    });

    return true;
}

export function disableCustomCursor() {
    document.body.classList.remove(
        CURSOR_CLASSES.enabled,
        CURSOR_CLASSES.visible,
        CURSOR_CLASSES.hovering,
        CURSOR_CLASSES.clicking,
        CURSOR_CLASSES.link,
        CURSOR_CLASSES.button,
        CURSOR_CLASSES.card,
        CURSOR_CLASSES.text,
        CURSOR_CLASSES.whatsapp
    );

    document.body.classList.add(CURSOR_CLASSES.hidden);

    stopAnimationLoop();
    removeCursorElements();

    dispatchCursorEvent("cursor:disabled", {
        enabled: false
    });

    return true;
}

export function refreshCursor() {
    if (canUseCustomCursor()) {
        return enableCustomCursor();
    }

    return disableCustomCursor();
}

/* =========================================
   10. Initializer
========================================= */

export function initCursor() {
    if (isInitialized) {
        refreshCursor();
        return true;
    }

    isInitialized = true;

    refreshCursor();

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("resize", handleResize, { passive: true });

    document.addEventListener("homepage:ready", refreshCursor);
    document.addEventListener("page-content:ready", refreshCursor);

    return true;
}

/* =========================================
   11. Boot Logic
========================================= */

function bootCursor() {
    initCursor();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootCursor, { once: true });
} else {
    bootCursor();
}