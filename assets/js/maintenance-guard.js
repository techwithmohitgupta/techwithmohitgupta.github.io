/* =========================================
   PRODUCTION MAINTENANCE GUARD
   Mohit Gupta Data Analytics Portfolio

   GitHub Pages par same URL par maintenance page render karega.
   Localhost / 127.0.0.1 par website normally chalegi.
========================================= */

(function () {
    "use strict";

    const PRODUCTION_HOSTS = new Set([
        "techwithmohitgupta.github.io"
    ]);

    const LOCAL_HOSTS = new Set([
        "localhost",
        "127.0.0.1",
        "0.0.0.0",
        ""
    ]);

    const host = window.location.hostname;
    const isLocal = LOCAL_HOSTS.has(host);
    const isProduction = PRODUCTION_HOSTS.has(host);

    if (isLocal || !isProduction) {
        return;
    }

    document.documentElement.classList.add("production-maintenance-mode");

    const criticalStyle = document.createElement("style");
    criticalStyle.id = "maintenance-critical-style";
    criticalStyle.textContent = `
        html.production-maintenance-mode,
        html.production-maintenance-mode body {
            min-height: 100%;
            background: #f8fbff;
        }

        html.production-maintenance-mode body > *:not(#productionMaintenanceRoot) {
            display: none !important;
        }

        html.production-maintenance-mode #site-preloader,
        html.production-maintenance-mode #page-transition-overlay,
        html.production-maintenance-mode #custom-cursor-dot,
        html.production-maintenance-mode #custom-cursor-ring,
        html.production-maintenance-mode #custom-cursor-glow,
        html.production-maintenance-mode #custom-cursor-label,
        html.production-maintenance-mode .quick-whatsapp-button {
            display: none !important;
        }
    `;

    document.head.appendChild(criticalStyle);

    function setMeta(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);

        if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", name);
            document.head.appendChild(meta);
        }

        meta.setAttribute("content", content);
    }

    function loadMaintenanceCSS() {
        if (document.querySelector('link[href="/assets/css/maintenance.css"]')) {
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/maintenance.css";
        document.head.appendChild(link);
    }

    function renderMaintenancePage() {
        document.title = "Coming Soon | Mohit Gupta Data Analytics Portfolio";

        setMeta("robots", "noindex, nofollow");
        setMeta(
            "description",
            "Mohit Gupta Data Analytics Portfolio is currently under development and upgradation. Something awesome is in the works."
        );

        loadMaintenanceCSS();

        document.body.className = "maintenance-body";
        document.body.innerHTML = `
            <main id="productionMaintenanceRoot" class="maintenance-shell" aria-label="Website maintenance mode">
                <div class="maintenance-bg" aria-hidden="true">
                    <span class="maintenance-orb orb-one"></span>
                    <span class="maintenance-orb orb-two"></span>
                    <span class="maintenance-orb orb-three"></span>
                    <span class="maintenance-grid"></span>
                    <span class="maintenance-glow" data-maintenance-glow></span>
                </div>

                <section class="maintenance-hero-card">
                    <div class="maintenance-logo-wrap">
                        <img
                            src="/assets/images/brand/mohit-gupta-logo.png"
                            alt="Mohit Gupta Logo"
                            loading="eager"
                            decoding="async"
                        >
                    </div>

                    <div class="maintenance-status">
                        <span class="status-dot"></span>
                        Website Upgrade Mode
                    </div>

                    <h1 class="maintenance-title">
                        Something <span>awesome</span><br>
                        is in the works.
                    </h1>

                    <p class="maintenance-message">
                        We are putting the finishing touches on our new website.
                        The Data Analytics Portfolio is currently under development and upgradation.
                        Enter your email below to be the first to know when we launch.
                    </p>

                    <form class="maintenance-form" id="maintenanceNotifyForm" novalidate>
                        <div class="maintenance-input-wrap">
                            <input
                                id="maintenanceEmail"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                autocomplete="email"
                                aria-label="Enter your email address"
                                required
                            >

                            <button type="submit">
                                Notify Me
                            </button>
                        </div>

                        <p class="maintenance-form-message" id="maintenanceFormMessage" aria-live="polite"></p>
                    </form>

                    <div class="maintenance-feature-row" aria-label="Website upgrade highlights">
                        <article class="maintenance-mini-card">
                            <strong>01</strong>
                            <span>Portfolio Upgrade</span>
                        </article>

                        <article class="maintenance-mini-card">
                            <strong>02</strong>
                            <span>Dashboard Experience</span>
                        </article>

                        <article class="maintenance-mini-card">
                            <strong>03</strong>
                            <span>Better UX Coming</span>
                        </article>
                    </div>

                    <p class="maintenance-note">
                        Website not fully ready yet. We will be back soon with a better analytics portfolio experience.
                    </p>
                </section>

                <section
                    class="maintenance-dialog"
                    id="maintenanceDialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="maintenanceDialogTitle"
                    aria-describedby="maintenanceDialogText"
                >
                    <div class="maintenance-dialog-card">
                        <button
                            type="button"
                            class="maintenance-dialog-close"
                            id="maintenanceDialogClose"
                            aria-label="Close notification"
                        >
                            ×
                        </button>

                        <div class="dialog-logo">
                            <img
                                src="/assets/images/brand/mohit-gupta-logo.png"
                                alt="Mohit Gupta Logo"
                                loading="eager"
                                decoding="async"
                            >
                        </div>

                        <span class="dialog-pill">
                            Important Notice
                        </span>

                        <h2 id="maintenanceDialogTitle">
                            Website is under upgrade.
                        </h2>

                        <p id="maintenanceDialogText">
                            The portfolio is not fully ready yet. A new and better Data Analytics Portfolio experience is coming soon.
                        </p>

                        <div class="dialog-actions">
                            <button type="button" id="dialogNotifyButton">
                                Notify Me First
                            </button>

                            <a
                                href="https://www.linkedin.com/in/mohit-gupta-data-analyst/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        `;

        setupMaintenanceInteractions();
    }

    function setupMaintenanceInteractions() {
        const root = document.getElementById("productionMaintenanceRoot");
        const glow = document.querySelector("[data-maintenance-glow]");
        const dialog = document.getElementById("maintenanceDialog");
        const closeDialog = document.getElementById("maintenanceDialogClose");
        const notifyButton = document.getElementById("dialogNotifyButton");
        const form = document.getElementById("maintenanceNotifyForm");
        const emailInput = document.getElementById("maintenanceEmail");
        const message = document.getElementById("maintenanceFormMessage");

        window.setTimeout(function () {
            dialog?.classList.add("is-open");
        }, 650);

        function closeDialogBox() {
            dialog?.classList.remove("is-open");
        }

        closeDialog?.addEventListener("click", closeDialogBox);

        dialog?.addEventListener("click", function (event) {
            if (event.target === dialog) {
                closeDialogBox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeDialogBox();
            }
        });

        notifyButton?.addEventListener("click", function () {
            closeDialogBox();

            window.setTimeout(function () {
                emailInput?.focus();
                emailInput?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 180);
        });

        root?.addEventListener("mousemove", function (event) {
            if (!glow) {
                return;
            }

            const x = `${event.clientX}px`;
            const y = `${event.clientY}px`;

            glow.style.setProperty("--mx", x);
            glow.style.setProperty("--my", y);
        });

        form?.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = emailInput?.value.trim() || "";

            if (!email) {
                message.textContent = "Please enter your email address.";
                message.className = "maintenance-form-message is-error";
                emailInput?.focus();
                return;
            }

            const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

            if (!emailPattern.test(email)) {
                message.textContent = "Please enter a valid email address.";
                message.className = "maintenance-form-message is-error";
                emailInput?.focus();
                return;
            }

            message.textContent = "Thank you. You will be notified when the new website launches.";
            message.className = "maintenance-form-message is-success";

            form.reset();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", renderMaintenancePage, { once: true });
    } else {
        renderMaintenancePage();
    }
})();