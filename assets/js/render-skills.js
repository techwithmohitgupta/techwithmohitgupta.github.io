import { skillsData } from "./skills-data.js";

export function renderSkills() {
  const skillsContainer = document.querySelector("[data-render='skills']");
  if (!skillsContainer) return;

  const skillsToRender = skillsData.filter((skillGroup) => skillGroup.featured);

  skillsContainer.innerHTML = skillsToRender
    .map((skillGroup) => {
      const skills = skillGroup.items
        .map((skill) => {
          return `
            <span class="skill-tag" title="${skill.description}">
              ${skill.name}
            </span>
          `;
        })
        .join("");

      return `
        <article class="skills-card" data-category="${skillGroup.id}">
          <div class="skills-card-inner">
            <h3 class="skills-card-title">${skillGroup.category}</h3>

            <div class="skills-tags">
              ${skills}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}