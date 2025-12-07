---
title: Colors
description: SpinozaOS color palette and semantic tokens
---

## Color Palette

### Primary Colors - Void

| Token | Hex | Usage |
|-------|-----|-------|
| `void` | #020617 | Primary background |
| `voidLight` | #0f172a | Elevated surfaces |
| `voidLighter` | #1e293b | Cards, panels |

### Accent - Prophetic Gold

| Token | Hex | Usage |
|-------|-----|-------|
| `spinoza.yellow` | #fbbf24 | Primary accent, CTAs |
| `spinoza.gold` | #d97706 | Rich gold variant |
| `spinoza.amber` | #f59e0b | Warm accent |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | #22c55e | Positive feedback |
| `error` | #ef4444 | Error states |
| `warning` | #f59e0b | Warning messages |
| `info` | #3b82f6 | Information |

### Oracle Premium

| Token | Hex | Usage |
|-------|-----|-------|
| `oracle.purple` | #8b5cf6 | Premium/Oracle tier |
| `oracle.glow` | rgba(139, 92, 246, 0.3) | Oracle glow effect |

## Usage

```typescript
import { colors, semantic } from '@spinozaos/tokens';

// Direct color access
const primary = colors.spinoza.yellow; // #fbbf24

// Semantic tokens
const bgPrimary = semantic.background.primary; // #020617
const textAccent = semantic.text.accent; // #fbbf24
```
