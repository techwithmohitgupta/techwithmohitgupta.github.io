const pageConfig = {
  about: "About Me",
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  contact: "Contact",
};

export function initBreadcrumbs() {
  const page = document.body.getAttribute("data-page");

  if (!page || !pageConfig[page]) return;

  const titleEl = document.querySelector("[data-page-title]");
  const breadcrumbEl = document.querySelector("[data-breadcrumb]");

  if (titleEl) {
    titleEl.textContent = pageConfig[page];
  }

  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `
      <a href="index.html">Home</a> 
      <span> / </span> 
      <span>${pageConfig[page]}</span>
    `;
  }
}