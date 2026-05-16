export function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) {
    document.documentElement.classList.remove("preloader-lock");
    return;
  }

  const navEntries = performance.getEntriesByType("navigation");
  const navType = navEntries.length ? navEntries[0].type : "navigate";
  const isReload = navType === "reload";

  const totalDuration = isReload ? 2400 : 4300;

  const revealPage = () => {
    document.documentElement.classList.remove("preloader-lock");
    document.body.style.opacity = "1";
    document.body.style.visibility = "visible";
  };

  revealPage();

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, totalDuration);
  });
}

export function initPageEntry() {
  document.body.classList.add("page-enter");

  requestAnimationFrame(() => {
    document.body.classList.add("page-enter-active");
  });
}