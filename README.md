# SpinozaOS

> **Design System for the Age of Superintelligence**
> *"More Geometrico"*

[![npm version](https://img.shields.io/npm/v/@spinozaos/tokens.svg)](https://www.npmjs.com/package/@spinozaos/tokens)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

SpinozaOS is a **philosophy-driven**, **motion-first** design system built for AGI-era applications. Born from the [Substance AGI Intelligence Engine](https://substance.mustafasarac.com), it provides award-winning design tokens, React components, and animation presets.

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

| Package | Description | Status |
|---------|-------------|--------|
| `@spinozaos/tokens` | Design tokens (colors, typography, spacing) | 🚧 WIP |
| `@spinozaos/react` | React components | 🚧 WIP |
| `@spinozaos/motion` | Framer Motion presets | 🚧 WIP |
| `@spinozaos/tailwind` | Tailwind CSS preset | 🚧 WIP |

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
typography.fontFamily.serif  // 'Playfair Display', Georgia, serif

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
--font-serif: 'Playfair Display', Georgia, serif;
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
- [ ] @spinozaos/tokens v1.0
- [ ] @spinozaos/motion v1.0
- [ ] @spinozaos/react v1.0
- [ ] Documentation site
- [ ] Storybook
- [ ] NPM publish

---

## Inspired By

- [Linear](https://linear.app) - Modern SaaS aesthetic
- [Vercel](https://vercel.com) - Developer experience
- [Bloomberg Terminal](https://bloomberg.com) - Information density
- Blade Runner / Minority Report - Sci-Fi UI
- Baruch Spinoza - Philosophical foundations

---

## Related Projects

- [Substance AGI](https://substance.mustafasarac.com) - AGI Prediction Engine (primary consumer)
- [Spinoza](https://spinoza.mustafasarac.com) - Emotion Intelligence Platform

---

## License

MIT © [Mustafa Sarac](https://mustafasarac.com)

---

*"More Geometrico" - Design tokens for the age of superintelligence*
