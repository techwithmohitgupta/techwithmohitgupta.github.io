export function initMobileMenu() {
  const menuToggle = document.querySelector(".v3-menu-toggle");
  const mobileMenu = document.querySelector(".v3-mobile-menu");
  const menuClose = document.querySelector(".v3-menu-close");
  const mobileLinks = document.querySelectorAll(".v3-mobile-link");
  const mobileCta = document.querySelector(".v3-mobile-cta");

  if (!menuToggle || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add("is-open");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    if (mobileMenu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  if (mobileCta) {
    mobileCta.addEventListener("click", closeMenu);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}