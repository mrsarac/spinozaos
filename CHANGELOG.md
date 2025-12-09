# Changelog

All notable changes to SpinozaOS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-12-08

### Added

#### Components
- **Accordion** - Collapsible content sections with FAQAccordion preset
- **Avatar** - User avatars with AvatarGroup for stacking
- **Tabs** - Tab navigation with PeriodTabs preset for time ranges
- **StatCard** - Statistics display with grid layout and trend indicators
- **EmptyState** - Empty state displays with presets (NoResults, NoData, ErrorState, NotFound)
- **ClearanceBadge** - Security level badges (5 levels from Substance)
- **ConfidenceIndicator** - Confidence display with slider variant
- **DecorativeLine** - Decorative lines and dividers (4 variants)
- **GlitchText** - Cyberpunk glitch text effects
- **Input** - Form input with validation states
- **Textarea** - Multi-line text input
- **Select** - Dropdown select with custom styling
- **Checkbox** - Checkbox with indeterminate state
- **Toggle** - Toggle switch component
- **Badge** - Status badges with variants
- **Toast** - Toast notifications with ToastContainer
- **Modal** - Modal dialogs with Header, Body, Footer
- **Tooltip** - Hover tooltips
- **Progress** - Progress bars with Spinner, LoadingDots, Skeleton

#### Documentation
- Complete Astro Starlight documentation site (30 pages)
- Visual component previews for all components
- Glitch effects and micro-interactions documentation
- Form components documentation
- Loading/progress components documentation

#### Testing
- Comprehensive test suite with 564 tests
- Accessibility testing with jest-axe
- Component unit tests for all React components
- CI/CD pipeline with GitHub Actions

#### Infrastructure
- Turborepo monorepo setup
- pnpm workspace configuration
- Docker and nginx configuration for deployment
- Nixpacks configuration for Coolify

### Changed
- Integrated Substance UI patterns into design system
- Updated motion presets for smoother animations
- Improved accessibility across all components (WCAG 2.1 AA)

### Fixed
- Input component accessibility (ARIA labels, announcements)
- Modal focus management and keyboard navigation
- Select component screen reader support
- Toast live region announcements
- Textarea character count accessibility

## [0.1.0] - 2024-12-01

### Added

#### Packages
- **@spinozaos/tokens** - Design tokens (colors, typography, spacing, effects)
- **@spinozaos/motion** - Motion presets (springs, easings, variants)
- **@spinozaos/tailwind** - Tailwind CSS preset
- **@spinozaos/react** - React component library

#### Core Components
- **Button** - Primary action component with variants (primary, secondary, ghost, oracle)
- **Card** - Container component with glass effects
- **Text** - Typography component with semantic variants

#### Design System
- Prophetic Gold color palette (#fbbf24)
- Void-first dark theme (#020617)
- Inter, Playfair Display, JetBrains Mono typography
- Spring-based motion system
- Glassmorphism effects

#### Infrastructure
- Storybook configuration
- TypeScript support
- CVA (class-variance-authority) integration
- Framer Motion integration

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 0.2.0 | 2024-12-08 | 25 components, docs site, test suite |
| 0.1.0 | 2024-12-01 | Initial release, core packages |

---

*SpinozaOS - "More Geometrico"*
