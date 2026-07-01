/* =========================================
   MOBILE MENU JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Control mobile hamburger navigation safely.
   - Open/close mobile navigation panel.
   - Close on link click, close button, overlay click,
     Escape key, outside click, and desktop resize.
   - Keep ARIA attributes synced.
   - Add keyboard focus management for better accessibility.
   - Compatible with navigation.js rendered markup.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const MOBILE_MENU_SELECTORS = {
    header: "#site-header",
    toggle: ".mobile-menu-toggle",
    close: ".mobile-menu-close",
    panel: ".mobile-navigation-panel",
    overlay: ".mobile-navigation-overlay",
    link: ".mobile-nav-link"
};

const MOBILE_MENU_CLASSES = {
    bodyOpen: "mobile-menu-open",
    headerOpen: "mobile-menu-is-open"
};

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
].join(", ");

const DEFAULT_MOBILE_BREAKPOINT = 980;

/* =========================================
   2. Small Utilities
========================================= */

function isMobileMenuEnabled() {
    return siteConfig?.features?.mobileMenu !== false;
}

function getMobileBreakpoint() {
    return Number(siteConfig?.ui?.mobileBreakpoint) || DEFAULT_MOBILE_BREAKPOINT;
}

function getHeader() {
    return document.querySelector(MOBILE_MENU_SELECTORS.header);
}

function getMenuElements(siteHeader) {
    if (!siteHeader) {
        return null;
    }

    const toggleButton = siteHeader.querySelector(MOBILE_MENU_SELECTORS.toggle);
    const closeButton = siteHeader.querySelector(MOBILE_MENU_SELECTORS.close);
    const mobilePanel = siteHeader.querySelector(MOBILE_MENU_SELECTORS.panel);
    const overlay = siteHeader.querySelector(MOBILE_MENU_SELECTORS.overlay);
    const mobileLinks = Array.from(siteHeader.querySelectorAll(MOBILE_MENU_SELECTORS.link));

    if (!toggleButton || !mobilePanel || !overlay) {
        return null;
    }

    return {
        siteHeader,
        toggleButton,
        closeButton,
        mobilePanel,
        overlay,
        mobileLinks
    };
}

function isMenuOpen(siteHeader) {
    return Boolean(siteHeader?.classList?.contains(MOBILE_MENU_CLASSES.headerOpen));
}

function isDesktopViewport() {
    return window.innerWidth > getMobileBreakpoint();
}

function getFocusableElements(container) {
    if (!container) {
        return [];
    }

    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(function (element) {
        return Boolean(
            element.offsetWidth ||
            element.offsetHeight ||
            element.getClientRects().length
        );
    });
}

function safelyFocus(element) {
    if (!element || typeof element.focus !== "function") {
        return;
    }

    try {
        element.focus({ preventScroll: true });
    } catch (error) {
        element.focus();
    }
}

function setExpandedState(elements, expanded) {
    const { toggleButton, mobilePanel } = elements;

    toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
    toggleButton.setAttribute(
        "aria-label",
        expanded ? "Close navigation menu" : "Open navigation menu"
    );

    mobilePanel.setAttribute("aria-hidden", expanded ? "false" : "true");
}

function dispatchMobileMenuEvent(eventName, elements) {
    document.dispatchEvent(
        new CustomEvent(eventName, {
            detail: {
                header: elements.siteHeader,
                panel: elements.mobilePanel,
                isOpen: isMenuOpen(elements.siteHeader)
            }
        })
    );
}

/* =========================================
   3. Mobile Menu Initializer
========================================= */

export function initMobileMenu() {
    if (!isMobileMenuEnabled()) {
        return false;
    }

    const siteHeader = getHeader();
    const elements = getMenuElements(siteHeader);

    if (!elements) {
        return false;
    }

    /*
       Prevent duplicate event binding if navigation or scripts re-run.
    */
    if (elements.siteHeader.dataset.mobileMenuReady === "true") {
        return true;
    }

    elements.siteHeader.dataset.mobileMenuReady = "true";

    let lastFocusedElement = null;

    function openMenu() {
        if (isMenuOpen(elements.siteHeader)) {
            return;
        }

        lastFocusedElement = document.activeElement;

        document.body.classList.add(MOBILE_MENU_CLASSES.bodyOpen);
        elements.siteHeader.classList.add(MOBILE_MENU_CLASSES.headerOpen);

        setExpandedState(elements, true);

        const focusableElements = getFocusableElements(elements.mobilePanel);
        const firstFocusableElement = focusableElements[0] || elements.closeButton || elements.mobilePanel;

        safelyFocus(firstFocusableElement);

        dispatchMobileMenuEvent("mobile-menu:open", elements);
    }

    function closeMenu(options = {}) {
        const shouldReturnFocus = options.returnFocus !== false;

        if (!isMenuOpen(elements.siteHeader)) {
            return;
        }

        document.body.classList.remove(MOBILE_MENU_CLASSES.bodyOpen);
        elements.siteHeader.classList.remove(MOBILE_MENU_CLASSES.headerOpen);

        setExpandedState(elements, false);

        if (shouldReturnFocus) {
            safelyFocus(lastFocusedElement || elements.toggleButton);
        }

        lastFocusedElement = null;

        dispatchMobileMenuEvent("mobile-menu:close", elements);
    }

    function toggleMenu() {
        if (isMenuOpen(elements.siteHeader)) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function handleToggleClick(event) {
        event.preventDefault();
        toggleMenu();
    }

    function handleCloseButtonClick(event) {
        event.preventDefault();
        closeMenu();
    }

    function handleOverlayClick() {
        closeMenu();
    }

    function handleMobileLinkClick() {
        /*
           Return focus is disabled here because hash smooth-scroll
           or normal navigation should control the next focus naturally.
        */
        closeMenu({ returnFocus: false });
    }

    function handleOutsidePointerDown(event) {
        if (!isMenuOpen(elements.siteHeader)) {
            return;
        }

        const clickedInsidePanel = elements.mobilePanel.contains(event.target);
        const clickedToggle = elements.toggleButton.contains(event.target);

        if (!clickedInsidePanel && !clickedToggle) {
            closeMenu();
        }
    }

    function handleKeydown(event) {
        if (!isMenuOpen(elements.siteHeader)) {
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        const focusableElements = getFocusableElements(elements.mobilePanel);

        if (!focusableElements.length) {
            event.preventDefault();
            safelyFocus(elements.mobilePanel);
            return;
        }

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstFocusableElement) {
            event.preventDefault();
            safelyFocus(lastFocusableElement);
            return;
        }

        if (!event.shiftKey && document.activeElement === lastFocusableElement) {
            event.preventDefault();
            safelyFocus(firstFocusableElement);
        }
    }

    function handleResize() {
        if (isDesktopViewport() && isMenuOpen(elements.siteHeader)) {
            closeMenu({ returnFocus: false });
        }
    }

    function handleVisibilityChange() {
        if (document.hidden && isMenuOpen(elements.siteHeader)) {
            closeMenu({ returnFocus: false });
        }
    }

    elements.toggleButton.addEventListener("click", handleToggleClick);

    if (elements.closeButton) {
        elements.closeButton.addEventListener("click", handleCloseButtonClick);
    }

    elements.overlay.addEventListener("click", handleOverlayClick);

    elements.mobileLinks.forEach(function (link) {
        link.addEventListener("click", handleMobileLinkClick);
    });

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("pointerdown", handleOutsidePointerDown, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("resize", handleResize, { passive: true });

    /*
       Safe initial state.
    */
    document.body.classList.remove(MOBILE_MENU_CLASSES.bodyOpen);
    elements.siteHeader.classList.remove(MOBILE_MENU_CLASSES.headerOpen);
    setExpandedState(elements, false);

    return true;
}

/* =========================================
   4. Boot Logic
========================================= */

function bootMobileMenu() {
    const initialized = initMobileMenu();

    /*
       If navigation.js has not rendered the header yet,
       wait for navigation:ready and try again.
    */
    if (!initialized) {
        document.addEventListener(
            "navigation:ready",
            function () {
                initMobileMenu();
            },
            { once: true }
        );
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootMobileMenu, { once: true });
} else {
    bootMobileMenu();
}