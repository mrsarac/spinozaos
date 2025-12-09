# SpinozaOS

> **Design System for the Age of Superintelligence**
> *"More Geometrico"*

[![npm version](https://img.shields.io/npm/v/@spinozaos/react.svg)](https://www.npmjs.com/package/@spinozaos/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Release](https://img.shields.io/github/v/release/mrsarac/spinozaos)](https://github.com/mrsarac/spinozaos/releases)

## Live Demos

> See SpinozaOS in action across different use cases

| Demo | Description | Status |
|------|-------------|--------|
| [Showcase Gallery](https://showcase.spinozaos.mustafasarac.com) | Interactive component gallery | Coming Soon |
| [AGI Dashboard](https://dashboard.spinozaos.mustafasarac.com) | Bloomberg-style analytics | Coming Soon |
| [AI Chat](https://chat.spinozaos.mustafasarac.com) | Conversational UI demo | Coming Soon |
| [Documentation](https://docs-spinozaos.mustafasarac.com) | Full documentation | Coming Soon |

---

## Overview

SpinozaOS is a **philosophy-driven**, **motion-first** design system built for AGI-era applications. Born from the Substance AGI Intelligence Engine, it provides design tokens, React components, and animation presets.

### Design Philosophy

| Principle | Description |
|-----------|-------------|
| **Prophetic Gold** | Single accent (#fbbf24) for mystical, future-focused aesthetic |
| **Void-first** | Deep black (#020617) foundation, dark-only |
| **Motion-first** | 60fps animations, spring physics, smooth interactions |
| **Information-dense** | Bloomberg Terminal inspired data visualization |
| **Mobile-first** | Touch targets, responsive from ground up |

### Design DNA

```
SpinozaOS = Bloomberg Terminal × Sci-Fi UI × Spinoza Philosophy
         = Data-driven + Mysterious + Philosophical
```

---

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@spinozaos/tokens`](https://www.npmjs.com/package/@spinozaos/tokens) | Design tokens (colors, typography, spacing) | 1.0.0 |
| [`@spinozaos/react`](https://www.npmjs.com/package/@spinozaos/react) | React components (25 components) | 1.0.0 |
| [`@spinozaos/motion`](https://www.npmjs.com/package/@spinozaos/motion) | Framer Motion presets | 1.0.0 |
| [`@spinozaos/tailwind`](https://www.npmjs.com/package/@spinozaos/tailwind) | Tailwind CSS preset | 1.0.0 |

---

## Quick Start

```bash
# Install tokens
npm install @spinozaos/tokens

# Install React components
npm install @spinozaos/react

# Install Tailwind preset
npm install @spinozaos/tailwind
```

### Using Tokens

```typescript
import { colors, typography, spacing } from '@spinozaos/tokens';

// Colors
colors.spinoza.yellow  // #fbbf24
colors.void            // #020617

// Typography
typography.fontFamily.serif  // 'Cinzel', 'Playfair Display', Georgia, serif

// Spacing
spacing[4]  // 1rem (16px)
```

### Using React Components

```tsx
import { Button, Card, Text } from '@spinozaos/react';

function App() {
  return (
    <Card>
      <Text variant="heading">Welcome to SpinozaOS</Text>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

### Using Tailwind Preset

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@spinozaos/tailwind')],
  // your config...
};
```

---

## Color Palette

### Primary Colors

| Token | Hex | Preview |
|-------|-----|---------|
| `void` | #020617 | ![#020617](https://via.placeholder.com/20/020617/020617) |
| `void-light` | #0f172a | ![#0f172a](https://via.placeholder.com/20/0f172a/0f172a) |
| `spinoza-yellow` | #fbbf24 | ![#fbbf24](https://via.placeholder.com/20/fbbf24/fbbf24) |
| `spinoza-gold` | #d97706 | ![#d97706](https://via.placeholder.com/20/d97706/d97706) |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | #22c55e | Positive feedback |
| `error` | #ef4444 | Error states |
| `warning` | #f59e0b | Warnings |
| `oracle-purple` | #8b5cf6 | Premium tier |

---

## Typography

```css
/* Font Families */
--font-serif: 'Cinzel', 'Playfair Display', Georgia, serif;
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

| Style | Font | Size | Use Case |
|-------|------|------|----------|
| Display | Serif | 60px | Hero headlines |
| Heading | Serif | 36px | Section titles |
| Body | Sans | 16px | Paragraphs |
| Label | Mono | 10px | Categories |
| Data | Mono | 48px | Numbers |

---

## Motion System

### Spring Configurations

```typescript
import { SPRING } from '@spinozaos/motion';

// Available presets
SPRING.tight   // Buttons, toggles
SPRING.soft    // Cards, panels
SPRING.bouncy  // Badges, achievements
SPRING.slow    // Page transitions
SPRING.mobile  // Touch optimized
```

### Animation Variants

```typescript
import { VARIANTS } from '@spinozaos/motion';

// Framer Motion variants
VARIANTS.fadeInUp
VARIANTS.fadeInScale
VARIANTS.slideInRight
VARIANTS.staggerContainer
```

---

## Development

```bash
# Clone the repository
git clone https://github.com/mrsarac/spinozaos.git
cd spinozaos

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run Storybook
pnpm storybook

# Build all packages
pnpm build

# Run tests
pnpm test
```

---

## Project Structure

```
spinozaos/
├── packages/
│   ├── tokens/         # @spinozaos/tokens
│   ├── react/          # @spinozaos/react
│   ├── motion/         # @spinozaos/motion
│   └── tailwind/       # @spinozaos/tailwind
├── apps/
│   ├── docs/           # Documentation site
│   └── showcase/       # Interactive demo
├── turbo.json
└── package.json
```

---

## Roadmap

- [x] Project setup
- [x] NPM publish (v1.0.0)
- [x] 25 React components
- [x] 564 unit tests
- [x] CI/CD pipeline
- [x] v1.0 stable release
- [x] WCAG 2.1 AA accessibility
- [ ] Showcase Gallery
- [ ] Live Demo Apps (AGI Dashboard, AI Chat, etc.)
- [ ] Storybook deployment

---

## Inspired By

- [Linear](https://linear.app) - Modern SaaS aesthetic
- [Vercel](https://vercel.com) - Developer experience
- [Bloomberg Terminal](https://bloomberg.com) - Information density
- Blade Runner / Minority Report - Sci-Fi UI
- Baruch Spinoza - Philosophical foundations

---

## License

MIT © Mustafa Sarac

---

*"More Geometrico" - Design tokens for the age of superintelligence*
