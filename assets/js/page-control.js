export function initPageControl() {
  const page = document.body.getAttribute("data-page");

  if (!page) return;

  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    if (page === "home") return;

    if (section.id !== page) {
      section.style.display = "none";
    }
  });
}