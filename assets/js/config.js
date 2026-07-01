/* =========================================
   CONFIG JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Central website configuration.
   - Single source of truth for brand, routes, navigation,
     CTA links, contact details, social links, page status,
     footer data, and feature flags.
   - Safe-mode ready for homepage-only mode and future full-site mode.
========================================= */

"use strict";

/* =========================================
   1. Website Mode
========================================= */

/*
   Current mode:
   - "homepage-only" = inner pages are on hold; use homepage section anchors.
   - "full-site"     = inner pages are ready; use page routes.
*/

const WEBSITE_MODE = "homepage-only";

/* =========================================
   2. Core URLs / Routes / Anchors
========================================= */

const SITE_URL = "https://techwithmohitgupta.github.io/";

const ROUTES = {
    home: "/",
    about: "/about/",
    skills: "/skills/",
    projects: "/projects/",
    experience: "/experience/",
    contact: "/contact/",
    notFound: "/404/"
};

const HOMEPAGE_ANCHORS = {
    home: "#home",
    about: "#about",
    skills: "#skills",
    workflow: "#workflow",
    projects: "#projects",
    experience: "#experience",
    contact: "#contact"
};

/* =========================================
   3. Brand Assets
========================================= */

const BRAND_ASSETS = {
    logoImage: "/assets/images/brand/mohit-gupta-logo.png",
    logoAlt: "Mohit Gupta Data Analytics Portfolio Logo",
    favicon: "/assets/icons/ui/mohit-favicon-icon-modified.png",
    ogImage: "/assets/images/og-image.png"
};

/* =========================================
   4. Contact / Social URLs
========================================= */

const CONTACT_EMAIL = "digitalmohitgupta.work@gmail.com";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

const FORM_ACTION = "https://formspree.io/f/xvzjqqly";

const SOCIAL_URLS = {
    linkedin: "https://www.linkedin.com/in/mohit-gupta-data-analyst/",
    github: "https://github.com/techwithmohitgupta",
    kaggle: "https://www.kaggle.com/"
};

/* =========================================
   5. Helper Values
========================================= */

const isHomepageOnlyMode = WEBSITE_MODE === "homepage-only";

const getSafeLink = function (pageKey) {
    if (isHomepageOnlyMode && HOMEPAGE_ANCHORS[pageKey]) {
        return HOMEPAGE_ANCHORS[pageKey];
    }

    return ROUTES[pageKey] || ROUTES.home;
};

/* =========================================
   6. Navigation
========================================= */

const homepageNavigation = [
    {
        label: "Home",
        href: HOMEPAGE_ANCHORS.home,
        sectionId: "home"
    },
    {
        label: "About",
        href: HOMEPAGE_ANCHORS.about,
        sectionId: "about"
    },
    {
        label: "Skills",
        href: HOMEPAGE_ANCHORS.skills,
        sectionId: "skills"
    },
    {
        label: "Projects",
        href: HOMEPAGE_ANCHORS.projects,
        sectionId: "projects"
    },
    {
        label: "Experience",
        href: HOMEPAGE_ANCHORS.experience,
        sectionId: "experience"
    }
];

const pageNavigation = [
    {
        label: "Home",
        href: ROUTES.home,
        pageKey: "home"
    },
    {
        label: "About",
        href: ROUTES.about,
        pageKey: "about"
    },
    {
        label: "Skills",
        href: ROUTES.skills,
        pageKey: "skills"
    },
    {
        label: "Projects",
        href: ROUTES.projects,
        pageKey: "projects"
    },
    {
        label: "Experience",
        href: ROUTES.experience,
        pageKey: "experience"
    }
];

/* =========================================
   7. Main Export
========================================= */

export const siteConfig = {
    /* =========================
       Site Meta
    ========================= */
    site: {
        name: "Mohit Gupta Data Analytics Portfolio",
        shortName: "Mohit Gupta Portfolio",
        url: SITE_URL,
        language: "en-IN",
        author: "Mohit Gupta",
        mode: WEBSITE_MODE,
        isHomepageOnlyMode
    },

    /* =========================
       Brand
    ========================= */
    brand: {
        name: "Mohit Gupta",
        role: "Data Analytics Portfolio",
        headline: "Data Analyst Portfolio Builder",
        tagline: "Data Analytics • Business Intelligence • Decision Systems",
        logoText: "MG",
        logoImage: BRAND_ASSETS.logoImage,
        logoAlt: BRAND_ASSETS.logoAlt,
        favicon: BRAND_ASSETS.favicon,
        ogImage: BRAND_ASSETS.ogImage
    },

    /* =========================
       SEO Defaults
    ========================= */
    seo: {
        title: "Mohit Gupta | Data Analytics Portfolio",
        description:
            "Mohit Gupta's Data Analytics Portfolio featuring SQL, Python, Power BI, Tableau, Streamlit dashboards, business intelligence projects, KPI dashboards, and data-driven business insights.",
        keywords: [
            "Data Analytics Portfolio",
            "Data Analyst Portfolio",
            "SQL Portfolio Projects",
            "Python Data Analysis Projects",
            "Power BI Dashboard Projects",
            "Tableau Dashboard Portfolio",
            "Streamlit Dashboard Projects",
            "Business Intelligence Portfolio",
            "KPI Dashboard",
            "Data Storytelling",
            "Marketing Analytics",
            "E-commerce Analytics",
            "Supply Chain Analytics",
            "Finance Analytics"
        ],
        canonicalUrl: SITE_URL,
        ogImage: BRAND_ASSETS.ogImage
    },

    /* =========================
       Routes / Anchors
    ========================= */
    routes: {
        ...ROUTES
    },

    anchors: {
        ...HOMEPAGE_ANCHORS
    },

    /*
       Backward-compatible key.
       Existing navigation.js currently expects siteConfig.pageLinks.
    */
    pageLinks: {
        ...ROUTES
    },

    /* =========================
       Page Status
    ========================= */
    pages: {
        home: {
            key: "home",
            label: "Home",
            route: ROUTES.home,
            anchor: HOMEPAGE_ANCHORS.home,
            status: "active"
        },
        about: {
            key: "about",
            label: "About",
            route: ROUTES.about,
            anchor: HOMEPAGE_ANCHORS.about,
            status: "hold"
        },
        skills: {
            key: "skills",
            label: "Skills",
            route: ROUTES.skills,
            anchor: HOMEPAGE_ANCHORS.skills,
            status: "hold"
        },
        projects: {
            key: "projects",
            label: "Projects",
            route: ROUTES.projects,
            anchor: HOMEPAGE_ANCHORS.projects,
            status: "hold"
        },
        experience: {
            key: "experience",
            label: "Experience",
            route: ROUTES.experience,
            anchor: HOMEPAGE_ANCHORS.experience,
            status: "hold"
        },
        contact: {
            key: "contact",
            label: "Contact",
            route: ROUTES.contact,
            anchor: HOMEPAGE_ANCHORS.contact,
            status: "hold"
        },
        notFound: {
            key: "not-found",
            label: "404",
            route: ROUTES.notFound,
            anchor: "",
            status: "hold"
        }
    },

    /* =========================
       Navigation
    ========================= */
    homepageNavigation,

    pageNavigation,

    navigation: {
        homepage: homepageNavigation,
        pages: pageNavigation,
        useHomepageAnchors: isHomepageOnlyMode,
        activeClass: "active",
        currentAttribute: "aria-current"
    },

    /* =========================
       CTA
    ========================= */
    cta: {
        label: "Let’s Connect",
        homepageHref: HOMEPAGE_ANCHORS.contact,
        pageHref: ROUTES.contact,
        safeHref: getSafeLink("contact"),
        icon: "fa-solid fa-envelope"
    },

    /* =========================
       Contact
    ========================= */
    contact: {
        email: CONTACT_EMAIL,
        mailto: CONTACT_MAILTO,
        formAction: FORM_ACTION,
        formSubject: "New message from Mohit Gupta Data Analytics Portfolio",
        availability: "Open for internships, freelance work, and full-time data analyst roles",
        locationFocus: "India",

        whatsappNumber: "918447098368",
        whatsappMessage:
            "Hi Mohit, I visited your Data Analytics Portfolio and would like to connect with you.",

        primaryCTA: {
            label: "Send Message",
            href: HOMEPAGE_ANCHORS.contact,
            icon: "fa-solid fa-paper-plane"
        }
    },

    /* =========================
       Social Links
    ========================= */

    /*
       Backward-compatible key.
       Existing files may expect siteConfig.socialLinks.linkedin etc.
    */
    socialLinks: {
        linkedin: SOCIAL_URLS.linkedin,
        github: SOCIAL_URLS.github,
        kaggle: SOCIAL_URLS.kaggle
    },

    /*
       Structured version for future footer/contact/social rendering.
    */
    socialProfiles: [
        {
            key: "linkedin",
            label: "LinkedIn",
            href: SOCIAL_URLS.linkedin,
            icon: "fab fa-linkedin-in",
            ariaLabel: "Visit Mohit Gupta on LinkedIn",
            external: true
        },
        {
            key: "github",
            label: "GitHub",
            href: SOCIAL_URLS.github,
            icon: "fab fa-github",
            ariaLabel: "Visit Mohit Gupta on GitHub",
            external: true
        },
        {
            key: "kaggle",
            label: "Kaggle",
            href: SOCIAL_URLS.kaggle,
            icon: "fab fa-kaggle",
            ariaLabel: "Visit Mohit Gupta on Kaggle",
            external: true
        }
    ],

    /* =========================
       Footer
    ========================= */
    footer: {
        tagline:
            "Turning data into business clarity through dashboards, analytics projects, KPI storytelling, and decision-support insights.",
        availabilityLabel: "Open to Work & Freelance Opportunities",
        copyrightName: "Mohit Gupta",
        links: [
            {
                label: "Home",
                href: HOMEPAGE_ANCHORS.home,
                key: "home"
            },
            {
                label: "About",
                href: getSafeLink("about"),
                key: "about"
            },
            {
                label: "Projects",
                href: getSafeLink("projects"),
                key: "projects"
            },
            {
                label: "Skills",
                href: getSafeLink("skills"),
                key: "skills"
            },
            {
                label: "Experience",
                href: getSafeLink("experience"),
                key: "experience"
            },
            {
                label: "Let’s Connect",
                href: getSafeLink("contact"),
                key: "contact"
            }
        ],
        socialKeys: ["linkedin", "github", "kaggle"]
    },

    /* =========================
       Feature Flags
    ========================= */

    /*
       These flags will allow future JS files to be complete,
       but still controlled safely.
    */
    features: {
        navigation: true,
        mobileMenu: true,
        smoothScroll: true,
        activeNav: true,
        revealAnimations: true,
        homepageTyping: true,
        contactFormEnhancement: true,

        /*
           Optional features.
           Keep false until intentionally activated.
        */
        dynamicFooter: false,
        breadcrumbs: false,
        whatsappButton: true,
        customCursor: true,
        pageTransitions: true,
        preloader: true
    },

    whatsapp: {
    label: "WhatsApp",
    number: "918447098368",
    message:
        "Hi Mohit, I visited your Data Analytics Portfolio and would like to connect with you.",
    ariaLabel: "Contact Mohit Gupta on WhatsApp",
    showAfterScroll: -1
},

pageTransition: {
    label: "Loading next view",
    leaveDelay: 260,
    minimumDelay: 120
},

preloader: {
    firstDuration: 8000,
    repeatDuration: 6000,
    removeDelay: 520,
    sessionKey: "mohit_portfolio_logo_splash_seen",
    logoSrc: "/assets/images/brand/mohit-gupta-logo.png",
    logoAlt: "Mohit Gupta Logo"
},

    /* =========================
       UI / Behavior Settings
    ========================= */
    ui: {
        headerOffset: 120,
        mobileBreakpoint: 980,
        scrollBehavior: "smooth",
        activeNavRootMargin: "-30% 0px -55% 0px",
        revealThreshold: 0.12,
        revealRootMargin: "0px 0px -80px 0px",
        reducedMotionQuery: "(prefers-reduced-motion: reduce)"
    },

    /* =========================
       Homepage Safe Actions
    ========================= */

    /*
       These links are useful while inner pages are on hold.
       Page buttons can safely point to homepage sections.
    */
    safeHomepageActions: {
        about: {
            label: "Explore About Section",
            href: HOMEPAGE_ANCHORS.about
        },
        skills: {
            label: "Explore Skills",
            href: HOMEPAGE_ANCHORS.skills
        },
        workflow: {
            label: "See Analytics Workflow",
            href: HOMEPAGE_ANCHORS.workflow
        },
        projects: {
            label: "See Featured Projects",
            href: HOMEPAGE_ANCHORS.projects
        },
        experience: {
            label: "View Learning Journey",
            href: HOMEPAGE_ANCHORS.experience
        },
        contact: {
            label: "Let’s Connect",
            href: HOMEPAGE_ANCHORS.contact
        }
    },

    /* =========================
       Availability / Trust Signals
    ========================= */
    availability: {
        status: "available",
        label: "Available for Data Analytics Work",
        chips: [
            "Open to Work",
            "Freelance Available",
            "Internship Ready",
            "Dashboard Projects",
            "Business Analytics"
        ]
    },

    /* =========================
       Tool / Skill Highlights
    ========================= */
    toolHighlights: [
        {
            label: "SQL",
            icon: "fa-solid fa-database"
        },
        {
            label: "Python",
            icon: "fa-brands fa-python"
        },
        {
            label: "Power BI",
            icon: "fa-solid fa-chart-pie"
        },
        {
            label: "Tableau",
            icon: "fa-solid fa-chart-line"
        },
        {
            label: "Streamlit",
            icon: "fa-solid fa-chart-simple"
        },
        {
            label: "Excel",
            icon: "fa-solid fa-table"
        }
    ],

    /* =========================
       Analytics / Portfolio Metrics
    ========================= */
    portfolioMetrics: [
        {
            label: "Portfolio Projects",
            value: "4+"
        },
        {
            label: "Analytics Skills",
            value: "6+"
        },
        {
            label: "Business Domains",
            value: "5"
        }
    ]
};