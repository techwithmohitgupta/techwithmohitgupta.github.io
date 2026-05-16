/* =========================================================
   HOME PAGE DYNAMIC ENGINE
   Mohit Gupta Portfolio
   Fully Dynamic Homepage • Safe Mode Clean Version
========================================================= */

export function initHomePage() {
  const isHomePage = document.body?.dataset?.page === "home";
  if (!isHomePage) return;

  renderHomeHero();
  renderHomeValueCards();
  renderDecisionSystem();
  renderFocusAreas();
  renderFeaturedWork();
  renderProofGrid();
  renderHomeCTA();
  initHomeHeroTyping();
}

/* =========================================================
   SMALL HELPERS
========================================================= */

function $(selector, parent = document) {
  return parent.querySelector(selector);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (!element || typeof value !== "string") return;
  element.textContent = value;
}

function safeText(value) {
  if (typeof value !== "string") return "";

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeIcon(iconClass) {
  if (typeof iconClass !== "string") return "";
  return iconClass.replace(/[^a-zA-Z0-9\-\s]/g, "");
}

/* =========================================================
   HERO DATA
========================================================= */

const homeHeroData = {
  eyebrow: "Data Analytics • Business Intelligence • Decision Systems",

  title: {
    firstLine: "Turning Data",
    secondLine: "into",
    typingWords: [
      "Business Clarity",
      "Better Decisions",
      "Clear Insights",
      "Growth Signals",
      "Decision Systems",
      "Business Reports"
    ]
  },

  description:
    "I work with data to uncover insights that help businesses improve performance, understand customers, and make better decisions across eCommerce, marketing, supply chain, and business analytics domains.",

  actions: [
    {
      label: "View Projects",
      href: "projects.html",
      type: "primary",
      icon: "fa-solid fa-arrow-right"
    },
    {
      label: "Let’s Connect",
      href: "contact.html",
      type: "secondary",
      icon: "fa-regular fa-paper-plane"
    }
  ],

  proof: [
    {
      title: "Business-first",
      text: "Analytics thinking"
    },
    {
      title: "Project-driven",
      text: "Portfolio execution"
    },
    {
      title: "Decision-focused",
      text: "Insight delivery"
    }
  ],

  card: {
    icon: "fa-solid fa-chart-line",
    kicker: "Analytics Direction",
    subtitle: "Business-focused dashboard thinking",
    title: "Transforming raw data into actionable business intelligence",
    text:
      "I focus on building practical analytics projects that connect data, business problems, KPI logic, dashboard design, and decision-making.",

    focusList: [
      "Business-driven data decision frameworks",
      "KPI design with clarity, context, and impact",
      "Real-world analytics across eCommerce, marketing, and supply chain"
    ],

    metrics: [
      {
        value: "01",
        label: "Problem"
      },
      {
        value: "02",
        label: "Data"
      },
      {
        value: "03",
        label: "Insight"
      },
      {
        value: "04",
        label: "Decision"
      }
    ]
  }
};

/* =========================================================
   HOMEPAGE SECTION DATA
========================================================= */

const homeValueCards = [
  {
    icon: "fa-solid fa-chart-simple",
    title: "Business Clarity",
    text: "Turning raw data into clear business questions, useful KPIs, and insight direction that supports better decisions."
  },
  {
    icon: "fa-solid fa-gauge-high",
    title: "Dashboard Thinking",
    text: "Designing dashboards around user flow, comparison, filters, risk areas, and the decisions stakeholders need to make."
  },
  {
    icon: "fa-solid fa-lightbulb",
    title: "Insight Direction",
    text: "Connecting analysis with practical recommendations so the output becomes useful beyond charts, numbers, and reports."
  },
  {
    icon: "fa-solid fa-layer-group",
    title: "Portfolio Execution",
    text: "Building analytics projects with business context, clean structure, data logic, visualization, and presentation-ready storytelling."
  }
];

const decisionPoints = [
  "Start with the business question before selecting charts.",
  "Define KPIs clearly so every metric has a business purpose.",
  "Use visuals to simplify decisions, not decorate the dashboard.",
  "Translate findings into next steps, priorities, and recommendations."
];

const decisionSteps = [
  {
    number: "01",
    title: "Question",
    text: "Understand the decision, business problem, audience, and expected outcome before touching the dashboard."
  },
  {
    number: "02",
    title: "Data Logic",
    text: "Clean, validate, structure, and prepare the data so the analysis is reliable and meaningful."
  },
  {
    number: "03",
    title: "KPI Design",
    text: "Create metrics that explain performance, movement, risk, contribution, and business impact."
  },
  {
    number: "04",
    title: "Dashboard",
    text: "Build a clean visual layer that makes comparison, filtering, and decision review easier."
  },
  {
    number: "05",
    title: "Recommendation",
    text: "Convert insights into practical business recommendations that explain what should improve next."
  },
  {
    number: "06",
    title: "Action",
    text: "Turn recommendations into clear next steps, ownership, follow-through, and measurable improvement."
  }
];

const focusAreas = [
  {
    id: "analytics",
    label: "Data Analytics",
    icon: "fa-solid fa-database",
    title: "Building analytical thinking around real business problems.",
    text: "My focus is on data cleaning, exploration, KPI logic, trend analysis, and creating business-ready interpretations from raw datasets.",
    points: ["Data cleaning", "EDA", "KPI logic", "Insight writing", "Decision support"]
  },
  {
    id: "bi",
    label: "BI Dashboards",
    icon: "fa-solid fa-chart-pie",
    title: "Designing dashboards that guide decisions with clarity.",
    text: "I focus on dashboards that are not just visually clean, but also structured around questions, filters, user flow, and decision-making.",
    points: ["Power BI", "Streamlit", "Interactive filters", "Executive layout", "Visual hierarchy"]
  },
  {
    id: "marketing",
    label: "Marketing Analytics",
    icon: "fa-solid fa-bullhorn",
    title: "Connecting marketing background with analytics execution.",
    text: "My digital marketing background helps me understand customer behavior, traffic, content performance, and conversion-focused reporting.",
    points: ["SEO context", "Traffic analysis", "Customer behavior", "Performance reporting"]
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: "fa-solid fa-cart-shopping",
    title: "Understanding sales, customers, products, and profitability.",
    text: "I’m building projects that analyze sales patterns, product performance, margins, customer segments, and operational improvement areas.",
    points: ["Sales trends", "Product analysis", "Profitability", "Customer patterns"]
  },
  {
    id: "supply",
    label: "Supply Chain",
    icon: "fa-solid fa-route",
    title: "Exploring operational performance through data.",
    text: "I’m learning how data can reveal shipping delays, routing inefficiencies, cost pressure, and process bottlenecks.",
    points: ["Lead time", "Route performance", "Delay analysis", "Operational KPIs"]
  }
];

/* =========================================================
   FEATURED WORK DATA
   IMPORTANT:
   Only 2 projects are intentionally visible on homepage.
========================================================= */

const featuredWork = [
  {
    badge: "Supply Chain Analytics",
    title: "Shipping Route Efficiency Analysis",
    text:
      "A dashboard-focused project designed to identify delivery delays, route bottlenecks, regional shipping performance, and route-level efficiency gaps.",
    outcome:
      "Helps explain where delays happen, which routes need attention, and how shipping performance can be improved.",
    tools: ["Python", "Pandas", "Streamlit", "Plotly"],
    link: "projects.html"
  },
  {
    badge: "Retail Profitability",
    title: "Product Profitability & Margin Performance",
    text:
      "A business analytics project focused on product-level margins, cost risk, revenue contribution, profit concentration, and low-margin product flags.",
    outcome:
      "Helps understand which products drive profit, which products create margin pressure, and where business attention is needed.",
    tools: ["Python", "Pandas", "Streamlit", "Plotly"],
    link: "projects.html"
  }
];

const proofCards = [
  {
    value: "4+",
    label: "Analytics Domains",
    text: "Building direction across marketing, eCommerce, supply chain, retail, and business analytics."
  },
  {
    value: "A-Z",
    label: "Project Workflow",
    text: "From problem framing and data preparation to dashboard design, insights, and recommendations."
  },
  {
    value: "BI",
    label: "Dashboard Mindset",
    text: "Focused on KPI structure, user flow, filters, visual hierarchy, and business storytelling."
  },
  {
    value: "Growth",
    label: "Learning Direction",
    text: "Improving continuously through portfolio projects, practical execution, and business-focused analysis."
  }
];

const homeActions = [
  {
    label: "Let’s Connect",
    href: "contact.html",
    type: "primary",
    icon: "fa-solid fa-arrow-right"
  },
  {
    label: "View Projects",
    href: "projects.html",
    type: "secondary",
    icon: "fa-solid fa-chart-line"
  }
];

/* =========================================================
   HERO RENDER
========================================================= */

function renderHomeHero() {
  setText("homeHeroEyebrow", homeHeroData.eyebrow);
  setText("homeHeroDescription", homeHeroData.description);

  renderHeroTitle();
  renderHeroActions();
  renderHeroProof();
  renderHeroCard();
}

function renderHeroTitle() {
  const title = $(".home-hero-title");
  if (!title) return;

  const titleLines = title.querySelectorAll(".home-hero-title-line");
  const firstLine = titleLines[0];
  const secondLine = $(".home-hero-title-middle", title);
  const typingText = document.getElementById("homeTypingText");

  if (firstLine) firstLine.textContent = homeHeroData.title.firstLine;
  if (secondLine) secondLine.textContent = homeHeroData.title.secondLine;
  if (typingText) typingText.textContent = homeHeroData.title.typingWords[0];

  title.setAttribute(
    "aria-label",
    `${homeHeroData.title.firstLine} ${homeHeroData.title.secondLine} ${homeHeroData.title.typingWords[0]}`
  );
}

function renderHeroActions() {
  const container = document.getElementById("homeHeroActions");
  if (!container) return;

  container.innerHTML = homeHeroData.actions
    .map(
      (action) => `
        <a href="${safeText(action.href)}" class="home-hero-btn home-hero-btn-${safeText(action.type)}">
          <span>${safeText(action.label)}</span>
          <i class="${safeIcon(action.icon)}" aria-hidden="true"></i>
        </a>
      `
    )
    .join("");
}

function renderHeroProof() {
  const container = document.getElementById("homeHeroProof");
  if (!container) return;

  container.innerHTML = homeHeroData.proof
    .map(
      (item) => `
        <div class="home-proof-item">
          <strong>${safeText(item.title)}</strong>
          <span>${safeText(item.text)}</span>
        </div>
      `
    )
    .join("");
}

function renderHeroCard() {
  const card = homeHeroData.card;

  const iconBox = document.getElementById("homeHeroCardIcon");
  if (iconBox) {
    iconBox.innerHTML = `<i class="${safeIcon(card.icon)}" aria-hidden="true"></i>`;
  }

  setText("homeHeroCardKicker", card.kicker);
  setText("homeHeroCardSubtitle", card.subtitle);
  setText("homeHeroCardTitle", card.title);
  setText("homeHeroCardText", card.text);

  const focusContainer = document.getElementById("homeHeroFocusList");
  if (focusContainer) {
    focusContainer.innerHTML = card.focusList
      .map(
        (item) => `
          <div class="home-card-focus-item">
            <span class="home-focus-dot" aria-hidden="true"></span>
            <p>${safeText(item)}</p>
          </div>
        `
      )
      .join("");
  }

  const metricsContainer = document.getElementById("homeHeroMetrics");
  if (metricsContainer) {
    metricsContainer.innerHTML = card.metrics
      .map(
        (metric) => `
          <div class="home-card-metric">
            <strong>${safeText(metric.value)}</strong>
            <span>${safeText(metric.label)}</span>
          </div>
        `
      )
      .join("");
  }
}

/* =========================================================
   HOME HERO TYPING — CLEAN STABLE VERSION
========================================================= */

let homeHeroTypingTimer = null;

function initHomeHeroTyping() {
  const typingTarget = document.getElementById("homeTypingText");
  const title = document.querySelector(".home-hero-title");

  if (!typingTarget) return;

  const words = Array.isArray(homeHeroData.title.typingWords)
    ? homeHeroData.title.typingWords.filter(Boolean)
    : [];

  if (!words.length) return;

  if (homeHeroTypingTimer) {
    window.clearTimeout(homeHeroTypingTimer);
    homeHeroTypingTimer = null;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 72;
  const deleteSpeed = 42;
  const holdDelay = 2400;
  const nextWordDelay = 420;
  const startDelay = 500;

  typingTarget.textContent = "";
  typingTarget.setAttribute("aria-live", "polite");

  function updateHeroAria(currentWord) {
    if (!title) return;

    title.setAttribute(
      "aria-label",
      `${homeHeroData.title.firstLine} ${homeHeroData.title.secondLine} ${currentWord}`
    );
  }

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      charIndex += 1;
      typingTarget.textContent = currentWord.slice(0, charIndex);
      updateHeroAria(currentWord);

      if (charIndex >= currentWord.length) {
        isDeleting = true;
        homeHeroTypingTimer = window.setTimeout(typeLoop, holdDelay);
        return;
      }

      homeHeroTypingTimer = window.setTimeout(typeLoop, typeSpeed);
      return;
    }

    charIndex -= 1;
    typingTarget.textContent = currentWord.slice(0, Math.max(charIndex, 0));

    if (charIndex <= 0) {
      charIndex = 0;
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      homeHeroTypingTimer = window.setTimeout(typeLoop, nextWordDelay);
      return;
    }

    homeHeroTypingTimer = window.setTimeout(typeLoop, deleteSpeed);
  }

  homeHeroTypingTimer = window.setTimeout(typeLoop, startDelay);
}

/* =========================================================
   VALUE CARDS
========================================================= */

function renderHomeValueCards() {
  const container = document.getElementById("homeValueGrid");
  if (!container) return;

  container.innerHTML = homeValueCards
    .map(
      (item) => `
        <article class="home-value-card reveal">
          <div class="home-card-icon">
            <i class="${safeIcon(item.icon)}" aria-hidden="true"></i>
          </div>

          <h3>${safeText(item.title)}</h3>
          <p>${safeText(item.text)}</p>
        </article>
      `
    )
    .join("");
}

/* =========================================================
   DECISION SYSTEM
========================================================= */

function renderDecisionSystem() {
  const pointsContainer = document.getElementById("homeDecisionPoints");
  const stepsContainer = document.getElementById("homeDecisionSteps");

  if (pointsContainer) {
    pointsContainer.innerHTML = decisionPoints
      .map(
        (point) => `
          <div class="home-decision-point">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            <span>${safeText(point)}</span>
          </div>
        `
      )
      .join("");
  }

  if (stepsContainer) {
    stepsContainer.innerHTML = decisionSteps
      .map(
        (step) => `
          <article class="home-step-card reveal">
            <span>${safeText(step.number)}</span>
            <h3>${safeText(step.title)}</h3>
            <p>${safeText(step.text)}</p>
          </article>
        `
      )
      .join("");
  }
}

/* =========================================================
   FOCUS AREAS
========================================================= */

function renderFocusAreas() {
  const tabs = document.getElementById("homeFocusTabs");
  const display = document.getElementById("homeFocusDisplay");

  if (!tabs || !display) return;

  tabs.innerHTML = focusAreas
    .map(
      (area, index) => `
        <button
          class="home-focus-tab ${index === 0 ? "active" : ""}"
          type="button"
          data-focus-id="${safeText(area.id)}"
          role="tab"
          aria-selected="${index === 0 ? "true" : "false"}"
        >
          <i class="${safeIcon(area.icon)}" aria-hidden="true"></i>
          <span>${safeText(area.label)}</span>
        </button>
      `
    )
    .join("");

  const renderDisplay = (areaId) => {
    const selected = focusAreas.find((area) => area.id === areaId) || focusAreas[0];

    display.innerHTML = `
      <div class="home-focus-display-inner reveal is-visible">
        <div class="home-focus-icon">
          <i class="${safeIcon(selected.icon)}" aria-hidden="true"></i>
        </div>

        <div>
          <span class="home-panel-label">${safeText(selected.label)}</span>
          <h3>${safeText(selected.title)}</h3>
          <p>${safeText(selected.text)}</p>

          <div class="home-focus-points">
            ${selected.points.map((point) => `<span>${safeText(point)}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  };

  renderDisplay(focusAreas[0].id);

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest(".home-focus-tab");
    if (!button) return;

    const focusId = button.dataset.focusId;

    tabs.querySelectorAll(".home-focus-tab").forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    renderDisplay(focusId);
  });
}

/* =========================================================
   FEATURED WORK
   Only 2 homepage projects rendered intentionally.
========================================================= */

function renderFeaturedWork() {
  const container = document.getElementById("homeFeaturedWorkGrid");
  if (!container) return;

  const visibleFeaturedWork = featuredWork.slice(0, 2);

  container.innerHTML = visibleFeaturedWork
    .map(
      (project) => `
        <article class="home-work-card reveal">
          <div class="home-work-top">
            <span class="home-work-badge">${safeText(project.badge)}</span>
            <h3>${safeText(project.title)}</h3>
            <p>${safeText(project.text)}</p>
          </div>

          <div class="home-work-outcome">
            <strong>Business Value</strong>
            <span>${safeText(project.outcome)}</span>
          </div>

          <div class="home-work-tools">
            ${project.tools.map((tool) => `<span>${safeText(tool)}</span>`).join("")}
          </div>

          <a href="${safeText(project.link)}" class="home-work-link">
            View Project Direction
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </article>
      `
    )
    .join("");
}

/* =========================================================
   PROOF GRID
========================================================= */

function renderProofGrid() {
  const container = document.getElementById("homeProofGrid");
  if (!container) return;

  container.innerHTML = proofCards
    .map(
      (card) => `
        <article class="home-proof-card reveal">
          <strong>${safeText(card.value)}</strong>
          <h3>${safeText(card.label)}</h3>
          <p>${safeText(card.text)}</p>
        </article>
      `
    )
    .join("");
}

/* =========================================================
   HOME CTA
========================================================= */

function renderHomeCTA() {
  const container = document.getElementById("homeCTAActions");
  if (!container) return;

  container.innerHTML = homeActions
    .map(
      (action) => `
        <a href="${safeText(action.href)}" class="home-cta-btn home-cta-btn-${safeText(action.type)}">
          ${safeText(action.label)}
          <i class="${safeIcon(action.icon)}" aria-hidden="true"></i>
        </a>
      `
    )
    .join("");
}