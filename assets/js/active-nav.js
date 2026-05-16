export function initActiveNav() {
  const page = document.body.getAttribute("data-page") || "home";

  const navLinks = document.querySelectorAll(".v3-nav-link, .v3-mobile-link");

  if (!navLinks.length) return;

  const pageMap = {
    home: ["index.html", "./index.html", "/", "", "#home"],
    about: ["about.html", "./about.html"],
    projects: ["projects.html", "./projects.html"],
    skills: ["skills.html", "./skills.html"],
    experience: ["experience.html", "./experience.html"],
    contact: ["contact.html", "./contact.html", "#contact"]
  };

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");
    const validLinks = pageMap[page];

    if (validLinks && validLinks.includes(href)) {
      link.classList.add("active");
    }
  });
}