/* =========================================
   EXPERIENCE PAGE MODULE
   Only Experience page-specific features
========================================= */

export function initExperiencePage() {
  const isExperiencePage = document.body?.dataset?.page === "experience";
  if (!isExperiencePage) return;

  if (document.body.dataset.experienceInitialized === "true") return;
  document.body.dataset.experienceInitialized = "true";

  renderExperienceHero();
  renderExperienceTimeline();
  renderExperienceHighlights();
}

/* =========================================
   HERO DATA
========================================= */

const experienceHeroData = {
  label: "Experience Journey",
  title: "Experience shaped by marketing, business performance, and analytics.",
  text:
    "My background connects digital marketing, SEO, reporting, and data analytics project work — helping me understand business problems before building dashboards.",

  stats: [
    "SEO + eCommerce",
    "Reporting mindset",
    "Business KPIs",
    "Analytics projects"
  ],

  workflow: [
    {
      icon: "fa-bullhorn",
      label: "01",
      title: "Marketing execution"
    },
    {
      icon: "fa-chart-line",
      label: "02",
      title: "Performance reporting"
    },
    {
      icon: "fa-database",
      label: "03",
      title: "Data analytics learning"
    },
    {
      icon: "fa-chart-pie",
      label: "04",
      title: "Dashboard projects"
    }
  ]
};

function renderExperienceHero() {
  const label = document.getElementById("experienceHeroLabel");
  const title = document.getElementById("experienceHeroTitle");
  const text = document.getElementById("experienceHeroText");
  const stats = document.getElementById("experienceHeroStats");
  const workflow = document.getElementById("experienceHeroWorkflow");

  if (label) label.textContent = experienceHeroData.label;
  if (title) title.textContent = experienceHeroData.title;
  if (text) text.textContent = experienceHeroData.text;

  if (stats) {
    stats.innerHTML = experienceHeroData.stats
      .map((item) => `<span class="experience-focus-pill">${item}</span>`)
      .join("");
  }

  if (workflow) {
    workflow.innerHTML = experienceHeroData.workflow
      .map(
        (item) => `
          <article class="profile-path-item">
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
   EXPERIENCE DATA
========================================= */

const experienceData = [
  {
    company: "Unified Mentor Private Limited",
    logo: "./assets/images/experience/unified_mentor.jpg",
    fallback: "UM",
    location: "Gurugram, Haryana, India",
    workMode: "Remote",
    roles: [
      {
        title: "Data Analyst",
        type: "Internship",
        focus: "Data Analytics · Business Analysis · Dashboarding",
        summary:
          "Working on real-world datasets to analyze business performance across marketing, e-commerce, and supply chain domains.",
        achievements: [
          "Performing data cleaning, transformation, and preprocessing to improve data accuracy and reliability.",
          "Conducting exploratory data analysis to identify trends, patterns, and key business insights.",
          "Engineering analytical features such as lead time, performance metrics, and categorical variables.",
          "Analyzing operational and marketing performance data to identify inefficiencies and improvement opportunities.",
          "Building interactive dashboards and visualizations using tools like Power BI and Streamlit for better decision-making.",
          "Translating data findings into business-focused insights and practical recommendations."
        ],
        skills: ["Data Analysis", "Python", "Power BI", "Streamlit", "EDA", "Business KPIs"]
      }
    ]
  },
  {
    company: "Earth Rhythm",
    logo: "./assets/images/experience/earth_rhythm.jpeg",
    fallback: "ER",
    location: "Gurugram, Haryana, India",
    workMode: "On-site",
    roles: [
      {
        title: "Digital Marketing Executive",
        type: "Full-time",
        focus: "SEO · eCommerce · Performance Reporting",
        summary:
          "Worked on Shopify eCommerce SEO, product listing optimization, website hygiene, and performance reporting.",
        achievements: [
          "Analyzed SEO for Shopify eCommerce website, focusing on organic growth and on-page optimization.",
          "Managed product listing optimization and catalog structure to improve search visibility.",
          "Maintained website hygiene including metadata, internal linking, and content structure.",
          "Conducted keyword research and performance tracking using Google Search Console and SEO tools.",
          "Analyzed traffic, user behavior, and organic performance through Google Analytics.",
          "Prepared weekly SEO reports and daily eCommerce performance updates."
        ],
        skills: ["SEO", "Shopify", "Google Analytics", "Google Search Console", "Reporting", "eCommerce"]
      }
    ]
  },
  {
    company: "QPe",
    logo: "./assets/images/experience/qpe.jpeg",
    fallback: "QP",
    location: "New Delhi, Delhi, India",
    workMode: "On-site",
    roles: [
      {
        title: "Digital Marketing Executive",
        type: "Full-time",
        focus: "eCommerce Operations · SEO · Growth Marketing",
        summary:
          "Supported eCommerce platform operations, SEO execution, content optimization, and merchant growth activities.",
        achievements: [
          "Gained hands-on experience in eCommerce platform operations and Shopify store setup support.",
          "Managed on-page SEO, off-page SEO, and blog publishing to improve organic reach.",
          "Coordinated with developers to implement SEO best practices across the website.",
          "Applied growth marketing strategies to generate leads and support merchant growth."
        ],
        skills: ["eCommerce", "SEO", "Growth Marketing", "Content", "Shopify"]
      },
      {
        title: "Digital Marketing Intern",
        type: "Internship",
        focus: "SEO Fundamentals · Content · Website Optimization",
        summary:
          "Built early digital marketing fundamentals through SEO tasks, landing page optimization, and content support.",
        achievements: [
          "Learned and worked on on-page SEO fundamentals including keyword insertion, meta titles, and meta descriptions.",
          "Optimized eCommerce website landing pages and blog content under team guidance.",
          "Created and managed backlinks through off-page SEO activities.",
          "Assisted in writing and publishing SEO-focused blogs for eCommerce-related topics."
        ],
        skills: ["SEO Basics", "Off-page SEO", "Content Writing", "Landing Pages", "Backlinks"]
      }
    ]
  }
];

function renderExperienceTimeline() {
  const container = document.getElementById("experienceTimelineList");
  if (!container) return;

  container.innerHTML = experienceData
    .map(
      (company) => `
        <article class="linkedin-experience-item">

          <div class="company-logo-wrap">
            <img
              src="${company.logo}"
              alt="${company.company} logo"
              loading="lazy"
              onerror="this.parentElement.classList.add('logo-fallback'); this.remove();"
            />
            <span>${company.fallback}</span>
          </div>

          <div class="linkedin-experience-card">

            <div class="company-header">
              <div>
                <h3>${company.company}</h3>
                <p>${company.location} · ${company.workMode}</p>
              </div>
            </div>

            <div class="company-roles">
              ${company.roles
                .map(
                  (role) => `
                    <div class="company-role">
                      <div class="role-dot"></div>

                      <div class="role-content">
                        <div class="role-topline">
                          <h4>${role.title}</h4>
                          <span>${role.type}</span>
                        </div>

                        <p class="role-focus">${role.focus}</p>

                        <p class="role-summary">${role.summary}</p>

                        <ul class="role-achievements">
                          ${role.achievements
                            .map((point) => `<li>${point}</li>`)
                            .join("")}
                        </ul>

                        <div class="role-skills">
                          ${role.skills.map((skill) => `<span>${skill}</span>`).join("")}
                        </div>
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>

          </div>
        </article>
      `
    )
    .join("");
}

/* =========================================
   EXPERIENCE HIGHLIGHTS DATA
========================================= */

const experienceHighlightsData = [
  {
    icon: "fa-briefcase",
    title: "Business Context",
    text:
      "Marketing and SEO background helps me understand performance, users, traffic, visibility, and business outcomes."
  },
  {
    icon: "fa-chart-line",
    title: "Performance Mindset",
    text:
      "I focus on metrics, patterns, KPIs, and what those numbers mean for growth, decisions, and improvement."
  },
  {
    icon: "fa-database",
    title: "Data Project Execution",
    text:
      "I build projects by cleaning data, designing KPIs, creating dashboards, and explaining insights clearly."
  },
  {
    icon: "fa-lightbulb",
    title: "Insight Communication",
    text:
      "I aim to communicate analytics in a simple way that helps non-technical stakeholders understand what action to take."
  }
];

function renderExperienceHighlights() {
  const grid = document.getElementById("experienceHighlightsGrid");
  if (!grid) return;

  grid.innerHTML = experienceHighlightsData
    .map(
      (item) => `
        <article class="highlight-card">
          <div class="highlight-icon">
            <i class="fa-solid ${item.icon}"></i>
          </div>

          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}