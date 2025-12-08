# CLAUDE.md - SpinozaOS Design System

> **mustafasarac-core Ecosystem Member**
> Part of the "Monolith Strategy" - Branded House Architecture

---

## PROJECT IDENTITY

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███████╗██████╗ ██╗███╗   ██╗ ██████╗ ███████╗ █████╗  ██████╗ ███████╗   ║
║   ██╔════╝██╔══██╗██║████╗  ██║██╔═══██╗╚══███╔╝██╔══██╗██╔═══██╗██╔════╝   ║
║   ███████╗██████╔╝██║██╔██╗ ██║██║   ██║  ███╔╝ ███████║██║   ██║███████╗   ║
║   ╚════██║██╔═══╝ ██║██║╚██╗██║██║   ██║ ███╔╝  ██╔══██║██║   ██║╚════██║   ║
║   ███████║██║     ██║██║ ╚████║╚██████╔╝███████╗██║  ██║╚██████╔╝███████║   ║
║   ╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ║
║                                                                              ║
║   "More Geometrico" - Design System for the Age of Superintelligence         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

| Property | Value |
|----------|-------|
| **Name** | SpinozaOS |
| **Codename** | Design System for AGI Era |
| **Slogan** | "More Geometrico" |
| **Domain** | spinozaos.mustafasarac.com |
| **Docs Domain** | docs-spinozaos.mustafasarac.com |
| **Repository** | github.com/mrsarac/spinozaos |
| **NPM Scope** | @spinozaos/* |
| **Origin** | Substance AGI Intelligence Engine |
| **Status** | v0.1.0 - IN DEVELOPMENT |
| **Owner** | Mustafa Saraç (NRW, Germany) |

---

## ECOSYSTEM CONTEXT

### The Monolith Strategy: "The Vatican & The Artifacts"

SpinozaOS, Mustafa Saraç'ın **"Personal Monopoly"** stratejisinin bir parçasıdır.

```
mustafasarac.com (Vatican - Central Hub)
├── spinoza.mustafasarac.com      → Emotional Engineering Tool
├── substance.mustafasarac.com    → AGI Prediction Engine (Primary Consumer)
├── forge.mustafasarac.com        → Cognitive Training Platform
├── rhythm.mustafasarac.com       → Drum/Music Visualization
└── spinozaos.mustafasarac.com    → Design System (This Project)
```

### Design DNA

```
SpinozaOS = (Bloomberg Terminal × Sci-Fi UI × Spinoza Philosophy)
          = Data-driven + Mysterious + Philosophical
```

### Relationship to Other Projects

| Project | Relationship |
|---------|--------------|
| **Substance** | Primary consumer, origin project |
| **Spinoza** | Potential consumer |
| **UD Design System** | Sibling (Zed.dev inspired, teal accent) |

---

## DESIGN PHILOSOPHY

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Prophetic Gold** | Single accent color (#fbbf24) for mystical, future-focused aesthetic |
| **Void-first** | Deep black (#020617) as foundation - NO LIGHT MODE |
| **Motion-first** | 60fps animations, spring physics, award-winning interactions |
| **Information-dense** | Bloomberg Terminal inspired data visualization |
| **Mobile-first** | Touch targets (44px min), responsive from ground up |

### Quality Standards (Award-Winning)

| Criterion | Minimum | Target |
|-----------|---------|--------|
| Awwwards Design | 8/10 | 9/10 |
| Usability | 8/10 | 9/10 |
| Animation FPS | 60fps | 120fps |
| WCAG Compliance | 2.1 AA | 2.1 AAA |

---

## TECH STACK

```yaml
Monorepo:
  Tool: Turborepo
  Package Manager: pnpm 8.15.0
  Node: >=18.0.0

Packages:
  @spinozaos/tokens (v0.1.0):
    - CSS Custom Properties
    - TypeScript tokens
    - Complete design token system

  @spinozaos/react (v0.1.0):
    - React 18+ components
    - TypeScript
    - Framer Motion integration
    - CVA (class-variance-authority)
    - 25 production-ready components

  @spinozaos/motion (v0.1.0):
    - Spring configurations
    - Easing presets
    - Animation variants
    - Framer Motion helpers

  @spinozaos/tailwind (v0.1.0):
    - Tailwind CSS preset
    - Custom utilities
    - Glassmorphism helpers

Apps:
  docs:
    Framework: Astro Starlight
    Pages: 30 documentation pages
    Status: READY

  storybook:
    Framework: Storybook 8.6.0
    Port: 6006
    Status: READY

  showcase:
    Framework: React + Vite
    Status: PLANNED
```

---

## COLOR PALETTE

### Primary Colors (Prophetic Gold Theme)

| Token | Hex | Usage |
|-------|-----|-------|
| **void** | #020617 | Primary background |
| **void-light** | #0f172a | Elevated surfaces |
| **void-lighter** | #1e293b | Cards, panels |
| **spinoza-yellow** | #fbbf24 | Primary accent, CTAs |
| **spinoza-gold** | #d97706 | Rich gold variant |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **success** | #22c55e | Positive feedback |
| **error** | #ef4444 | Error states |
| **warning** | #f59e0b | Warning messages |
| **info** | #3b82f6 | Information |
| **oracle-purple** | #8b5cf6 | Premium/Oracle tier |

### Clearance Levels (Substance-extracted)

| Level | Color | Description |
|-------|-------|-------------|
| **cosmic** | Purple | Highest security |
| **topSecret** | Red | Very high security |
| **secret** | Orange | High security |
| **classified** | Yellow | Medium security |
| **standard** | Green | Default level |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| **text-primary** | #ffffff | Headlines, primary |
| **text-secondary** | neutral-400 | Body, descriptions |
| **text-tertiary** | neutral-500 | Labels, captions |
| **text-muted** | neutral-600 | Disabled, hints |
| **text-accent** | spinoza-yellow | Highlighted text |

---

## TYPOGRAPHY

### Font Stack

```css
--font-serif: 'Playfair Display', Georgia, serif;     /* Display, Headlines */
--font-sans: 'Inter', system-ui, sans-serif;          /* UI, Body */
--font-mono: 'JetBrains Mono', monospace;             /* Data, Code */
```

### Type Scale

| Style | Font | Size | Weight | Use Case |
|-------|------|------|--------|----------|
| Display | Serif | 60px | 600 | Hero headlines |
| Heading 1 | Serif | 36px | 600 | Section titles |
| Heading 2 | Sans | 24px | 600 | Card titles |
| Body | Sans | 16px | 400 | Paragraphs |
| Label | Mono | 10px | 500 | Categories, tags |
| Data | Mono | 48px | 400 | Numbers, statistics |

---

## MOTION SYSTEM

### Spring Configurations

```typescript
const SPRING = {
  tight:  { stiffness: 500, damping: 30 },  // Buttons, micro-interactions
  soft:   { stiffness: 300, damping: 30 },  // Cards, panels
  bouncy: { stiffness: 400, damping: 20 },  // Badges, playful elements
  slow:   { stiffness: 200, damping: 30 },  // Page transitions
  mobile: { stiffness: 400, damping: 35 },  // Touch optimized
  snappy: { stiffness: 600, damping: 35 },  // Quick feedback
};
```

### Easing Curves

```typescript
const EASE = {
  enter:  [0.22, 1, 0.36, 1],        // Page load, elements appear
  exit:   [0.4, 0, 0.2, 1],          // Page exit, elements leave
  smooth: [0.4, 0, 0.2, 1],          // General transitions
  bounce: [0.68, -0.55, 0.27, 1.55], // Playful feedback
  ios:    [0.25, 0.1, 0.25, 1],      // iOS native feel
};
```

### Duration Scale

| Token | Duration | Use Case |
|-------|----------|----------|
| instant | 100ms | Hover states |
| fast | 200ms | Button feedback |
| normal | 300ms | Menu open |
| slow | 500ms | Page transitions |
| glacial | 1000ms | Hero animations |

### Accessibility

```typescript
// Motion respects prefers-reduced-motion
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

---

## COMPONENTS (25 Production-Ready)

### Implemented Components

#### Actions & Layout
- [x] **Button** (primary, secondary, ghost, oracle variants)
- [x] **Card**
- [x] **Text**

#### Forms
- [x] **Input**
- [x] **Textarea**
- [x] **Select**
- [x] **Checkbox**
- [x] **Toggle**

#### Feedback
- [x] **Badge**
- [x] **Toast** (with ToastContainer)
- [x] **Modal** (with Header, Body, Footer)
- [x] **Tooltip**
- [x] **Progress** (with Spinner, LoadingDots, Skeleton)

#### Data Display (Substance-extracted)
- [x] **ClearanceBadge** (5 security levels)
- [x] **ConfidenceIndicator** (slider variant, 0-100%)
- [x] **DecorativeLine** (4 variants + utilities)
- [x] **StatCard** (grid layout, trend indicators)
- [x] **EmptyState** (presets: NoResults, NoData, ErrorState, NotFound)

#### Navigation & Disclosure
- [x] **Accordion** (FAQAccordion preset, single/multiple modes)
- [x] **Tabs** (PeriodTabs preset for time ranges)
- [x] **Avatar** (with AvatarGroup)

### Planned Components

- [ ] Dropdown Menu
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Data Table / Grid
- [ ] Popover
- [ ] Alert / Banner
- [ ] Drawer / Sidebar
- [ ] Slider / Range Input
- [ ] File Upload
- [ ] Date Picker
- [ ] Search Component
- [ ] Stepper / Timeline
- [ ] Code Block

---

## GLASSMORPHISM EFFECTS

```css
/* Standard Glass */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Elevated Glass */
.glass-elevated {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Interactive Glass */
.glass-interactive {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  transition: background 200ms;
}
.glass-interactive:hover {
  background: rgba(255, 255, 255, 0.06);
}
```

### Glow Effects

```css
--glow-yellow: 0 0 20px rgba(251, 191, 36, 0.3);
--glow-yellow-intense: 0 0 40px rgba(251, 191, 36, 0.5);
--glow-oracle: 0 0 20px rgba(139, 92, 246, 0.3);
```

---

## NEURABYTE LABS INTEGRATION

Bu proje, NeuraByte Labs v5.4 ekosisteminin bir parçasıdır.

### Relevant Agents

| Agent | Codename | Contribution |
|-------|----------|--------------|
| **Principal Designer** | The Visionary | UX, Information Architecture |
| **Visual Designer** | The Artist | UI, Glassmorphism, Tokens |
| **Design Engineer** | The Bridge | Figma→Code, Tailwind, CVA |
| **Motion Designer** | The Choreographer | GSAP, Framer Motion, 60fps |
| **Sr. 3D Graphics Engineer** | The Illusionist | Three.js, R3F (future) |
| **Shader Artist & VFX** | The Alchemist | GLSL, Post-processing (future) |

### Design Decision Protocol

Tasarım kararları için Gemini CLI ile MASTER PROMPT kullanılabilir:

```bash
gemini "Sen dünya çapında tanınan bir Senior Design System Architect'sin.
SpinozaOS felsefesi: Prophetic Gold, Void-first, Motion-first.

SORU: [TASARIM SORUSU]

Cevabında:
1. Somut değerler ver (px, hex, timing, spring values)
2. SpinozaOS token'larına uygun öneriler sun
3. Motion presets kullan (tight, soft, bouncy)
4. Accessibility kontrol et"
```

---

## INFRASTRUCTURE

### Deployment (Coolify)

| Component | Domain | Status |
|-----------|--------|--------|
| Docs Site | docs-spinozaos.mustafasarac.com | PLANNED |
| Showcase | showcase-spinozaos.mustafasarac.com | PLANNED |
| Storybook | storybook-spinozaos.mustafasarac.com | PLANNED |

### Server (Hetzner Cloud)

```yaml
IP: 91.98.46.190
Platform: Coolify v4
Panel: https://panel.mustafasarac.com
SSL: Let's Encrypt (automatic)
Proxy: Traefik
```

### DNS (Cloudflare)

```bash
# Subdomains to configure
docs-spinozaos.mustafasarac.com    → A → 91.98.46.190
spinozaos.mustafasarac.com         → A → 91.98.46.190
```

---

## DEVELOPMENT COMMANDS

```bash
# Clone
git clone https://github.com/mrsarac/spinozaos.git
cd spinozaos

# Install dependencies
pnpm install

# Development (all packages)
pnpm dev

# Storybook
pnpm storybook

# Build all packages
pnpm build

# Build specific package
pnpm build --filter=@spinozaos/react

# Documentation site
cd apps/docs && pnpm dev

# Lint
pnpm lint

# Clean
pnpm clean

# Changeset (for versioning)
pnpm changeset

# Publish to npm
pnpm release
```

---

## FILE STRUCTURE

```
spinozaos/
├── CLAUDE.md              # This file - AI context
├── README.md              # Project readme
├── package.json           # Root package
├── pnpm-workspace.yaml    # Workspace config
├── turbo.json             # Turborepo config
├── .changeset/            # Changesets for versioning
│
├── packages/
│   ├── tokens/            # @spinozaos/tokens
│   │   └── src/
│   │       ├── colors.ts
│   │       ├── typography.ts
│   │       ├── spacing.ts
│   │       ├── effects.ts
│   │       └── index.ts
│   │
│   ├── react/             # @spinozaos/react
│   │   └── src/
│   │       └── components/
│   │           ├── Button/
│   │           ├── Card/
│   │           ├── Modal/
│   │           └── ...
│   │
│   ├── motion/            # @spinozaos/motion
│   │   └── src/
│   │       ├── springs.ts
│   │       ├── easings.ts
│   │       ├── variants.ts
│   │       └── index.ts
│   │
│   └── tailwind/          # @spinozaos/tailwind
│       └── src/
│           └── preset.ts
│
├── apps/
│   ├── docs/              # Astro Starlight documentation
│   ├── storybook/         # Storybook configuration
│   └── showcase/          # Interactive demo (planned)
│
└── .storybook/            # Storybook config
```

---

## ROADMAP

### Phase 1: Foundation (Week 1-2) ✅
- [x] GitHub repo creation
- [x] Turborepo setup
- [x] @spinozaos/tokens package
- [x] @spinozaos/motion package
- [x] @spinozaos/tailwind preset
- [x] Basic documentation

### Phase 2: Core Components (Week 3-4) ✅
- [x] 25 React components
- [x] Motion system integration
- [x] Storybook setup

### Phase 3: Documentation (Week 5-6) ✅
- [x] Astro Starlight docs site
- [x] 30 documentation pages
- [x] Nixpacks/Docker config

### Phase 4: Testing & Polish (Week 7-8) 🚧
- [ ] Jest/Vitest test suite
- [ ] Accessibility audit
- [ ] Bundle size optimization
- [ ] Complete Storybook coverage

### Phase 5: Launch (Week 9-10) ⏳
- [ ] NPM publish (@spinozaos/*)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] v1.0.0 release
- [ ] Product Hunt announcement

---

## OPERATIONAL RULES

### ALWAYS DO:
1. **Dark-only** - No light mode, void-first always
2. **Motion** - Every interaction must have spring animation
3. **Tokens** - Use design tokens, never hardcode values
4. **CVA** - Use class-variance-authority for variants
5. **Accessibility** - WCAG 2.1 AA minimum, focus rings required
6. **Mobile-first** - 44px touch targets, responsive

### NEVER DO:
1. **No light mode** - This is intentional design choice
2. **No hardcoded colors** - Use tokens only
3. **No CSS-in-JS** - Tailwind + CVA only
4. **No heavy dependencies** - Keep bundle small
5. **No non-spring animations** - Use Framer Motion springs

---

## RELATED DOCUMENTATION

| Document | Location |
|----------|----------|
| **Master Control** | `/Users/mustafa/Documents/mustafasarac-core/CLAUDE.md` |
| **Project Spec** | `/Users/mustafa/Documents/mustafasarac-core/projects/spinozaos/PROJECT.md` |
| **Monolith Strategy** | `/Users/mustafa/Documents/mustafasarac-core/docs/STRATEGY_MONOLITH.md` |
| **UD Design Analysis** | `/Users/mustafa/Documents/mustafasarac-core/projects/design-system/UD-Design-System-Analysis.md` |
| **NeuraByte Labs** | `/Users/mustafa/Documents/mustafasarac-core/docs/NEURABYTE_LABS_V2.md` |

---

## SYNC STATUS

```yaml
Last Sync: 2025-12-08
Status: IN DEVELOPMENT
Version: v0.1.0

Packages Published: None (npm publish pending)
Components: 25 ready
Documentation Pages: 30 ready
Test Coverage: 0% (needs setup)

Next Milestones:
  - [ ] Test infrastructure setup
  - [ ] npm publish
  - [ ] CI/CD pipeline
  - [ ] Coolify deployment
```

---

*SpinozaOS - "More Geometrico"*
*Design tokens for the age of superintelligence*
*Part of mustafasarac-core ecosystem*

*Version: 1.0 | Last Updated: 2025-12-08*
