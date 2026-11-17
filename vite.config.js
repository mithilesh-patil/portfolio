import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Fills __SITE_URL__ in index.html from VITE_SITE_URL (.env). Until the site is
// deployed the URL is empty, so the canonical tag is dropped and preview links stay relative.
function siteUrl(url) {
  return {
    name: "site-url",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (!url) html = html.replace(/\s*<link rel="canonical"[^>]*>/, "");
        return html.replaceAll("__SITE_URL__", url);
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const url = (env.VITE_SITE_URL || "").replace(/\/$/, "");
  return {
    plugins: [react(), tailwindcss(), siteUrl(url)],
  };
});
