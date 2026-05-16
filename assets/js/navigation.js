export function initHeaderScrollEffect() {
  const header = document.querySelector(".v3-header");
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
}