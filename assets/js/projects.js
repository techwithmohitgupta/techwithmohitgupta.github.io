/* =========================================
   PROJECTS PAGE MODULE
   Only Projects page-specific features
========================================= */

export function initProjectsPage() {
  const isProjectsPage = document.body?.dataset?.page === "projects";
  if (!isProjectsPage) return;

  if (document.body.dataset.projectsInitialized === "true") return;
  document.body.dataset.projectsInitialized = "true";

  renderProjectsHero();
  renderProjectsMethod();
  renderProjectFilters();
  renderProjectsGrid();

  initProjectFiltering();
  initProjectSearch();
}

/* =========================================
   DATA — HERO
========================================= */

const projectsHeroData = {
  label: "Projects Portfolio",
  title: "Data analytics projects built for business decisions.",
  text:
    "I build project case studies around real business questions, KPI logic, data cleaning, dashboards, insights, and practical recommendations.",

  stats: [
    "Business-first analysis",
    "KPI logic",
    "Dashboard storytelling",
    "Insight recommendations"
  ],

  workflow: [
    {
      icon: "fa-bullseye",
      label: "01",
      title: "Define business question"
    },
    {
      icon: "fa-database",
      label: "02",
      title: "Clean and prepare data"
    },
    {
      icon: "fa-chart-line",
      label: "03",
      title: "Analyze KPIs and patterns"
    },
    {
      icon: "fa-lightbulb",
      label: "04",
      title: "Recommend next actions"
    }
  ]
};

function renderProjectsHero() {
  const label = document.getElementById("projectsHeroLabel");
  const title = document.getElementById("projectsHeroTitle");
  const text = document.getElementById("projectsHeroText");
  const stats = document.getElementById("projectsHeroStats");
  const workflow = document.getElementById("projectsHeroWorkflow");

  if (label) label.textContent = projectsHeroData.label;
  if (title) title.textContent = projectsHeroData.title;
  if (text) text.textContent = projectsHeroData.text;

  if (stats) {
    stats.innerHTML = projectsHeroData.stats
      .map((item) => `<span class="projects-hero-stat">${item}</span>`)
      .join("");
  }

  if (workflow) {
    workflow.innerHTML = projectsHeroData.workflow
      .map(
        (item) => `
          <article class="projects-workflow-item">
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
   DATA — METHOD
========================================= */

const projectsMethodData = [
  {
    icon: "fa-bullseye",
    step: "01",
    title: "Business Problem",
    text:
      "I start by understanding the business question, decision goal, and expected outcome."
  },
  {
    icon: "fa-database",
    step: "02",
    title: "Data Preparation",
    text:
      "I clean, structure, validate, and prepare the data before building analysis or visuals."
  },
  {
    icon: "fa-gauge-high",
    step: "03",
    title: "KPI Logic",
    text:
      "I define metrics that connect directly with business performance and decision-making."
  },
  {
    icon: "fa-chart-simple",
    step: "04",
    title: "Dashboard Story",
    text:
      "I design dashboards to explain patterns clearly, not just display charts."
  },
  {
    icon: "fa-lightbulb",
    step: "05",
    title: "Recommendations",
    text:
      "I convert findings into simple, practical insights that support next actions."
  }
];

function renderProjectsMethod() {
  const container = document.getElementById("projectsMethodGrid");
  if (!container) return;

  container.innerHTML = projectsMethodData
    .map(
      (item) => `
        <article class="method-card">
          <i class="fa-solid ${item.icon}"></i>

          <div>
            <small>Step ${item.step}</small>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

/* =========================================
   DATA — PROJECTS
========================================= */

const projectsData = [
  {
    title: "Shipping Route Efficiency Analysis",
    domain: "Supply Chain",
    status: "Featured Case Study",
    category: "Streamlit",
    image: "./assets/images/projects/project-shipping-route.jpg",
    fallbackIcon: "fa-route",
    tools: ["Python", "Streamlit", "Plotly", "Pandas"],
    tags: ["Python", "Streamlit", "Visualization", "Business Analytics"],
    problem:
      "Identify delivery delays, route inefficiencies, and regional bottlenecks across shipping operations.",
    outcome:
      "Created a route-performance dashboard focused on lead time, delay frequency, and efficiency score.",
    caseUrl: "#"
  },
  {
    title: "Product Line Profitability Analysis",
    domain: "Retail",
    status: "Featured Case Study",
    category: "Power BI",
    image: "./assets/images/projects/project-profitability.jpg",
    fallbackIcon: "fa-chart-pie",
    tools: ["Excel", "Python", "Power BI"],
    tags: ["Python", "Power BI", "Visualization", "Business Analytics"],
    problem:
      "Analyze product margins, profitability gaps, low-margin products, and revenue contribution patterns.",
    outcome:
      "Built a profitability story connecting sales, costs, margins, and product-level decisions.",
    caseUrl: "#"
  },
  {
    title: "E-commerce Sales Dashboard",
    domain: "E-commerce",
    status: "Practice Project",
    category: "Power BI",
    image: "./assets/images/projects/project-ecommerce-sales.jpg",
    fallbackIcon: "fa-cart-shopping",
    tools: ["Power BI", "Excel"],
    tags: ["Power BI", "Visualization", "Business Analytics"],
    problem:
      "Track sales trends, customer behavior, product performance, and seasonal business patterns.",
    outcome:
      "Converted sales data into a dashboard view for performance monitoring and business review.",
    caseUrl: "#"
  },
  {
    title: "Customer Segmentation Analysis",
    domain: "Marketing",
    status: "Practice Project",
    category: "Python",
    image: "./assets/images/projects/project-customer-segmentation.jpg",
    fallbackIcon: "fa-users",
    tools: ["Python", "Pandas", "Seaborn"],
    tags: ["Python", "Visualization", "Business Analytics"],
    problem:
      "Segment customers based on behavior and value to support targeted marketing decisions.",
    outcome:
      "Created behavior groups that simplify customer analysis and improve campaign direction.",
    caseUrl: "#"
  },
  {
    title: "Sales Performance & Profitability Dashboard",
    domain: "Business Analytics",
    status: "Coming Case Study",
    category: "Power BI",
    image: "./assets/images/projects/project-sales-profitability.jpg",
    fallbackIcon: "fa-chart-line",
    tools: ["Power BI", "Excel", "DAX"],
    tags: ["Power BI", "Visualization", "Business Analytics"],
    problem:
      "Analyze sales performance, profit contribution, discount impact, and regional business trends.",
    outcome:
      "Designed to show how revenue, margin, and business performance can be connected through dashboard storytelling.",
    caseUrl: "#"
  },
  {
    title: "SQL Business Insights Analysis",
    domain: "Business Intelligence",
    status: "Coming Case Study",
    category: "SQL",
    image: "./assets/images/projects/project-sql-insights.jpg",
    fallbackIcon: "fa-database",
    tools: ["SQL", "Excel", "Data Analysis"],
    tags: ["SQL", "Business Analytics"],
    problem:
      "Use SQL queries to answer business questions related to performance, customers, products, and trends.",
    outcome:
      "Planned as a query-driven case study focused on extracting business insights from structured data.",
    caseUrl: "#"
  }
];

let activeFilter = "All";
let activeSearch = "";

/* =========================================
   FILTERS
========================================= */

function getProjectFilters() {
  const tagSet = new Set();

  projectsData.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(tag));
  });

  return ["All", ...Array.from(tagSet)];
}

function renderProjectFilters() {
  const filterContainer = document.getElementById("projectFilters");
  if (!filterContainer) return;

  filterContainer.innerHTML = getProjectFilters()
    .map(
      (filter) => `
        <button
          class="filter-btn ${filter === activeFilter ? "active" : ""}"
          data-filter="${filter}"
          type="button"
        >
          ${filter}
        </button>
      `
    )
    .join("");
}

function initProjectFiltering() {
  const filterContainer = document.getElementById("projectFilters");
  if (!filterContainer) return;

  if (filterContainer.dataset.projectFiltersInitialized === "true") return;
  filterContainer.dataset.projectFiltersInitialized = "true";

  filterContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    activeFilter = button.dataset.filter || "All";

    filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    renderProjectsGrid();
  });
}

function initProjectSearch() {
  const searchInput = document.getElementById("projectSearch");
  if (!searchInput) return;

  if (searchInput.dataset.projectSearchInitialized === "true") return;
  searchInput.dataset.projectSearchInitialized = "true";

  searchInput.addEventListener("input", (event) => {
    activeSearch = event.target.value.trim().toLowerCase();
    renderProjectsGrid();
  });
}

/* =========================================
   PROJECT RENDERING
========================================= */

function getFilteredProjects() {
  return projectsData.filter((project) => {
    const matchesFilter =
      activeFilter === "All" || project.tags.includes(activeFilter);

    const searchableText = [
      project.title,
      project.domain,
      project.status,
      project.category,
      project.problem,
      project.outcome,
      ...project.tools,
      ...project.tags
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !activeSearch || searchableText.includes(activeSearch);

    return matchesFilter && matchesSearch;
  });
}

function renderProjectVisual(project) {
  /*
    SAFE MODE:
    If image file is missing, browser fallback card will show.
    Later we can replace missing image paths with real project mockups.
  */
  return `
    <div class="project-image-wrap">
      <img
        src="${project.image}"
        alt="${project.title} dashboard snapshot"
        loading="lazy"
        onerror="this.parentElement.classList.add('image-fallback'); this.remove();"
      />

      <div class="project-image-fallback">
        <i class="fa-solid ${project.fallbackIcon}"></i>
        <span>${project.domain}</span>
      </div>
    </div>
  `;
}

function renderProjectsGrid() {
  const grid = document.getElementById("projectsGrid");
  const countLine = document.getElementById("projectCountLine");

  if (!grid) return;

  const filteredProjects = getFilteredProjects();

  if (countLine) {
    const resultText =
      filteredProjects.length === 1
        ? "Showing 1 project"
        : `Showing ${filteredProjects.length} projects`;

    countLine.textContent = `${resultText} · Filter: ${activeFilter}`;
  }

  if (!filteredProjects.length) {
    grid.innerHTML = `
      <div class="project-empty-state">
        <h3>No matching projects found.</h3>
        <p>Try changing the filter or search keyword.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredProjects
    .map(
      (project) => `
        <article class="project-card">
          ${renderProjectVisual(project)}

          <div class="project-card-body">
            <div class="project-card-top">
              <span class="project-pill domain">${project.domain}</span>
              <span class="project-pill status">${project.status}</span>
            </div>

            <h3>${project.title}</h3>

            <p>${project.problem}</p>

            <div class="project-tools">
              ${project.tools.map((tool) => `<span>${tool}</span>`).join("")}
            </div>

            <div class="project-card-footer">
              <span>${project.category}</span>
              <a href="${project.caseUrl}" class="project-case-link">
                Case Study
                <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}