import { projectsData } from "./projects-data.js";

export function renderProjects() {
  const projectsContainer = document.querySelector("[data-render='projects']");

  if (!projectsContainer) return;

  const projectsToRender = projectsData.filter((project) => project.featured);

  projectsContainer.innerHTML = projectsToRender
    .map((project, index) => {
      const highlights = project.highlights
        .map((point) => `<li>${point}</li>`)
        .join("");

      const tools = project.tools
        .map((tool) => `<span class="project-tag">${tool}</span>`)
        .join("");

      return `
        <article class="project-card ${index === 0 ? "featured-project-card" : ""}">
          <div class="project-card-top">
            <div class="project-accent"></div>

            <span class="project-category">${project.category}</span>

            <h3 class="project-title">${project.title}</h3>

            <p class="project-description">
              ${project.description}
            </p>
          </div>

          <div class="project-card-middle">
            <ul class="project-points">
              ${highlights}
            </ul>
          </div>

          <div class="project-card-bottom">
            <div class="project-tags">
              ${tools}
            </div>

            <div class="project-actions">
              <a href="${project.links.live}" class="project-btn project-btn-primary">
                View Project
              </a>

              <a href="${project.links.github}" class="project-btn project-btn-secondary">
                GitHub
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}