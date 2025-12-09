# SpinozaOS Showcase Architecture

> Hub-and-Spoke architecture for multi-demo showcase system

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    SpinozaOS Design System                      │
│              (@spinozaos/tokens, react, motion, tailwind)       │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ consumes packages
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Showcase Gallery Hub                          │
│              (showcase.spinozaos.mustafasarac.com)              │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ links to demos
                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                        Demo Spokes                               │
│  ┌─────────────┬──────────────┬──────────────┬─────────────┐    │
│  │ AGI Dash    │ AI Chat      │ Landing Page │ Data Viz    │    │
│  └─────────────┴──────────────┴──────────────┴─────────────┘    │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 │ extracts new patterns
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              Component Extraction Layer                         │
│   (New components flow back to core library)                    │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
spinozaos/
├── packages/                    # Core design system
│   ├── tokens/                  # @spinozaos/tokens
│   ├── react/                   # @spinozaos/react
│   ├── motion/                  # @spinozaos/motion
│   └── tailwind/                # @spinozaos/tailwind
│
├── apps/
│   ├── docs/                    # Documentation (Astro)
│   ├── showcase/                # Gallery Hub (Next.js 14)
│   └── demos/                   # Demo Applications
│       ├── agi-dashboard/       # Bloomberg-style analytics
│       ├── ai-chat/             # Conversational UI
│       ├── landing-page/        # Marketing site
│       ├── data-viz/            # Data visualization
│       └── form-builder/        # Form creation tool
│
└── tooling/
    └── component-extractor/     # CLI for component extraction
```

## Demo Types

| Demo | Use Case | Priority | Key Components |
|------|----------|----------|----------------|
| AGI Dashboard | Bloomberg-style analytics | P1 | StatCard, Progress, Badge, Tabs |
| AI Chat | Conversational UI | P1 | Input, Avatar, Toast, Skeleton |
| Landing Page | Marketing site | P2 | GlitchText, DecorativeLine, Button |
| Data Viz | Complex charts | P2 | StatCard, Progress, Tooltip, Tabs |
| Form Builder | Form creation | P3 | Input, Select, Toggle, Modal |

## Component Extraction Flow

1. **Build in Demo** - Create component in demo app
2. **Test & Iterate** - Use extensively, refine API
3. **Validate** - Check extraction criteria
4. **Extract** - Move to @spinozaos/react
5. **Document** - Update docs with demo examples

## Deployment Strategy

| Service | Domain | Platform |
|---------|--------|----------|
| Showcase | showcase.spinozaos.mustafasarac.com | Vercel |
| Demos | {demo}.spinozaos.mustafasarac.com | Vercel |
| Docs | docs-spinozaos.mustafasarac.com | Coolify |
| NPM | @spinozaos/* | npm registry |

## Tech Stack

- **Showcase**: Next.js 14 (App Router)
- **Demos**: Next.js 14 / Astro (per demo)
- **Charts**: Recharts with SpinozaOS styling
- **Motion**: Framer Motion + @spinozaos/motion
- **State**: Zustand or Jotai (per demo)
