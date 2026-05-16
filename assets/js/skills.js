/* =========================================
   SKILLS PAGE MODULE
   Only Skills page-specific features
========================================= */

export function initSkillsPage() {
  const isSkillsPage = document.body?.dataset?.page === "skills";
  if (!isSkillsPage) return;

  if (document.body.dataset.skillsInitialized === "true") return;
  document.body.dataset.skillsInitialized = "true";

  renderSkillsHero();
  renderSkillTabs();
  renderSkills();
  renderToolsInAction();

  initSkillFiltering();
}

/* =========================================
   HERO DATA
========================================= */

const skillsHeroData = {
  label: "Skills System",
  title: "Skills that turn data into clear business decisions.",
  text:
    "I use data analytics, BI tools, visualization, and business thinking to clean data, build dashboards, explain insights, and support decision-making.",

  stats: [
    "Data cleaning",
    "KPI thinking",
    "Dashboard design",
    "Insight storytelling"
  ],

  workflow: [
    {
      icon: "fa-broom",
      label: "01",
      title: "Clean and prepare data"
    },
    {
      icon: "fa-chart-line",
      label: "02",
      title: "Analyze performance patterns"
    },
    {
      icon: "fa-chart-pie",
      label: "03",
      title: "Build decision dashboards"
    },
    {
      icon: "fa-lightbulb",
      label: "04",
      title: "Explain insights clearly"
    }
  ]
};

function renderSkillsHero() {
  const label = document.getElementById("skillsHeroLabel");
  const title = document.getElementById("skillsHeroTitle");
  const text = document.getElementById("skillsHeroText");
  const stats = document.getElementById("skillsHeroStats");
  const workflow = document.getElementById("skillsHeroWorkflow");

  if (label) label.textContent = skillsHeroData.label;
  if (title) title.textContent = skillsHeroData.title;
  if (text) text.textContent = skillsHeroData.text;

  if (stats) {
    stats.innerHTML = skillsHeroData.stats
      .map((item) => `<span class="skills-hero-stat">${item}</span>`)
      .join("");
  }

  if (workflow) {
    workflow.innerHTML = skillsHeroData.workflow
      .map(
        (item) => `
          <article class="skills-workflow-item">
            <i class="fa-solid ${item.icon}"></i>
            <div>
              <span>${item.label}</span>
              <strong>${item.title}</strong>
            </div>
          </article>
        `
      )
      .join("");
  }
}

/* =========================================
   SKILLS DATA
========================================= */

const skillsData = [
  {
    category: "Programming & Data",
    icon: "fa-code",
    level: "Core",
    summary:
      "Tools and concepts I use to prepare, analyze, and structure data for business use.",
    skills: ["Python", "Pandas", "NumPy", "SQL", "Excel", "Data Cleaning"]
  },
  {
    category: "Visualization & BI",
    icon: "fa-chart-pie",
    level: "Dashboarding",
    summary:
      "Skills used to turn analysis into clear dashboards, reports, and visual business stories.",
    skills: [
      "Power BI",
      "Tableau",
      "Plotly",
      "Streamlit",
      "Dashboard Design",
      "Data Visualization"
    ]
  },
  {
    category: "Business Analytics",
    icon: "fa-briefcase",
    level: "Decision Focus",
    summary:
      "Business thinking used to connect data with KPIs, outcomes, and performance improvement.",
    skills: [
      "KPI Design",
      "Business Insights",
      "Performance Analysis",
      "Problem Framing",
      "Recommendations"
    ]
  },
  {
    category: "Data Storytelling",
    icon: "fa-lightbulb",
    level: "Communication",
    summary:
      "Skills used to simplify analysis, explain patterns, and communicate decisions clearly.",
    skills: [
      "Insight Storytelling",
      "Executive Summary",
      "Dashboard Narratives",
      "Stakeholder Thinking"
    ]
  },
  {
    category: "Marketing Analytics",
    icon: "fa-bullhorn",
    level: "Domain Edge",
    summary:
      "Digital marketing background that helps me understand traffic, users, content, and conversion behavior.",
    skills: [
      "SEO Analytics",
      "Traffic Analysis",
      "Customer Behavior",
      "Content Performance",
      "Conversion Thinking"
    ]
  },
  {
    category: "Reporting & Decision Systems",
    icon: "fa-clipboard-check",
    level: "Business Output",
    summary:
      "Skills used to convert analysis into structured reports, clear summaries, and decision-support systems.",
    skills: [
      "Reporting",
      "Decision Support",
      "Insight Summaries",
      "Business Recommendations",
      "Performance Tracking"
    ]
  }
];

let activeSkillCategory = "All";

/* =========================================
   SKILL TABS
========================================= */

function getSkillCategories() {
  return ["All", ...skillsData.map((item) => item.category)];
}

function renderSkillTabs() {
  const tabs = document.getElementById("skillsCategoryTabs");
  if (!tabs) return;

  tabs.innerHTML = getSkillCategories()
    .map(
      (category) => `
        <button
          class="skill-tab ${category === activeSkillCategory ? "active" : ""}"
          data-category="${category}"
          type="button"
        >
          ${category}
        </button>
      `
    )
    .join("");
}

function initSkillFiltering() {
  const tabs = document.getElementById("skillsCategoryTabs");
  if (!tabs) return;

  if (tabs.dataset.skillsTabsInitialized === "true") return;
  tabs.dataset.skillsTabsInitialized = "true";

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest(".skill-tab");
    if (!button) return;

    activeSkillCategory = button.dataset.category || "All";

    tabs.querySelectorAll(".skill-tab").forEach((tab) => {
      tab.classList.remove("active");
    });

    button.classList.add("active");
    renderSkills();
  });
}

/* =========================================
   SKILLS RENDER
========================================= */

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  const filteredSkills =
    activeSkillCategory === "All"
      ? skillsData
      : skillsData.filter((item) => item.category === activeSkillCategory);

  grid.innerHTML = filteredSkills
    .map(
      (item) => `
        <article class="skill-card">
          <div class="skill-card-icon">
            <i class="fa-solid ${item.icon}"></i>
          </div>

          <div class="skill-card-content">
            <span class="skill-level">${item.level}</span>
            <h3>${item.category}</h3>
            <p>${item.summary}</p>

            <div class="skill-tags">
              ${item.skills.map((skill) => `<span>${skill}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

/* =========================================
   TOOLS IN ACTION DATA
========================================= */

const toolsActionData = [
  {
    tool: "Python",
    icon: "fa-python",
    use: "Used for data cleaning, EDA, KPI logic, and analysis workflows.",
    focus: ["Cleaning", "EDA", "Automation"]
  },
  {
    tool: "SQL",
    icon: "fa-database",
    use: "Used to query structured data and answer business performance questions.",
    focus: ["Queries", "Joins", "Business Questions"]
  },
  {
    tool: "Power BI",
    icon: "fa-chart-column",
    use: "Used to build interactive dashboards and explain business performance visually.",
    focus: ["Dashboards", "DAX", "Storytelling"]
  },
  {
    tool: "Streamlit",
    icon: "fa-window-maximize",
    use: "Used to build interactive analytics apps and portfolio-level dashboards.",
    focus: ["Apps", "Filters", "Interactivity"]
  },
  {
    tool: "Excel",
    icon: "fa-table",
    use: "Used for validation, quick analysis, business checks, and reporting workflows.",
    focus: ["Validation", "Reporting", "Analysis"]
  },
  {
    tool: "Business Thinking",
    icon: "fa-chess",
    use: "Used to connect analysis with decisions, outcomes, and practical recommendations.",
    focus: ["KPIs", "Decisions", "Impact"]
  }
];

function renderToolsInAction() {
  const grid = document.getElementById("toolsActionGrid");
  if (!grid) return;

  grid.innerHTML = toolsActionData
    .map(
      (item) => `
        <article class="tool-action-card">
          <div class="tool-action-icon">
            <i class="fa-solid ${item.icon}"></i>
          </div>

          <h3>${item.tool}</h3>
          <p>${item.use}</p>

          <div class="tool-focus-list">
            ${item.focus.map((focus) => `<span>${focus}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}