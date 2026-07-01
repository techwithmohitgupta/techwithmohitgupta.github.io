/* =========================================
   MOBILE MENU JS
   Global hamburger menu behavior.

   Purpose:
   - Open/close mobile navigation.
   - Close on link click.
   - Close on outside overlay click.
   - Close on Escape key.
   - Keep aria-expanded and aria-hidden synced.
========================================= */

"use strict";

function initMobileMenu() {
    const siteHeader = document.getElementById("site-header");

    if (!siteHeader) {
        return;
    }

    const toggleButton = siteHeader.querySelector(".mobile-menu-toggle");
    const closeButton = siteHeader.querySelector(".mobile-menu-close");
    const mobilePanel = siteHeader.querySelector(".mobile-navigation-panel");
    const overlay = siteHeader.querySelector(".mobile-navigation-overlay");
    const mobileLinks = siteHeader.querySelectorAll(".mobile-nav-link");

    if (!toggleButton || !mobilePanel || !overlay) {
        return;
    }

    function openMenu() {
        document.body.classList.add("mobile-menu-open");
        siteHeader.classList.add("mobile-menu-is-open");

        toggleButton.setAttribute("aria-expanded", "true");
        toggleButton.setAttribute("aria-label", "Close navigation menu");
        mobilePanel.setAttribute("aria-hidden", "false");

        const firstLink = mobilePanel.querySelector(".mobile-nav-link");

        if (firstLink) {
            firstLink.focus({ preventScroll: true });
        }
    }

    function closeMenu() {
        document.body.classList.remove("mobile-menu-open");
        siteHeader.classList.remove("mobile-menu-is-open");

        toggleButton.setAttribute("aria-expanded", "false");
        toggleButton.setAttribute("aria-label", "Open navigation menu");
        mobilePanel.setAttribute("aria-hidden", "true");
    }

    function toggleMenu() {
        if (siteHeader.classList.contains("mobile-menu-is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    toggleButton.addEventListener("click", toggleMenu);

    if (closeButton) {
        closeButton.addEventListener("click", closeMenu);
    }

    overlay.addEventListener("click", closeMenu);

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && siteHeader.classList.contains("mobile-menu-is-open")) {
            closeMenu();
            toggleButton.focus({ preventScroll: true });
        }
    });

    window.addEventListener(
        "resize",
        function () {
            if (window.innerWidth > 980 && siteHeader.classList.contains("mobile-menu-is-open")) {
                closeMenu();
            }
        },
        { passive: true }
    );
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileMenu, { once: true });
} else {
    initMobileMenu();
}