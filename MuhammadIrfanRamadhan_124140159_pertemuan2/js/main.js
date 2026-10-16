// js/main.js — entry point aplikasi (ES Module).
// index.html memuat file ini via <script type="module" src="js/main.js">.

import { DashboardApp } from "./app.js";

const app = new DashboardApp();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => app.init());
} else {
  app.init();
}
