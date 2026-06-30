/* =========================================
   HOME JS
   Mohit Gupta Data Analytics Portfolio

   Purpose:
   - Homepage-only content, rendering, and interactions.
   - Safe-mode optimized for smoother scrolling and better performance.
   - This file must be linked only on the homepage HTML.
========================================= */

"use strict";

/* =========================================
   1. Homepage Data
========================================= */

const homeData = {
    hero: {
        sectionId: "home",
        badge: "Available for Data Analytics Work",
        titleLineOne: "Hi, I'm Mohit Gupta",
        titleHighlight: "Turning Data Into Business Clarity",
        typingPrefix: "I build",
        typingWords: [
            "interactive dashboards",
            "business-focused analytics projects",
            "SQL and Power BI solutions",
            "data-driven decision systems",
            "portfolio-ready case studies"
        ],
        description:
            "I am a Data Analytics portfolio builder focused on creating practical analytics projects, KPI-driven dashboards, business intelligence reports, and decision-support solutions across e-commerce, marketing, supply chain, finance, and business analytics.",
        buttons: [
            {
                label: "View My Projects",
                href: "#projects",
                icon: "fa-solid fa-arrow-right"
            },
            {
                label: "Let's Connect",
                href: "#contact",
                icon: "fa-solid fa-envelope"
            }
        ],
        particles: 14
    },

    about: {
        sectionId: "about",
        eyebrow: "About Me",
        heading: "My Data Analytics Journey",
        description:
            "I’m building a practical data analytics career focused on turning raw business data into clear dashboards, KPI stories, business insights, and decision-support solutions.",
        storyTitle: "My Analytics Story",
        storyParagraphs: [
            "I am focused on building a strong Data Analytics portfolio through practical projects, dashboard development, SQL practice, Python-based analysis, and business intelligence case studies.",
            "My goal is to connect business problems with meaningful KPIs, clean visuals, clear insights, and recommendations that help recruiters, hiring managers, founders, and clients understand how data can support better decisions."
        ],
        highlights: [
            {
                icon: "fa-solid fa-magnifying-glass-chart",
                title: "Business Problem Understanding",
                text: "I start by understanding the business question before building dashboards, charts, or reports."
            },
            {
                icon: "fa-solid fa-chart-line",
                title: "Dashboard & KPI Thinking",
                text: "I focus on KPI logic, filters, trends, comparisons, and business-friendly dashboard structure."
            },
            {
                icon: "fa-solid fa-lightbulb",
                title: "Insight Communication",
                text: "I explain analysis in a simple way so insights can support decisions and next actions."
            },
            {
                icon: "fa-solid fa-briefcase",
                title: "Project-Based Portfolio",
                text: "I build real-world analytics projects across e-commerce, supply chain, finance, marketing, and operations."
            }
        ],
        stats: [
            {
                value: "4+",
                label: "Portfolio Projects"
            },
            {
                value: "6+",
                label: "Analytics Skills"
            },
            {
                value: "5",
                label: "Business Domains"
            }
        ],
        button: {
            label: "Read Full About Page",
            href: "",
            type: "primary",
            icon: "fa-solid fa-arrow-up-right-from-square",
            target: "_blank"
        }
    },

    skills: {
        sectionId: "skills",
        eyebrow: "Skills",
        heading: "Data Analytics & Marketing Skills",
        description:
            "A practical skill set built across data analytics, business intelligence, dashboard development, and digital marketing.",
        button: {
            label: "Explore Full Skills Page",
            href: "",
            type: "primary",
            icon: "fa-solid fa-arrow-up-right-from-square",
            target: "_blank"
        },
        categories: [
            {
                icon: "fa-solid fa-chart-simple",
                title: "Data Analytics Foundations",
                skills: [
                    { name: "Data Cleaning & Preparation", level: 85 },
                    { name: "Exploratory Data Analysis (EDA)", level: 82 },
                    { name: "Data Interpretation", level: 84 },
                    { name: "KPI Understanding", level: 80 }
                ]
            },
            {
                icon: "fa-solid fa-database",
                title: "SQL & Databases",
                skills: [
                    { name: "SQL Query Writing", level: 82 },
                    { name: "Filtering, Sorting & Aggregation", level: 80 },
                    { name: "GROUP BY / HAVING Logic", level: 76 },
                    { name: "Joins & Relational Data Handling", level: 74 }
                ]
            },
            {
                icon: "fa-solid fa-chart-pie",
                title: "Dashboarding & BI Tools",
                skills: [
                    { name: "Power BI Dashboard Design", level: 84 },
                    { name: "Tableau Fundamentals", level: 76 },
                    { name: "KPI Dashboard Structuring", level: 82 },
                    { name: "Data Visualization Best Practices", level: 80 }
                ]
            },
            {
                icon: "fa-brands fa-python",
                title: "Python for Analytics",
                skills: [
                    { name: "Python Fundamentals", level: 78 },
                    { name: "Pandas & NumPy", level: 75 },
                    { name: "Data Visualization with Python", level: 72 },
                    { name: "Analytical Problem Solving", level: 77 }
                ]
            },
            {
                icon: "fa-solid fa-bullhorn",
                title: "Digital Marketing & Performance",
                skills: [
                    { name: "SEO Fundamentals", level: 78 },
                    { name: "Social Media Strategy", level: 82 },
                    { name: "Content Planning", level: 84 },
                    { name: "Campaign Performance Thinking", level: 74 }
                ]
            },
            {
                icon: "fa-solid fa-file-lines",
                title: "Business, Reporting & Communication",
                skills: [
                    { name: "Insight Communication", level: 85 },
                    { name: "Business Storytelling", level: 80 },
                    { name: "Recommendation Writing", level: 82 },
                    { name: "Presentation & Reporting", level: 81 }
                ]
            }
        ]
    },

    workflow: {
        sectionId: "workflow",
        eyebrow: "Analytics Workflow",
        heading: "How I Turn Data into Business Insights",
        description:
            "My analytics workflow focuses on understanding the business question, preparing the data, defining KPIs, building dashboards, and translating findings into practical recommendations.",
        button: {
            label: "See Project Examples",
            href: "",
            type: "primary",
            icon: "fa-solid fa-arrow-up-right-from-square",
            target: "_blank"
        },
        steps: [
            {
                number: "01",
                title: "Understand the Business Problem",
                text: "Clarify what decision the data should support and what business question needs to be answered."
            },
            {
                number: "02",
                title: "Review and Clean the Data",
                text: "Check missing values, duplicates, formats, useful columns, and data quality issues."
            },
            {
                number: "03",
                title: "Define KPIs and Metrics",
                text: "Create meaningful measures that connect directly with business goals and performance questions."
            },
            {
                number: "04",
                title: "Analyze Trends and Patterns",
                text: "Find performance gaps, customer behavior, operational issues, or growth signals."
            },
            {
                number: "05",
                title: "Build Dashboard or Report",
                text: "Design clear visuals, filters, KPI cards, and charts for decision-making."
            },
            {
                number: "06",
                title: "Explain Insights and Recommendations",
                text: "Convert analysis into business-friendly conclusions and action points."
            }
        ]
    },

    projects: {
        sectionId: "projects",
        eyebrow: "Projects",
        heading: "Featured Data Analytics Projects",
        description:
            "A selection of practical data analytics projects focused on dashboards, KPIs, business insights, operational analysis, customer behavior, and decision-support reporting.",
        button: {
            label: "View Full Projects Page",
            href: "",
            type: "primary",
            icon: "fa-solid fa-arrow-up-right-from-square",
            target: "_blank"
        },
        items: [
            {
                title: "Factory-to-Customer Shipping Route Efficiency Analysis for Nassau Candy Distributor",
                domain: "Supply Chain Analytics",
                status: "Live Dashboard",
                visualLabel: "Nassau Candy Distributor",
                logoImage: "/assets/images/projects/nassau_candy.png",
                logoAlt: "Nassau Candy Distributor logo",
                summary:
                    "Analyzed shipment performance, route efficiency, lead time, and operational patterns to improve supply chain visibility and decision-making.",
                tools: ["Python", "Pandas", "Plotly", "Streamlit Dashboard"],
                highlights: [
                    "Shipment performance tracking",
                    "Route efficiency analysis",
                    "Lead time visibility",
                    "Operational KPI dashboard"
                ],
                links: [
                    {
                        label: "Live Dashboard",
                        href: "https://factory-to-customer-shipping-route-efficiency-analysis.streamlit.app/",
                        type: "primary",
                        icon: "fa-solid fa-play",
                        target: "_blank"
                    },
                    {
                        label: "GitHub Code",
                        href: "https://github.com/techwithmohitgupta/nassau-candy-shipping-route-efficiency-analysis",
                        type: "secondary",
                        icon: "fab fa-github",
                        target: "_blank"
                    }
                ]
            },
            {
                title: "Customer Engagement & Product Utilization Analytics for Retention Strategy",
                domain: "Customer Analytics / Retention",
                status: "Portfolio Project",
                visualLabel: "Customer Engagement Analytics",
                logoImage: "/assets/images/projects/ecb_logo.svg",
                logoAlt: "Customer engagement analytics project logo",
                summary:
                    "Explored customer engagement and product usage patterns to identify retention signals, behavioral trends, and product utilization opportunities.",
                tools: ["Python", "Pandas", "Plotly", "Streamlit Dashboard"],
                highlights: [
                    "Customer engagement analysis",
                    "Product usage patterns",
                    "Retention strategy support",
                    "Behavior-focused insights"
                ],
                links: [
                    {
                        label: "Live Dashboard",
                        href: "https://customer-engagement-retention-analytics-dashboard.streamlit.app/",
                        type: "primary",
                        icon: "fa-solid fa-play",
                        target: "_blank"
                    },
                    {
                        label: "GitHub Code",
                        href: "https://github.com/techwithmohitgupta/customer-engagement-product-utilization-retention-analytics",
                        type: "secondary",
                        icon: "fab fa-github",
                        target: "_blank"
                    }
                ]
            }
        ]
    },

    experience: {
        sectionId: "experience",
        eyebrow: "Learning Journey",
        heading: "Experience & Learning Journey",
        description:
            "Building a data analytics career through consistent practice, real-world projects, dashboard development, SQL learning, Python analysis, and portfolio documentation.",
        button: {
            label: "View Full Experience Page",
            href: "",
            type: "primary",
            icon: "fa-solid fa-arrow-up-right-from-square",
            target: "_blank"
        },
        items: [
            {
                title: "Project-Based Learning",
                description: "Building practical analytics projects instead of only learning theory."
            },
            {
                title: "SQL Practice",
                description: "Practicing queries, filtering, grouping, aggregations, and business logic."
            },
            {
                title: "Dashboard Development",
                description: "Creating dashboards that connect KPIs, visuals, filters, and decision-making."
            },
            {
                title: "Case Study Documentation",
                description: "Writing project explanations, insights, recommendations, and research-style reports."
            },
            {
                title: "Portfolio Visibility",
                description: "Sharing progress through GitHub, Streamlit dashboards, and LinkedIn personal branding."
            }
        ]
    },

    contact: {
        sectionId: "contact",
        eyebrow: "Contact",
        heading: "Get In Touch",
        description:
            "Have a data analytics project, internship opportunity, freelance work, referral, or full-time data analyst role? Feel free to send a message or connect through my professional profiles.",
        formAction: "https://formspree.io/f/xvzjqqly",
        formSubject: "New message from Mohit Gupta Data Analytics Portfolio",
        infoTitle: "Contact Information",
        infoText:
            "I am open to data analytics projects, dashboard development work, internships, freelance analytics opportunities, referrals, and full-time data analyst roles.",
        contactItems: [
            {
                icon: "fa-solid fa-envelope",
                label: "Email",
                value: "digitalmohitgupta.work@gmail.com",
                href: "mailto:digitalmohitgupta.work@gmail.com",
                color: "blue"
            },
            {
                icon: "fab fa-linkedin-in",
                label: "LinkedIn",
                value: "mohitgupta-data-analyst",
                href: "https://www.linkedin.com/in/mohitgupta-data-analyst/",
                color: "blue"
            },
            {
                icon: "fab fa-github",
                label: "GitHub",
                value: "techwithmohitgupta",
                href: "https://github.com/techwithmohitgupta",
                color: "dark"
            },
            {
                icon: "fa-solid fa-circle-check",
                label: "Availability",
                value: "Open for internships, freelance work, and full-time roles",
                href: "",
                color: "green"
            }
        ],
        socialLinks: [
            {
                icon: "fab fa-linkedin-in",
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/mohitgupta-data-analyst/"
            },
            {
                icon: "fab fa-github",
                label: "GitHub",
                href: "https://github.com/techwithmohitgupta"
            },
            {
                icon: "fab fa-kaggle",
                label: "Kaggle",
                href: "https://www.kaggle.com/"
            }
        ]
    }
};

/* =========================================
   2. Helper Functions
========================================= */

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function clampNumber(value, min, max) {
    const number = Number(value);

    if (Number.isNaN(number)) {
        return min;
    }

    return Math.min(Math.max(number, min), max);
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isExternalURL(href = "") {
    return /^https?:\/\//i.test(href);
}

function createIcon(iconClass) {
    if (!iconClass) {
        return "";
    }

    return `<i class="${escapeHTML(iconClass)}" aria-hidden="true"></i>`;
}

function createLinkAttrs(item = {}) {
    const href = item.href || "#";
    const target = item.target || (isExternalURL(href) ? "_blank" : "");
    const targetAttr = target ? `target="${escapeHTML(target)}"` : "";
    const relAttr = target === "_blank" ? 'rel="noopener noreferrer"' : "";

    return `${targetAttr} ${relAttr}`.trim();
}

function createButton(button = {}) {
    const type = button.type || "secondary";
    const label = button.label || "Learn More";
    const icon = createIcon(button.icon);
    const isDisabled = Boolean(button.disabled || !button.href);
    const disabledClass = isDisabled ? " home-btn-disabled" : "";

    if (isDisabled) {
        return `
            <span class="home-btn home-btn-${escapeHTML(type)}${disabledClass}" aria-disabled="true">
                ${icon}
                <span>${escapeHTML(label)}</span>
            </span>
        `;
    }

    return `
        <a
            href="${escapeHTML(button.href)}"
            class="home-btn home-btn-${escapeHTML(type)}"
            ${createLinkAttrs(button)}
        >
            ${icon}
            <span>${escapeHTML(label)}</span>
        </a>
    `;
}

function createButtonGroup(buttons = [], wrapperClass = "home-section-actions") {
    if (!buttons.length) {
        return "";
    }

    return `
        <div class="${escapeHTML(wrapperClass)}">
            ${buttons.map(createButton).join("")}
        </div>
    `;
}

function createSectionHeader(sectionData = {}) {
    return `
        <div class="home-section-header">
            <span class="home-eyebrow">${escapeHTML(sectionData.eyebrow)}</span>
            <h2 class="home-section-title">${escapeHTML(sectionData.heading)}</h2>
            <p class="home-section-description">${escapeHTML(sectionData.description)}</p>
        </div>
    `;
}

function createTagList(tags = []) {
    if (!tags.length) {
        return "";
    }

    return `
        <div class="home-tag-list">
            ${tags
                .map(function (tag) {
                    return `<span class="home-tag">${escapeHTML(tag)}</span>`;
                })
                .join("")}
        </div>
    `;
}

function createBadge(label) {
    if (!label) {
        return "";
    }

    return `<span class="home-badge">${escapeHTML(label)}</span>`;
}

function createHeroParticles(count = 0) {
    const safeCount = clampNumber(count, 0, 14);

    return Array.from({ length: safeCount }, function (_, index) {
        return `<span class="hero-particle hero-particle-${index + 1}" aria-hidden="true"></span>`;
    }).join("");
}

/* =========================================
   3. Section Render Functions
========================================= */

function renderHeroSection() {
    const hero = homeData.hero;

    const heroButtonsHTML = hero.buttons
        .map(function (button, index) {
            const buttonClass = index === 0 ? "hero-primary-btn" : "hero-secondary-btn";

            return `
                <a href="${escapeHTML(button.href)}" class="${buttonClass}">
                    <span>${escapeHTML(button.label)}</span>
                    ${createIcon(button.icon)}
                </a>
            `;
        })
        .join("");

    return `
        <section id="${escapeHTML(hero.sectionId)}" class="home-section home-hero home-hero-centered" aria-labelledby="home-hero-title">
            <div class="hero-network-bg" aria-hidden="true">
                ${createHeroParticles(hero.particles)}
            </div>

            <div class="home-container">
                <div class="hero-centered-content">
                    <span class="hero-availability-badge">
                        ${escapeHTML(hero.badge)}
                    </span>

                    <h1 id="home-hero-title" class="hero-centered-title">
                        <span>${escapeHTML(hero.titleLineOne)}</span>
                        <span class="hero-title-gradient">${escapeHTML(hero.titleHighlight)}</span>
                    </h1>

                    <div class="hero-typing-wrap" aria-label="Dynamic data analytics focus">
                        <span class="hero-typing-prefix">${escapeHTML(hero.typingPrefix)}</span>
                        <span id="hero-typing-text" class="hero-typing-text"></span>
                        <span class="hero-typing-cursor" aria-hidden="true">|</span>
                    </div>

                    <p class="hero-centered-description">
                        ${escapeHTML(hero.description)}
                    </p>

                    <div class="hero-centered-actions">
                        ${heroButtonsHTML}
                    </div>

                    <a href="#about" class="hero-scroll-indicator" aria-label="Scroll to About section">
                        <span>Scroll Down</span>
                        <span class="hero-scroll-arrow" aria-hidden="true">⌄</span>
                    </a>
                </div>
            </div>
        </section>
    `;
}

function renderAboutSection() {
    const about = homeData.about;

    const storyParagraphsHTML = about.storyParagraphs
        .map(function (paragraph) {
            return `<p>${escapeHTML(paragraph)}</p>`;
        })
        .join("");

    const statsHTML = about.stats
        .map(function (stat) {
            return `
                <div class="about-stat-card">
                    <span class="about-stat-value">${escapeHTML(stat.value)}</span>
                    <span class="about-stat-label">${escapeHTML(stat.label)}</span>
                </div>
            `;
        })
        .join("");

    const highlightsHTML = about.highlights
        .map(function (item) {
            return `
                <article class="about-value-card">
                    <div class="about-value-icon">
                        ${createIcon(item.icon)}
                    </div>

                    <h3>${escapeHTML(item.title)}</h3>
                    <p>${escapeHTML(item.text)}</p>
                </article>
            `;
        })
        .join("");

    return `
        <section id="${escapeHTML(about.sectionId)}" class="home-section home-about about-centered-section">
            <div class="about-orbit-bg" aria-hidden="true">
                <span class="about-orbit about-orbit-1"></span>
                <span class="about-orbit about-orbit-2"></span>
                <span class="about-orbit about-orbit-3"></span>
            </div>

            <div class="home-container">
                <div class="about-centered-header">
                    <span class="home-eyebrow">${escapeHTML(about.eyebrow)}</span>
                    <h2 class="about-centered-title">${escapeHTML(about.heading)}</h2>
                    <span class="about-title-line" aria-hidden="true"></span>
                    <p class="about-centered-description">${escapeHTML(about.description)}</p>
                </div>

                <article class="about-main-card">
                    <div class="about-main-card-glow" aria-hidden="true"></div>

                    <div class="about-main-icon">
                        <i class="fa-solid fa-chart-line" aria-hidden="true"></i>
                    </div>

                    <h3>${escapeHTML(about.storyTitle)}</h3>

                    <div class="about-story-text">
                        ${storyParagraphsHTML}
                    </div>

                    <div class="about-stats-grid">
                        ${statsHTML}
                    </div>

                    ${createButtonGroup([about.button], "about-main-actions")}
                </article>

                <div class="about-value-grid">
                    ${highlightsHTML}
                </div>
            </div>
        </section>
    `;
}

function renderSkillsSection() {
    const skills = homeData.skills;

    const categoriesHTML = skills.categories
        .map(function (category, index) {
            const progressHTML = category.skills
                .map(function (skill) {
                    const level = clampNumber(skill.level, 0, 100);

                    return `
                        <div class="skill-progress-item">
                            <div class="skill-progress-top">
                                <span>${escapeHTML(skill.name)}</span>
                                <strong>${level}%</strong>
                            </div>

                            <div
                                class="skill-progress-track"
                                role="progressbar"
                                aria-valuenow="${level}"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-label="${escapeHTML(skill.name)} skill level"
                            >
                                <span
                                    class="skill-progress-fill"
                                    style="--skill-level: ${level}%;"
                                ></span>
                            </div>
                        </div>
                    `;
                })
                .join("");

            return `
                <article class="skills-progress-card skills-progress-card-${index + 1}">
                    <div class="skills-progress-card-header">
                        <div class="skills-progress-icon">
                            ${createIcon(category.icon)}
                        </div>

                        <h3>${escapeHTML(category.title)}</h3>
                    </div>

                    <div class="skill-progress-list">
                        ${progressHTML}
                    </div>
                </article>
            `;
        })
        .join("");

    return `
        <section id="${escapeHTML(skills.sectionId)}" class="home-section home-skills skills-progress-section">
            <div class="home-container">
                <div class="home-section-header">
                    <span class="home-eyebrow">${escapeHTML(skills.eyebrow)}</span>
                    <h2 class="home-section-title">${escapeHTML(skills.heading)}</h2>
                    <p class="home-section-description">${escapeHTML(skills.description)}</p>
                </div>

                <div class="skills-progress-grid">
                    ${categoriesHTML}
                </div>

                ${createButtonGroup([skills.button])}
            </div>
        </section>
    `;
}

function renderWorkflowSection() {
    const workflow = homeData.workflow;

    const stepsHTML = workflow.steps
        .map(function (step) {
            return `
                <article class="workflow-card">
                    <span class="workflow-number">${escapeHTML(step.number)}</span>
                    <h3 class="workflow-title">${escapeHTML(step.title)}</h3>
                    <p class="workflow-text">${escapeHTML(step.text)}</p>
                </article>
            `;
        })
        .join("");

    return `
        <section id="${escapeHTML(workflow.sectionId)}" class="home-section home-workflow home-section-soft">
            <div class="home-container">
                ${createSectionHeader(workflow)}

                <div class="workflow-grid">
                    ${stepsHTML}
                </div>

                ${createButtonGroup([workflow.button])}
            </div>
        </section>
    `;
}

function renderProjectsSection() {
    const projects = homeData.projects;

    const projectsHTML = projects.items
        .map(function (project, index) {
            const highlightsHTML = project.highlights
                .map(function (highlight) {
                    return `
                        <li>
                            <i class="fa-solid fa-check" aria-hidden="true"></i>
                            <span>${escapeHTML(highlight)}</span>
                        </li>
                    `;
                })
                .join("");

            const buttonsHTML = project.links
                .map(function (link) {
                    return createButton(link);
                })
                .join("");

            return `
                <article class="project-showcase-card project-showcase-card-${index + 1}">
                    <div class="project-logo-preview" aria-label="${escapeHTML(project.visualLabel)}">
                        <img
                            src="${escapeHTML(project.logoImage)}"
                            alt="${escapeHTML(project.logoAlt || project.title)}"
                            class="project-logo-preview-image"
                            loading="lazy"
                            decoding="async"
                        >
                    </div>

                    <div class="project-showcase-content">
                        <div class="project-showcase-meta">
                            ${createBadge(project.domain)}
                            ${createBadge(project.status)}
                        </div>

                        <h3>${escapeHTML(project.title)}</h3>

                        <p>${escapeHTML(project.summary)}</p>

                        <ul class="project-showcase-highlights">
                            ${highlightsHTML}
                        </ul>

                        ${createTagList(project.tools)}

                        <div class="project-showcase-actions">
                            ${buttonsHTML}
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");

    return `
        <section id="${escapeHTML(projects.sectionId)}" class="home-section home-projects projects-showcase-section">
            <div class="home-container">
                <div class="home-section-header">
                    <span class="home-eyebrow">${escapeHTML(projects.eyebrow)}</span>
                    <h2 class="home-section-title">${escapeHTML(projects.heading)}</h2>
                    <p class="home-section-description">${escapeHTML(projects.description)}</p>
                </div>

                <div class="projects-showcase-grid">
                    ${projectsHTML}
                </div>

                ${createButtonGroup([projects.button])}
            </div>
        </section>
    `;
}

function renderExperienceSection() {
    const experience = homeData.experience;

    const experienceHTML = experience.items
        .map(function (item, index) {
            return `
                <article class="journey-card">
                    <span class="journey-card-number">${String(index + 1).padStart(2, "0")}</span>
                    <h3 class="journey-title">${escapeHTML(item.title)}</h3>
                    <p class="journey-description">${escapeHTML(item.description)}</p>
                </article>
            `;
        })
        .join("");

    return `
        <section id="${escapeHTML(experience.sectionId)}" class="home-section home-experience home-section-soft">
            <div class="home-container">
                ${createSectionHeader(experience)}

                <div class="experience-grid">
                    ${experienceHTML}
                </div>

                ${createButtonGroup([experience.button])}
            </div>
        </section>
    `;
}

function renderContactSection() {
    const contact = homeData.contact;

    const contactItemsHTML = contact.contactItems
        .map(function (item) {
            const contentHTML = `
                <span class="contact-item-icon contact-item-icon-${escapeHTML(item.color)}">
                    ${createIcon(item.icon)}
                </span>

                <span class="contact-item-content">
                    <strong>${escapeHTML(item.label)}</strong>
                    <span>${escapeHTML(item.value)}</span>
                </span>
            `;

            if (item.href) {
                return `
                    <a
                        href="${escapeHTML(item.href)}"
                        class="contact-info-item"
                        ${createLinkAttrs(item)}
                    >
                        ${contentHTML}
                    </a>
                `;
            }

            return `
                <div class="contact-info-item">
                    ${contentHTML}
                </div>
            `;
        })
        .join("");

    const socialLinksHTML = contact.socialLinks
        .map(function (social) {
            return `
                <a
                    href="${escapeHTML(social.href)}"
                    class="contact-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="${escapeHTML(social.label)}"
                >
                    ${createIcon(social.icon)}
                </a>
            `;
        })
        .join("");

    return `
        <section id="${escapeHTML(contact.sectionId)}" class="home-section home-contact contact-form-section">
            <div class="home-container">
                <div class="contact-section-header">
                    <span class="home-eyebrow">${escapeHTML(contact.eyebrow)}</span>
                    <h2 class="contact-section-title">${escapeHTML(contact.heading)}</h2>
                    <span class="contact-title-line" aria-hidden="true"></span>
                    <p class="contact-section-description">${escapeHTML(contact.description)}</p>
                </div>

                <div class="contact-layout">
                    <article class="contact-info-card">
                        <h3>${escapeHTML(contact.infoTitle)}</h3>

                        <p>${escapeHTML(contact.infoText)}</p>

                        <div class="contact-info-list">
                            ${contactItemsHTML}
                        </div>

                        <div class="contact-social-links">
                            ${socialLinksHTML}
                        </div>
                    </article>

                    <article class="contact-form-card">
                        <h3>Send A Message</h3>

                        <form
                            class="contact-form"
                            action="${escapeHTML(contact.formAction)}"
                            method="POST"
                        >
                            <input
                                type="hidden"
                                name="_subject"
                                value="${escapeHTML(contact.formSubject)}"
                            >

                            <div class="contact-form-row">
                                <div class="contact-form-group">
                                    <label for="contact-name">Your Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        placeholder="Your full name"
                                        autocomplete="name"
                                        required
                                    >
                                </div>

                                <div class="contact-form-group">
                                    <label for="contact-email">Your Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        placeholder="your.email@example.com"
                                        autocomplete="email"
                                        required
                                    >
                                </div>
                            </div>

                            <div class="contact-form-group">
                                <label for="contact-subject">Subject</label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    placeholder="Project Collaboration / Internship / Freelance Work"
                                    required
                                >
                            </div>

                            <div class="contact-form-group">
                                <label for="contact-message">Message</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows="6"
                                    placeholder="Describe your project, opportunity, or message."
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" class="contact-submit-btn">
                                <span>Send Message</span>
                                <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                            </button>
                        </form>
                    </article>
                </div>
            </div>
        </section>
    `;
}

/* =========================================
   4. Homepage Render
========================================= */

function renderHomepage() {
    const app = document.getElementById("app");

    if (!app) {
        return false;
    }

    app.innerHTML = [
        renderHeroSection(),
        renderAboutSection(),
        renderSkillsSection(),
        renderWorkflowSection(),
        renderProjectsSection(),
        renderExperienceSection(),
        renderContactSection()
    ].join("");

    return true;
}

/* =========================================
   5. Homepage Interactions
========================================= */

function getHeaderOffset() {
    const header = document.getElementById("site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 92;

    return Math.ceil(headerHeight + 14);
}

function scrollToSection(targetElement) {
    if (!targetElement) {
        return;
    }

    const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
    const scrollTop = Math.max(targetTop - getHeaderOffset(), 0);

    window.scrollTo({
        top: scrollTop,
        behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
}

function initSmoothScroll() {
    document.addEventListener(
        "click",
        function (event) {
            const link = event.target.closest('a[href^="#"]');

            if (!link) {
                return;
            }

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            scrollToSection(targetElement);

            if (targetElement.id) {
                history.pushState(null, "", `#${targetElement.id}`);
            }
        },
        { passive: false }
    );
}

function initActiveNav() {
    const navLinks = Array.from(document.querySelectorAll(".nav-link, .nav-cta"));
    const sectionIds = ["home", "about", "skills", "workflow", "projects", "experience", "contact"];
    const sections = sectionIds
        .map(function (id) {
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (!navLinks.length || !sections.length) {
        return;
    }

    const sectionToNavMap = {
        home: "home",
        about: "about",
        skills: "skills",
        workflow: "skills",
        projects: "projects",
        experience: "experience",
        contact: "contact"
    };

    let currentActiveId = "";
    let ticking = false;

    function setActiveLink(sectionId) {
        const navId = sectionToNavMap[sectionId] || sectionId;

        if (!navId || currentActiveId === navId) {
            return;
        }

        currentActiveId = navId;

        navLinks.forEach(function (link) {
            const href = link.getAttribute("href") || "";
            const isActive = href === `#${navId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function updateActiveSection() {
        const checkpoint = window.scrollY + getHeaderOffset() + Math.min(window.innerHeight * 0.28, 260);
        let activeSectionId = sections[0].id;

        sections.forEach(function (section) {
            if (section.offsetTop <= checkpoint) {
                activeSectionId = section.id;
            }
        });

        setActiveLink(activeSectionId);
        ticking = false;
    }

    function requestUpdate() {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
}

function initStaticInteractiveBackground() {
    document.body.style.setProperty("--mouse-x", "50vw");
    document.body.style.setProperty("--mouse-y", "35vh");
}

function initHeroTyping() {
    const typingElement = document.getElementById("hero-typing-text");
    const words = homeData.hero.typingWords;

    if (!typingElement || !words.length) {
        return;
    }

    if (prefersReducedMotion()) {
        typingElement.textContent = words[0];
        return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId = null;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!document.hidden) {
            if (!isDeleting) {
                charIndex += 1;
                typingElement.textContent = currentWord.slice(0, charIndex);
            } else {
                charIndex -= 1;
                typingElement.textContent = currentWord.slice(0, charIndex);
            }
        }

        let typingSpeed = isDeleting ? 42 : 82;

        if (!isDeleting && charIndex >= currentWord.length) {
            typingSpeed = 1250;
            isDeleting = true;
        } else if (isDeleting && charIndex <= 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 280;
        }

        timeoutId = window.setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    window.addEventListener(
        "pagehide",
        function () {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        },
        { once: true }
    );
}

function initAboutCardTilt() {
    if (prefersReducedMotion()) {
        return;
    }

    if (!window.matchMedia("(pointer: fine)").matches || window.innerWidth < 1024) {
        return;
    }

    const cards = document.querySelectorAll(".about-main-card, .about-value-card");

    cards.forEach(function (card) {
        let rect = null;
        let latestEvent = null;
        let frameId = null;

        function updateTilt() {
            if (!rect || !latestEvent) {
                frameId = null;
                return;
            }

            const x = latestEvent.clientX - rect.left;
            const y = latestEvent.clientY - rect.top;

            card.style.setProperty("--tilt-x", `${x}px`);
            card.style.setProperty("--tilt-y", `${y}px`);

            frameId = null;
        }

        card.addEventListener(
            "pointerenter",
            function () {
                rect = card.getBoundingClientRect();
            },
            { passive: true }
        );

        card.addEventListener(
            "pointermove",
            function (event) {
                latestEvent = event;

                if (!frameId) {
                    frameId = window.requestAnimationFrame(updateTilt);
                }
            },
            { passive: true }
        );

        card.addEventListener(
            "pointerleave",
            function () {
                rect = null;
                latestEvent = null;
                card.style.removeProperty("--tilt-x");
                card.style.removeProperty("--tilt-y");
            },
            { passive: true }
        );
    });
}

function initImageFallbacks() {
    const projectLogos = document.querySelectorAll(".project-logo-preview-image");

    projectLogos.forEach(function (image) {
        image.addEventListener(
            "error",
            function () {
                const wrapper = image.closest(".project-logo-preview");
                const fallbackText = image.getAttribute("alt") || "Project Logo";

                if (!wrapper) {
                    return;
                }

                wrapper.innerHTML = `<span class="project-logo-fallback">${escapeHTML(fallbackText)}</span>`;
            },
            { once: true }
        );
    });
}

function initExternalLinkSecurity() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach(function (link) {
        const currentRel = link.getAttribute("rel") || "";
        const relParts = new Set(currentRel.split(" ").filter(Boolean));

        relParts.add("noopener");
        relParts.add("noreferrer");

        link.setAttribute("rel", Array.from(relParts).join(" "));
    });
}

function initHomepage() {
    if (document.body.dataset.page !== "home") {
        return;
    }

    if (window.__MOHIT_HOME_INITIALIZED__) {
        return;
    }

    window.__MOHIT_HOME_INITIALIZED__ = true;

    const isRendered = renderHomepage();

    if (!isRendered) {
        return;
    }

    initStaticInteractiveBackground();
    initSmoothScroll();
    initActiveNav();
    initHeroTyping();
    initAboutCardTilt();
    initImageFallbacks();
    initExternalLinkSecurity();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomepage, { once: true });
} else {
    initHomepage();
}