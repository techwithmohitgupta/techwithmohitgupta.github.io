import { initHeaderScrollEffect } from "./navigation.js";
import { initMobileMenu } from "./mobile-menu.js";
import { initTyping } from "./typing.js";
import { initReveal } from "./reveal.js";
import { initSmoothScroll } from "./smooth-scroll.js";
import { initActiveNav } from "./active-nav.js";
import { initPreloader, initPageEntry } from "./preloader.js";
import { initPageControl } from "./page-control.js";
import { initBreadcrumbs } from "./breadcrumbs.js";

import { renderProjects } from "./render-projects.js";
import { renderSkills } from "./render-skills.js";
import { renderExperience } from "./render-experience.js";

import { initHomePage } from "./home.js";
import { initAboutPage } from "./about.js";
import { initProjectsPage } from "./projects.js";
import { initSkillsPage } from "./skills.js";
import { initExperiencePage } from "./experience.js";
import { initContactPage } from "./contact.js";

/* =========================================
   PAGE HELPERS
========================================= */

function getCurrentPage() {
  return document.body?.dataset?.page || "";
}

function isHomePage() {
  return getCurrentPage() === "home";
}

function isAboutPage() {
  return getCurrentPage() === "about";
}

/* =========================================
   COMMON FEATURES
========================================= */

function initCommonFeatures() {
  /*
    SAFE MODE:
    Preloader/page-entry is currently homepage-safe only.
    Do not run it on inner pages because it can hide page sections.
  */
  if (isHomePage()) {
    initPageEntry();
  }

  initHeaderScrollEffect();
  initMobileMenu();

  /*
    Homepage typing is controlled by home.js.
    About typing is controlled by about.js.
    Other pages can use global typing if they have [data-typing-text].
  */
  if (!isHomePage() && !isAboutPage()) {
    initTyping();
  }

  initSmoothScroll();
}

/* =========================================
   SHARED PREVIEW RENDERERS
========================================= */

function renderDynamicSections() {
  /*
    These renderers are safe because each function checks
    whether its target container exists before rendering.
  */
  renderProjects();
  renderSkills();
  renderExperience();
}

/* =========================================
   PAGE-SPECIFIC INIT
========================================= */

function initCurrentPage() {
  const page = getCurrentPage();

  if (page === "home") {
    initHomePage();
  }

  if (page === "about") {
    initAboutPage();
  }

  if (page === "projects") {
    initProjectsPage();
  }

  if (page === "skills") {
    initSkillsPage();
  }

  if (page === "experience") {
    initExperiencePage();
  }

  if (page === "contact") {
    initContactPage();
  }
}

/* =========================================
   AFTER RENDERING FEATURES
========================================= */

function initAfterRendering() {
  /*
    SAFE MODE:
    Page control should run only on homepage for now.
    It may affect visibility/layout of non-home pages.
  */
  if (isHomePage()) {
    initPageControl();
  }

  initReveal();
  initActiveNav();
  initBreadcrumbs();
}

/* =========================================
   APP BOOTSTRAP
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initCommonFeatures();
  renderDynamicSections();
  initCurrentPage();
  initAfterRendering();
});

/*
  SAFE MODE:
  Preloader should run only on homepage for now.
  Inner pages like Contact/About/Projects/Skills/Experience
  should not be locked by homepage preloader logic.
*/
if (isHomePage()) {
  initPreloader();
}