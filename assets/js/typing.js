/* =========================================
   TYPING JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Global reusable typing/typewriter system.
   - Default controller for homepage hero typing.
   - Supports future typing effects on other pages.
   - Works with JS-rendered homepage content.
   - Respects reduced-motion preference.
   - Pauses when page/tab is hidden.
   - Avoids duplicate typing instances.
========================================= */

"use strict";

import { siteConfig } from "./config.js";

/* =========================================
   1. Configuration
========================================= */

const TYPING_SELECTORS = {
    defaultTarget: "#hero-typing-text",
    typingTarget: "[data-typing-target]",
    cursor: ".hero-typing-cursor, [data-typing-cursor]",
    app: "#app",
    main: "#main-content"
};

const DEFAULT_TYPING_WORDS = [
    "interactive dashboards",
    "business-focused analytics projects",
    "SQL and Power BI solutions",
    "data-driven decision systems",
    "portfolio-ready case studies"
];

const DEFAULT_OPTIONS = {
    typingSpeed: 82,
    deletingSpeed: 42,
    holdDelay: 1250,
    nextWordDelay: 280,
    startDelay: 180,
    loop: true
};

/* =========================================
   2. State
========================================= */

const typingInstances = new Map();

let isInitialized = false;
let mutationObserver = null;

/* =========================================
   3. Small Utilities
========================================= */

function isTypingEnabled() {
    return siteConfig?.features?.homepageTyping !== false;
}

function prefersReducedMotion() {
    const query = siteConfig?.ui?.reducedMotionQuery || "(prefers-reduced-motion: reduce)";
    return window.matchMedia(query).matches;
}

function safeArray(value) {
    return Array.isArray(value) ? value : [];
}

function normalizeWords(words = []) {
    return safeArray(words)
        .map(function (word) {
            return String(word || "").trim();
        })
        .filter(Boolean);
}

function getWordsFromDataset(element) {
    if (!element?.dataset?.typingWords) {
        return [];
    }

    return element.dataset.typingWords
        .split("|")
        .map(function (word) {
            return word.trim();
        })
        .filter(Boolean);
}

function getDefaultTypingWords() {
    const configWords = siteConfig?.typing?.heroWords;

    if (Array.isArray(configWords) && configWords.length) {
        return normalizeWords(configWords);
    }

    return DEFAULT_TYPING_WORDS;
}

function getNumberFromDataset(element, key, fallback) {
    const value = Number(element?.dataset?.[key]);

    if (Number.isFinite(value) && value >= 0) {
        return value;
    }

    return fallback;
}

function getBooleanFromDataset(element, key, fallback) {
    const value = element?.dataset?.[key];

    if (value === "true") {
        return true;
    }

    if (value === "false") {
        return false;
    }

    return fallback;
}

function dispatchTypingEvent(eventName, detail = {}) {
    document.dispatchEvent(
        new CustomEvent(eventName, {
            detail
        })
    );
}

function getTypingTargets() {
    const targets = new Set();

    document.querySelectorAll(TYPING_SELECTORS.typingTarget).forEach(function (element) {
        targets.add(element);
    });

    const defaultTarget = document.querySelector(TYPING_SELECTORS.defaultTarget);

    if (defaultTarget) {
        targets.add(defaultTarget);
    }

    return Array.from(targets);
}

function getCursorForTarget(target) {
    if (!target) {
        return null;
    }

    if (target.dataset.typingCursor) {
        try {
            return document.querySelector(target.dataset.typingCursor);
        } catch (error) {
            return null;
        }
    }

    return target.parentElement?.querySelector(TYPING_SELECTORS.cursor) || null;
}

/* =========================================
   4. Typewriter Class
========================================= */

class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.cursor = getCursorForTarget(element);

        this.words = normalizeWords(options.words);
        this.typingSpeed = options.typingSpeed;
        this.deletingSpeed = options.deletingSpeed;
        this.holdDelay = options.holdDelay;
        this.nextWordDelay = options.nextWordDelay;
        this.startDelay = options.startDelay;
        this.loop = options.loop;

        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.timeoutId = null;
        this.isRunning = false;
        this.isDestroyed = false;
    }

    setText(value) {
        if (!this.element) {
            return;
        }

        this.element.textContent = value;
    }

    showCursor() {
        if (this.cursor) {
            this.cursor.setAttribute("aria-hidden", "true");
            this.cursor.style.visibility = "visible";
        }
    }

    hideCursor() {
        if (this.cursor) {
            this.cursor.style.visibility = "hidden";
        }
    }

    clearTimer() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    schedule(delay) {
        this.clearTimer();

        this.timeoutId = window.setTimeout(() => {
            this.tick();
        }, delay);
    }

    start() {
        if (this.isDestroyed || this.isRunning || !this.element || !this.words.length) {
            return;
        }

        this.isRunning = true;

        this.element.dataset.typingActive = "true";
        this.element.dataset.typingOwner = "typing-js";

        this.showCursor();

        if (prefersReducedMotion()) {
            this.setText(this.words[0]);
            this.isRunning = false;
            dispatchTypingEvent("typing:reduced-motion", {
                element: this.element,
                word: this.words[0]
            });
            return;
        }

        this.schedule(this.startDelay);

        dispatchTypingEvent("typing:start", {
            element: this.element,
            words: this.words
        });
    }

    stop() {
        this.clearTimer();
        this.isRunning = false;

        if (this.element) {
            this.element.dataset.typingActive = "false";
        }

        dispatchTypingEvent("typing:stop", {
            element: this.element
        });
    }

    destroy() {
        this.stop();
        this.isDestroyed = true;

        if (this.element) {
            this.element.removeAttribute("data-typing-active");
            this.element.removeAttribute("data-typing-owner");
        }

        this.hideCursor();

        dispatchTypingEvent("typing:destroy", {
            element: this.element
        });
    }

    tick() {
        if (this.isDestroyed || !this.isRunning || !this.element || !this.words.length) {
            return;
        }

        if (document.hidden) {
            this.schedule(300);
            return;
        }

        const currentWord = this.words[this.wordIndex] || "";

        if (!this.isDeleting) {
            this.charIndex += 1;
            this.setText(currentWord.slice(0, this.charIndex));
        } else {
            this.charIndex -= 1;
            this.setText(currentWord.slice(0, this.charIndex));
        }

        let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.charIndex >= currentWord.length) {
            dispatchTypingEvent("typing:word-complete", {
                element: this.element,
                word: currentWord,
                index: this.wordIndex
            });

            if (!this.loop && this.wordIndex >= this.words.length - 1) {
                this.stop();
                this.setText(currentWord);
                return;
            }

            this.isDeleting = true;
            delay = this.holdDelay;
        } else if (this.isDeleting && this.charIndex <= 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            delay = this.nextWordDelay;
        }

        this.schedule(delay);
    }
}

/* =========================================
   5. Options Builder
========================================= */

function buildTypingOptions(element) {
    const datasetWords = getWordsFromDataset(element);
    const words = datasetWords.length ? datasetWords : getDefaultTypingWords();

    return {
        words,
        typingSpeed: getNumberFromDataset(element, "typingSpeed", DEFAULT_OPTIONS.typingSpeed),
        deletingSpeed: getNumberFromDataset(element, "deletingSpeed", DEFAULT_OPTIONS.deletingSpeed),
        holdDelay: getNumberFromDataset(element, "holdDelay", DEFAULT_OPTIONS.holdDelay),
        nextWordDelay: getNumberFromDataset(element, "nextWordDelay", DEFAULT_OPTIONS.nextWordDelay),
        startDelay: getNumberFromDataset(element, "startDelay", DEFAULT_OPTIONS.startDelay),
        loop: getBooleanFromDataset(element, "typingLoop", DEFAULT_OPTIONS.loop)
    };
}

/* =========================================
   6. Instance Management
========================================= */

export function startTypingForElement(element) {
    if (!element) {
        return false;
    }

    if (typingInstances.has(element)) {
        return true;
    }

    const options = buildTypingOptions(element);

    if (!options.words.length) {
        return false;
    }

    const instance = new Typewriter(element, options);

    typingInstances.set(element, instance);
    instance.start();

    return true;
}

export function stopTypingForElement(element) {
    const instance = typingInstances.get(element);

    if (!instance) {
        return false;
    }

    instance.stop();
    return true;
}

export function destroyTypingForElement(element) {
    const instance = typingInstances.get(element);

    if (!instance) {
        return false;
    }

    instance.destroy();
    typingInstances.delete(element);

    return true;
}

export function refreshTyping() {
    if (!isTypingEnabled()) {
        return false;
    }

    const targets = getTypingTargets();

    targets.forEach(function (target) {
        startTypingForElement(target);
    });

    dispatchTypingEvent("typing:refresh", {
        count: targets.length
    });

    return true;
}

export function stopAllTyping() {
    typingInstances.forEach(function (instance) {
        instance.stop();
    });
}

export function destroyAllTyping() {
    typingInstances.forEach(function (instance, element) {
        instance.destroy();
        typingInstances.delete(element);
    });
}

/* =========================================
   7. Visibility / Page Lifecycle
========================================= */

function handleVisibilityChange() {
    if (document.hidden) {
        stopAllTyping();
        return;
    }

    refreshTyping();
}

function handlePageHide() {
    destroyAllTyping();
}

/* =========================================
   8. Mutation Observer
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

    const app = document.querySelector(TYPING_SELECTORS.app);
    const main = document.querySelector(TYPING_SELECTORS.main);
    const target = app || main || document.body;

    if (!target) {
        return;
    }

    disconnectMutationObserver();

    let refreshTimer = null;

    mutationObserver = new MutationObserver(function () {
        window.clearTimeout(refreshTimer);

        refreshTimer = window.setTimeout(function () {
            refreshTyping();
        }, 100);
    });

    mutationObserver.observe(target, {
        childList: true,
        subtree: true
    });
}

/* =========================================
   9. Initializer
========================================= */

export function initTyping() {
    if (isInitialized) {
        refreshTyping();
        return true;
    }

    if (!isTypingEnabled()) {
        return false;
    }

    isInitialized = true;

    initMutationObserver();

    refreshTyping();

    document.addEventListener("homepage:ready", refreshTyping);
    document.addEventListener("page-content:ready", refreshTyping);
    document.addEventListener("reveal:ready", refreshTyping);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("pagehide", handlePageHide, { once: true });

    window.setTimeout(refreshTyping, 120);
    window.setTimeout(refreshTyping, 500);

    dispatchTypingEvent("typing:ready", {
        enabled: true
    });

    return true;
}

/* =========================================
   10. Boot Logic
========================================= */

function bootTyping() {
    initTyping();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootTyping, { once: true });
} else {
    bootTyping();
}