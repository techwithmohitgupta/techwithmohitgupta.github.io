/* =========================================
   MAINTENANCE GUARD
   Production-only maintenance redirect

   GitHub Pages par website ko maintenance mode
   mein redirect karega.

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

    const currentHost = window.location.hostname;
    const currentPath = window.location.pathname;

    const isLocal = LOCAL_HOSTS.has(currentHost);
    const isProduction = PRODUCTION_HOSTS.has(currentHost);
    const isMaintenancePage = currentPath.endsWith("/maintenance.html");

    if (isLocal) {
        return;
    }

    if (isProduction && !isMaintenancePage) {
        window.location.replace("/maintenance.html");
    }
})();