import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://spinozaos.mustafasarac.com",
  integrations: [
    starlight({
      title: "SpinozaOS",
      description: "Design System for the Age of Superintelligence",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "SpinozaOS",
      },
      social: {
        github: "https://github.com/mrsarac/spinozaos",
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
          ],
        },
        {
          label: "Design Tokens",
          items: [
            { label: "Colors", slug: "tokens/colors" },
            { label: "Typography", slug: "tokens/typography" },
            { label: "Spacing", slug: "tokens/spacing" },
            { label: "Effects", slug: "tokens/effects" },
          ],
        },
        {
          label: "Motion",
          items: [
            { label: "Overview", slug: "motion/overview" },
            { label: "Springs", slug: "motion/springs" },
            { label: "Variants", slug: "motion/variants" },
          ],
        },
        {
          label: "Components",
          items: [
            { label: "Button", slug: "components/button" },
            { label: "Card", slug: "components/card" },
            { label: "Text", slug: "components/text" },
          ],
        },
      ],
    }),
  ],
});
