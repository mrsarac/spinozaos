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
            // Core
            { label: "Button", slug: "components/button" },
            { label: "Card", slug: "components/card" },
            { label: "Text", slug: "components/text" },
            { label: "Badge", slug: "components/badge" },
            // Forms
            { label: "Input", slug: "components/input" },
            { label: "Textarea", slug: "components/textarea" },
            { label: "Select", slug: "components/select" },
            { label: "Checkbox", slug: "components/checkbox" },
            { label: "Toggle", slug: "components/toggle" },
            // Feedback
            { label: "Modal", slug: "components/modal" },
            { label: "Toast", slug: "components/toast" },
            { label: "Tooltip", slug: "components/tooltip" },
            { label: "Progress", slug: "components/progress" },
            // Navigation & Layout
            { label: "Accordion", slug: "components/accordion" },
            { label: "Tabs", slug: "components/tabs" },
            { label: "Avatar", slug: "components/avatar" },
            // Data Display
            { label: "StatCard", slug: "components/stat-card" },
            { label: "EmptyState", slug: "components/empty-state" },
            // Substance Design
            { label: "ClearanceBadge", slug: "components/clearance-badge" },
            { label: "ConfidenceIndicator", slug: "components/confidence-indicator" },
            { label: "DecorativeLine", slug: "components/decorative-line" },
          ],
        },
      ],
    }),
  ],
});
