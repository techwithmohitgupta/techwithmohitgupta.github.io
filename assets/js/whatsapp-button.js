/* =========================================
   WHATSAPP BUTTON JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Optional floating WhatsApp / quick contact button.
   - Safe by default: no button appears unless enabled in config.
   - Supports future WhatsApp number configuration.
   - Falls back safely without console errors.
   - Respects inner pages and homepage layout.
   - Avoids duplicate button creation.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const WHATSAPP_BUTTON_ID = "quick-whatsapp-button";
const WHATSAPP_STYLE_ID = "quick-whatsapp-style";

const WHATSAPP_CLASSES = {
    button: "quick-whatsapp-button",
    visible: "is-visible",
    ready: "quick-whatsapp-ready"
};

const DEFAULT_MESSAGE =
    "Hi Mohit, I visited your Data Analytics Portfolio and would like to connect with you.";

/* =========================================
   2. State
========================================= */

let isInitialized = false;
let scrollTicking = false;

/* =========================================
   3. Small Utilities
========================================= */

function isWhatsappEnabled() {
    return siteConfig?.features?.whatsappButton === true;
}

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function normalizePhoneNumber(value = "") {
    return String(value)
        .replace(/[^\d]/g, "")
        .trim();
}

function getWhatsappNumber() {
    const possibleNumber =
        siteConfig?.contact?.whatsappNumber ||
        siteConfig?.whatsapp?.number ||
        "";

    return normalizePhoneNumber(possibleNumber);
}

function getWhatsappMessage() {
    return (
        siteConfig?.whatsapp?.message ||
        siteConfig?.contact?.whatsappMessage ||
        DEFAULT_MESSAGE
    );
}

function getWhatsappURL() {
    const number = getWhatsappNumber();

    if (!number) {
        return "";
    }

    const message = encodeURIComponent(getWhatsappMessage());

    return `https://wa.me/${number}?text=${message}`;
}

function getButtonLabel() {
    return siteConfig?.whatsapp?.label || "WhatsApp";
}

function getButtonAriaLabel() {
    return siteConfig?.whatsapp?.ariaLabel || "Contact Mohit Gupta on WhatsApp";
}

function shouldShowAfterScroll() {
    const threshold = Number(siteConfig?.whatsapp?.showAfterScroll || 260);
    return window.scrollY > threshold;
}

function dispatchWhatsappEvent(eventName, detail = {}) {
    document.dispatchEvent(
        new CustomEvent(eventName, {
            detail
        })
    );
}

/* =========================================
   4. CSS Injection
========================================= */

function injectWhatsappStyles() {
    if (document.getElementById(WHATSAPP_STYLE_ID)) {
        return;
    }

    const style = document.createElement("style");
    style.id = WHATSAPP_STYLE_ID;

    style.textContent = `
        .${WHATSAPP_CLASSES.button} {
            position: fixed;
            right: 22px;
            bottom: 22px;
            z-index: 950;

            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            min-height: 52px;
            padding: 0 18px;

            border: 1px solid rgba(34, 197, 94, 0.34);
            border-radius: 999px;

            background:
                linear-gradient(135deg, rgba(34, 197, 94, 0.96), rgba(22, 163, 74, 0.96));

            color: #ffffff;
            font-size: 0.92rem;
            font-weight: 900;
            line-height: 1;
            text-decoration: none;

            box-shadow:
                0 18px 42px rgba(22, 163, 74, 0.28),
                inset 0 1px 0 rgba(255, 255, 255, 0.22);

            opacity: 0;
            visibility: hidden;
            transform: translate3d(0, 14px, 0) scale(0.98);

            transition:
                opacity 0.3s ease,
                visibility 0.3s ease,
                transform 0.3s ease,
                box-shadow 0.3s ease;
        }

        .${WHATSAPP_CLASSES.button}.${WHATSAPP_CLASSES.visible} {
            opacity: 1;
            visibility: visible;
            transform: translate3d(0, 0, 0) scale(1);
        }

        .${WHATSAPP_CLASSES.button}:hover {
            transform: translate3d(0, -3px, 0) scale(1.01);
            box-shadow:
                0 24px 54px rgba(22, 163, 74, 0.34),
                inset 0 1px 0 rgba(255, 255, 255, 0.26);
        }

        .${WHATSAPP_CLASSES.button} i {
            font-size: 1.05rem;
        }

        @media (max-width: 560px) {
            .${WHATSAPP_CLASSES.button} {
                right: 16px;
                bottom: 16px;
                min-height: 48px;
                padding: 0 15px;
                font-size: 0.84rem;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .${WHATSAPP_CLASSES.button} {
                transition: none !important;
                transform: none !important;
            }

            .${WHATSAPP_CLASSES.button}:hover {
                transform: none !important;
            }
        }
    `;

    document.head.appendChild(style);
}

/* =========================================
   5. Button Creation
========================================= */

function getExistingButton() {
    return document.getElementById(WHATSAPP_BUTTON_ID);
}

function createWhatsappButton() {
    const href = getWhatsappURL();

    if (!href) {
        return null;
    }

    const existingButton = getExistingButton();

    if (existingButton) {
        return existingButton;
    }

    const button = document.createElement("a");
    button.id = WHATSAPP_BUTTON_ID;
    button.className = WHATSAPP_CLASSES.button;
    button.href = href;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.setAttribute("aria-label", getButtonAriaLabel());

    button.innerHTML = `
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
        <span>${escapeHTML(getButtonLabel())}</span>
    `;

    document.body.appendChild(button);

    dispatchWhatsappEvent("whatsapp-button:created", {
        button,
        href
    });

    return button;
}

/* =========================================
   6. Visibility Logic
========================================= */

function updateButtonVisibility() {
    const button = getExistingButton();

    if (!button) {
        return;
    }

    button.classList.toggle(WHATSAPP_CLASSES.visible, shouldShowAfterScroll());
}

function requestVisibilityUpdate() {
    if (scrollTicking) {
        return;
    }

    scrollTicking = true;

    window.requestAnimationFrame(function () {
        updateButtonVisibility();
        scrollTicking = false;
    });
}

/* =========================================
   7. Public Functions
========================================= */

export function refreshWhatsappButton() {
    if (!isWhatsappEnabled()) {
        const existingButton = getExistingButton();

        if (existingButton) {
            existingButton.remove();
        }

        return false;
    }

    const href = getWhatsappURL();

    if (!href) {
        return false;
    }

    injectWhatsappStyles();

    const button = createWhatsappButton();

    if (!button) {
        return false;
    }

    button.href = href;
    button.setAttribute("aria-label", getButtonAriaLabel());

    updateButtonVisibility();

    document.body.classList.add(WHATSAPP_CLASSES.ready);

    dispatchWhatsappEvent("whatsapp-button:ready", {
        button,
        href
    });

    return true;
}

/* =========================================
   8. Initializer
========================================= */

export function initWhatsappButton() {
    if (isInitialized) {
        refreshWhatsappButton();
        return true;
    }

    isInitialized = true;

    refreshWhatsappButton();

    window.addEventListener("scroll", requestVisibilityUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestVisibilityUpdate, {
        passive: true
    });

    document.addEventListener("page-content:ready", refreshWhatsappButton);
    document.addEventListener("homepage:ready", refreshWhatsappButton);

    window.setTimeout(refreshWhatsappButton, 300);

    return true;
}

/* =========================================
   9. Boot Logic
========================================= */

function bootWhatsappButton() {
    initWhatsappButton();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootWhatsappButton, { once: true });
} else {
    bootWhatsappButton();
}