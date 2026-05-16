/* =========================================================
   GLOBAL TYPING ENGINE
   Used only for non-homepage typing areas.
   Homepage hero typing is controlled by home.js.
========================================================= */

export function initTyping() {
  const isHomePage = document.body?.dataset?.page === "home";

  /*
    Do not run global typing on homepage.
    Homepage has its own premium dynamic hero typing engine.
  */
  if (isHomePage) return;

  const textEl = document.querySelector("[data-typing-text]");

  if (!textEl) return;
  if (textEl.dataset.typingInitialized === "true") return;

  textEl.dataset.typingInitialized = "true";

  const phrasesRaw = textEl.dataset.typingWords || "";
  const phrases = phrasesRaw
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!phrases.length) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeoutId = null;

  const typingSpeed = 75;
  const deletingSpeed = 42;
  const holdDelay = 1200;
  const switchDelay = 260;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    charIndex = Math.max(0, Math.min(charIndex, currentPhrase.length));

    textEl.textContent = currentPhrase.slice(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      timeoutId = window.setTimeout(typeLoop, holdDelay);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timeoutId = window.setTimeout(typeLoop, switchDelay);
      return;
    }

    timeoutId = window.setTimeout(
      typeLoop,
      isDeleting ? deletingSpeed : typingSpeed
    );
  }

  textEl.textContent = "";
  timeoutId = window.setTimeout(typeLoop, 300);

  document.addEventListener("visibilitychange", () => {
    window.clearTimeout(timeoutId);

    if (!document.hidden) {
      timeoutId = window.setTimeout(typeLoop, 300);
    }
  });
}