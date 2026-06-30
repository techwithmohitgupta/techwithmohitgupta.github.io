/* =========================================
   MAIN JS
   Global JavaScript import file for the full website.

   Rule:
   - Only common/global JS files are imported here.
   - Page-specific JS files like home.js, about.js,
     projects.js, skills.js, experience.js, contact.js
     are NOT imported here.
========================================= */

/* 1. Global website configuration */
import "./config.js";

/* 2. Global navigation / header rendering */
import "./navigation.js";

/* 3. Global smooth scrolling behavior */
import "./smooth-scroll.js";

/* 4. Global active navigation behavior */
import "./active-nav.js";

/* 5. Global mobile menu behavior */
import "./mobile-menu.js";

/* 6. Global breadcrumbs behavior for inner pages */
import "./breadcrumbs.js";

/* 7. Global page-level controls and helpers */
import "./page-control.js";

/* 8. Global reveal-on-scroll animations */
import "./reveal.js";

/* 9. Global WhatsApp / quick contact button */
import "./whatsapp-button.js";

/* 10. Global custom cursor behavior */
import "./cursor.js";

/* 11. Global page transition behavior */
import "./page-transition.js";

/* 12. Global preloader behavior */
import "./preloader.js";