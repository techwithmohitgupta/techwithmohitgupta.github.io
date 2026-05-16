/* =========================================
   ABOUT PAGE MODULE
   Only About page-specific features
========================================= */

export function initAboutPage() {
  const isAboutPage = document.body?.dataset?.page === "about";
  if (!isAboutPage) return;

  if (document.body.dataset.aboutInitialized === "true") return;
  document.body.dataset.aboutInitialized = "true";

  initAboutTyping();
  renderAboutSections();
  initAboutReveal();
}

/* =========================================
   ABOUT TYPING EFFECT
========================================= */

function initAboutTyping() {
  const typingElement = document.querySelector("#aboutTypingText");
  if (!typingElement) return;

  if (typingElement.dataset.aboutTypingInitialized === "true") return;
  typingElement.dataset.aboutTypingInitialized = "true";

  const roles = [
    "Business-Focused Data Analyst",
    "E-commerce & Marketing Analyst",
    "Supply Chain & Financial Analyst",
    "Digital Marketing Specialist",
    "Visualization & Dashboard Expert",
    "Data Storyteller & Communicator",
    "Python & SQL Enthusiast",
    "Decision Support Analyst",
    "Data-Driven Problem Solver",
    "Power BI Expert"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer = null;

  const TYPE_SPEED = 68;
  const DELETE_SPEED = 34;
  const HOLD_TIME = 1200;
  const NEXT_ROLE_DELAY = 300;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting && charIndex < currentRole.length) {
      charIndex += 1;
    } else if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingTimer = window.setTimeout(typeEffect, HOLD_TIME);
      return;
    } else if (isDeleting && charIndex > 0) {
      charIndex -= 1;
    } else {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingTimer = window.setTimeout(typeEffect, NEXT_ROLE_DELAY);
      return;
    }

    typingElement.textContent = currentRole.slice(0, charIndex);
    typingTimer = window.setTimeout(typeEffect, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  typingElement.textContent = "";
  typeEffect();

  document.addEventListener("visibilitychange", () => {
    if (typingTimer) {
      window.clearTimeout(typingTimer);
    }

    if (!document.hidden) {
      typingTimer = window.setTimeout(typeEffect, 300);
    }
  });
}

/* =========================================
   DATA
========================================= */

const aboutData = {
  journey: [
    {
      year: "Stage 01",
      title: "Digital Marketing Foundation",
      text: "Built practical understanding of SEO, website performance, user behavior, content structure, and reporting."
    },
    {
      year: "Stage 02",
      title: "Performance & Reporting Exposure",
      text: "Worked with metrics, reports, trends, and business performance signals across digital channels."
    },
    {
      year: "Stage 03",
      title: "Data Analytics Direction",
      text: "Shifted toward Python, SQL, Power BI, Tableau, Excel, and real-world analytics projects."
    }
  ],

  capabilities: [
    {
      icon: "fa-chart-line",
      title: "Analyze Business Data",
      text: "Identify patterns, trends, gaps, and opportunities from business datasets."
    },
    {
      icon: "fa-gauge-high",
      title: "Build KPI Dashboards",
      text: "Design dashboards focused on clarity, performance tracking, and decision-making."
    },
    {
      icon: "fa-magnifying-glass-chart",
      title: "Find Operational Bottlenecks",
      text: "Analyze delays, inefficiencies, route issues, category performance, and process gaps."
    },
    {
      icon: "fa-lightbulb",
      title: "Translate Insights",
      text: "Convert analysis into simple, business-focused recommendations."
    }
  ],

  why: [
    "Businesses do not need dashboards full of random charts. They need clarity.",
    "My goal is to use analytics to explain what is happening, why it is happening, and what action can be taken next."
  ],

  principles: [
    {
      title: "Clarity over complexity",
      text: "Insights should be easy to understand and useful for decisions."
    },
    {
      title: "Business problem first",
      text: "I begin with the business question before jumping into tools."
    },
    {
      title: "Action-oriented reporting",
      text: "Dashboards should guide the next move, not just display numbers."
    }
  ],

  process: [
    {
      step: "01",
      title: "Understand Problem",
      text: "Define business questions, KPIs, and expected decision outcomes."
    },
    {
      step: "02",
      title: "Clean & Prepare Data",
      text: "Handle missing values, formatting issues, duplicates, and transformations."
    },
    {
      step: "03",
      title: "Analyze & Visualize",
      text: "Explore patterns, compare segments, build charts, and validate insights."
    },
    {
      step: "04",
      title: "Recommend Actions",
      text: "Convert findings into practical business recommendations."
    }
  ],

  skills: [
    {
      category: "Programming & Data",
      tools: ["Python", "Pandas", "NumPy", "SQL", "Excel"]
    },
    {
      category: "Visualization",
      tools: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Plotly"]
    },
    {
      category: "Analytics Domains",
      tools: ["Marketing Analytics", "E-commerce Analytics", "Supply Chain Analytics", "Finance Analytics"]
    }
  ],

  domains: [
    {
      icon: "fa-cart-shopping",
      title: "E-commerce Analytics",
      text: "Customer behavior, product performance, conversion, and operational performance."
    },
    {
      icon: "fa-truck-fast",
      title: "Supply Chain Analytics",
      text: "Route efficiency, shipping delays, lead time, and logistics bottlenecks."
    },
    {
      icon: "fa-bullhorn",
      title: "Marketing Analytics",
      text: "SEO, traffic, campaign performance, reporting, and customer acquisition signals."
    },
    {
      icon: "fa-coins",
      title: "Finance Analytics",
      text: "Profitability, margin performance, revenue patterns, and business performance tracking."
    }
  ],

  experience: [
    {
      date: "Feb 2026 — Present",
      title: "Data Analyst Intern",
      company: "Unified Mentor Private Limited",
      text: "Working on real-world datasets, data cleaning, EDA, KPI design, dashboards, and business-focused insights."
    },
    {
      date: "Oct 2024 — May 2025",
      title: "Digital Marketing Executive",
      company: "Earth Rhythm",
      text: "Worked on Shopify SEO, website hygiene, product listing, performance tracking, and weekly reporting."
    },
    {
      date: "Jan 2023 — Jul 2023",
      title: "Digital Marketing Executive",
      company: "QPe",
      text: "Supported e-commerce operations, Shopify setup, SEO, and marketing execution for merchant growth."
    }
  ],

  projects: [
    {
      title: "Shipping Route Efficiency Dashboard",
      text: "Analyzed shipping lead time, delay frequency, route volume, and bottlenecks using Streamlit and business KPIs."
    },
    {
      title: "Product Line Profitability Analysis",
      text: "Focused on margin performance, product segmentation, profitability, and actionable business recommendations."
    }
  ],

  values: [
    {
      icon: "fa-bullseye",
      title: "Clarity",
      text: "I focus on making complex data easier to understand."
    },
    {
      icon: "fa-layer-group",
      title: "Structure",
      text: "I prefer organized thinking, clean workflows, and step-by-step execution."
    },
    {
      icon: "fa-arrow-trend-up",
      title: "Growth",
      text: "I continuously improve through projects, feedback, and practical learning."
    },
    {
      icon: "fa-handshake",
      title: "Business Impact",
      text: "I care about insights that support real decisions and outcomes."
    }
  ]
};

const whoStrengths = [
  {
    icon: "fa-bullseye",
    title: "Business-Oriented Thinking",
    text: "I begin with the business problem, understand the context, and connect data with measurable outcomes."
  },
  {
    icon: "fa-chart-simple",
    title: "Data-Driven Approach",
    text: "I clean, analyze, compare, and interpret data to find patterns that support practical decisions."
  },
  {
    icon: "fa-gauge-high",
    title: "Performance Mindset",
    text: "My marketing background helps me understand KPIs, user behavior, traffic, conversion, and business performance."
  },
  {
    icon: "fa-lightbulb",
    title: "Insight Communication",
    text: "I convert analysis into simple, structured insights that are easy to understand and act on."
  }
];

const whoStats = [
  { icon: "fa-briefcase", number: "3+", label: "Years Business Exposure" },
  { icon: "fa-diagram-project", number: "10+", label: "Projects & Practice Work" },
  { icon: "fa-toolbox", number: "8+", label: "Analytics Tools" },
  { icon: "fa-chart-line", number: "4", label: "Focused Domains" }
];

const whoMiniJourney = [
  {
    year: "Stage 01",
    title: "Digital Marketing Foundation",
    text: "Worked with SEO, website performance, content structure, traffic behavior, and e-commerce operations."
  },
  {
    year: "Stage 02",
    title: "Performance & Reporting Mindset",
    text: "Started understanding metrics, reporting, customer behavior, trends, and business performance signals."
  },
  {
    year: "Stage 03",
    title: "Data Analytics Direction",
    text: "Moved toward Python, SQL, Excel, Power BI, dashboards, business KPIs, and decision-focused analytics."
  },
  {
    year: "Stage 04",
    title: "Portfolio & Real-World Projects",
    text: "Building end-to-end analytics projects, dashboards, and business case studies focused on real-world problem solving."
  }
];

const whoDriveList = [
  "Solving real business problems",
  "Finding clarity from messy data",
  "Building dashboards with purpose",
  "Turning insights into decisions",
  "Improving through projects",
  "Understanding customer behavior",
  "Connecting KPIs with outcomes",
  "Communicating insights simply"
];

const whoBottomProof = [
  {
    title: "Marketing + Analytics",
    text: "A blended profile that understands both business execution and data interpretation."
  },
  {
    title: "Decision Support",
    text: "Focused on insights that explain what is happening, why it matters, and what action comes next."
  }
];

const skillDetails = [
  {
    badge: "Selected Skill Group",
    focus: "Data cleaning, analysis, transformation, and structured problem-solving.",
    workflow: ["Clean Data", "Analyze Patterns", "Build Logic", "Prepare Insights"]
  },
  {
    badge: "Selected Skill Group",
    focus: "Dashboard building, visual storytelling, and business performance communication.",
    workflow: ["Design Charts", "Compare KPIs", "Explain Trends", "Support Decisions"]
  },
  {
    badge: "Selected Skill Group",
    focus: "Applying analytics thinking across business areas where data drives action.",
    workflow: ["Understand Domain", "Define Metrics", "Find Gaps", "Recommend Actions"]
  }
];

/* =========================================
   RENDER HELPERS
========================================= */

function renderList(containerId, items, template) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = items.map(template).join("");
}

function renderAboutSections() {
  renderList("whoIAmContent", whoStrengths, (item) => `
    <article class="who-strength-card">
      <i class="fa-solid ${item.icon}"></i>
      <div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `);

  renderList("identityHighlights", whoStats, (item) => `
    <div class="who-stat-item">
      <i class="fa-solid ${item.icon}"></i>
      <div>
        <strong>${item.number}</strong>
        <span>${item.label}</span>
      </div>
    </div>
  `);

  renderList("whoMiniJourney", whoMiniJourney, (item) => `
    <div class="who-mini-step">
      <span>${item.year}</span>
      <div>
        <h4>${item.title}</h4>
        <p>${item.text}</p>
      </div>
    </div>
  `);

  renderList("whoDriveList", whoDriveList, (item) => `
    <div class="who-drive-item">
      <i class="fa-solid fa-check"></i>
      <span>${item}</span>
    </div>
  `);

  renderList("whoBottomProof", whoBottomProof, (item) => `
    <article class="who-bottom-proof-card">
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </article>
  `);

  renderList("journeyTimeline", aboutData.journey, (item) => `
    <div class="about-timeline-item about-reveal">
      <span>${item.year}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </div>
  `);

  renderList("whatIDoList", aboutData.capabilities, (item) => `
    <article class="about-capability-card about-reveal">
      <i class="fa-solid ${item.icon}"></i>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `);

  renderList("whyIDoContent", aboutData.why, (text) => `<p>${text}</p>`);

  renderList("whyPrinciples", aboutData.principles, (item) => `
    <article class="about-principle-card about-reveal">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `);

  renderList("howIDoProcess", aboutData.process, (item) => `
    <article class="about-process-step about-reveal">
      <strong>${item.step}</strong>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `);

  initAboutSkillsTabs();

  renderList("domainFocusGrid", aboutData.domains, (item) => `
    <article class="about-domain-card about-reveal">
      <i class="fa-solid ${item.icon}"></i>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `);

  renderList("experienceTimeline", aboutData.experience, (item) => `
    <article class="about-experience-card about-reveal">
      <span>${item.date}</span>
      <h3>${item.title}</h3>
      <p><strong>${item.company}</strong></p>
      <p>${item.text}</p>
    </article>
  `);

  renderList("projectProofList", aboutData.projects, (item, index) => {
    const projectMeta = [
      {
        type: "Case Study 01",
        focus: "Logistics Analytics",
        points: ["Lead Time", "Delay Frequency", "Route Efficiency"]
      },
      {
        type: "Case Study 02",
        focus: "Profitability Analytics",
        points: ["Margin Analysis", "Product Segmentation", "Business Recommendations"]
      }
    ];

    const meta = projectMeta[index] || projectMeta[0];

    return `
      <article class="about-project-card about-reveal">
        <div class="project-card-head">
          <span class="project-card-badge">${meta.type}</span>
          <span class="project-card-focus">${meta.focus}</span>
        </div>

        <h3>${item.title}</h3>
        <p>${item.text}</p>

        <div class="project-card-points">
          ${meta.points.map((point) => `<span>${point}</span>`).join("")}
        </div>
      </article>
    `;
  });

  renderList("personalValuesGrid", aboutData.values, (item) => `
    <article class="about-value-card about-reveal">
      <i class="fa-solid ${item.icon}"></i>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `);
}

/* =========================================
   ABOUT SKILLS TABS
========================================= */

function initAboutSkillsTabs() {
  const skillsTabs = document.getElementById("skillsTabs");
  const skillsGrid = document.getElementById("skillsSystemGrid");

  if (!skillsTabs || !skillsGrid) return;

  skillsTabs.innerHTML = aboutData.skills
    .map((item, index) => `
      <button class="about-skill-tab ${index === 0 ? "active" : ""}" data-skill-index="${index}" type="button">
        ${item.category}
      </button>
    `)
    .join("");

  function renderSkillCard(index = 0) {
    const skill = aboutData.skills[index];
    const details = skillDetails[index] || skillDetails[0];

    if (!skill) return;

    skillsGrid.innerHTML = `
      <article class="about-skill-card about-reveal is-visible">
        <div class="skill-card-top">
          <span class="skill-card-badge">${details.badge}</span>
          <h3>${skill.category}</h3>
          <p>${details.focus}</p>
        </div>

        <div class="about-skill-list">
          ${skill.tools.map((tool) => `<span>${tool}</span>`).join("")}
        </div>

        <div class="skill-workflow-grid">
          ${details.workflow.map((workflowItem, i) => `
            <div class="skill-workflow-item">
              <strong>0${i + 1}</strong>
              <span>${workflowItem}</span>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }

  renderSkillCard(0);

  if (skillsTabs.dataset.aboutSkillsInitialized === "true") return;
  skillsTabs.dataset.aboutSkillsInitialized = "true";

  skillsTabs.addEventListener("click", (event) => {
    const tab = event.target.closest(".about-skill-tab");
    if (!tab) return;

    const selectedIndex = Number(tab.dataset.skillIndex);

    skillsTabs.querySelectorAll(".about-skill-tab").forEach((btn) => {
      btn.classList.remove("active");
    });

    tab.classList.add("active");
    renderSkillCard(selectedIndex);
  });
}

/* =========================================
   REVEAL ANIMATION
========================================= */

function initAboutReveal() {
  const revealItems = document.querySelectorAll(".about-reveal");
  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}