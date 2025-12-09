# @spinozaos/react

## 1.0.0

### Major Changes

- # SpinozaOS v1.0.0 - First Stable Release

  ## Breaking Changes

  - Removed wildcard re-exports from `@spinozaos/react` - import tokens and motion from their respective packages

  ## Features

  - 25 production-ready React components
  - Complete design token system (colors, typography, spacing, effects)
  - Spring-based motion presets with Framer Motion integration
  - Tailwind CSS preset for dark-first design
  - Full accessibility support (WCAG 2.1 AA)
  - 564 unit tests

  ## Components

  - Actions: Button
  - Typography: Text, GlitchText
  - Layout: Card
  - Forms: Input, Textarea, Select, Checkbox, Toggle
  - Feedback: Badge, Toast, Modal, Tooltip, Progress, Spinner, LoadingDots, Skeleton
  - Data Display: ClearanceBadge, ConfidenceIndicator, DecorativeLine, StatCard, EmptyState
  - Navigation: Accordion, Tabs, Avatar

  ## Documentation

  - Complete Astro Starlight documentation site
  - 30+ documentation pages with visual previews

### Patch Changes

- Updated dependencies
  - @spinozaos/tokens@1.0.0
  - @spinozaos/motion@1.0.0

## 0.2.0

### Minor Changes

- 083c435: Initial public release of SpinozaOS Design System

  ## @spinozaos/tokens

  - Complete design token system (colors, typography, spacing, effects)
  - Prophetic Gold color palette
  - Void-first dark theme

  ## @spinozaos/motion

  - Spring physics configurations (tight, soft, bouncy, slow, mobile, snappy)
  - Easing curves (enter, exit, smooth, bounce, ios)
  - Animation variants (fadeIn, slideIn, stagger)
  - Micro-interactions (hover, tap, pulse)
  - Accessibility helpers (prefersReducedMotion)

  ## @spinozaos/react

  - 25 production-ready components
  - Button, Card, Text, Input, Badge, Toast, Modal, Tooltip
  - Form components: Checkbox, Toggle, Textarea, Select
  - Advanced components: Accordion, Tabs, Avatar, StatCard, EmptyState
  - Substance-extracted: ClearanceBadge, ConfidenceIndicator, DecorativeLine
  - Full Framer Motion integration
  - CVA-based variant system

  ## @spinozaos/tailwind

  - Tailwind CSS preset with SpinozaOS tokens
  - Glassmorphism utilities
  - Custom color palette
  - Touch-friendly utilities

### Patch Changes

- Updated dependencies [083c435]
  - @spinozaos/tokens@0.2.0
  - @spinozaos/motion@0.2.0
