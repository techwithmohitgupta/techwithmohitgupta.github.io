import { experienceData } from "./experience-data.js";

export function renderExperience() {
  const experienceContainer = document.querySelector("[data-render='experience']");
  if (!experienceContainer) return;

  const experienceToRender = experienceData.filter((item) => item.featured);

  experienceContainer.innerHTML = experienceToRender
    .map((experience) => {
      const points = experience.points
        .map((point) => `<li>${point}</li>`)
        .join("");

      const skills = experience.skills
        .map((skill) => `<span class="experience-tag">${skill}</span>`)
        .join("");

      return `
        <article class="experience-item ${experience.featured ? "experience-item-featured" : ""}">
          <div class="experience-marker">
            <span class="experience-line"></span>
            <span class="experience-dot"></span>
          </div>

          <div class="experience-card">
            <div class="experience-card-inner">

              <header class="experience-card-header">
                <h3 class="experience-card-title">${experience.role}</h3>

                <div class="experience-meta">
                  <div class="experience-company-wrap">
                    <span class="experience-company-name">${experience.company}</span>
                  </div>

                  <span class="experience-meta-separator">•</span>
                  <span class="experience-location">${experience.location}</span>

                  <span class="${experience.badgeClass || "experience-badge"}">${experience.period}</span>
                </div>
              </header>

              <div class="experience-card-body">
                <p class="experience-summary">
                  ${experience.summary}
                </p>

                <ul class="experience-points">
                  ${points}
                </ul>
              </div>

              <footer class="experience-card-footer">
                <div class="experience-tags">
                  ${skills}
                </div>
              </footer>

            </div>
          </div>
        </article>
      `;
    })
    .join("");
}