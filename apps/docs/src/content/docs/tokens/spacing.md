---
title: Spacing
description: SpinozaOS spacing scale and touch targets
---

## Spacing Scale

Based on 4px grid with 8pt system.

| Token | Value | Pixels |
|-------|-------|--------|
| `spacing[1]` | 0.25rem | 4px |
| `spacing[2]` | 0.5rem | 8px |
| `spacing[3]` | 0.75rem | 12px |
| `spacing[4]` | 1rem | 16px |
| `spacing[6]` | 1.5rem | 24px |
| `spacing[8]` | 2rem | 32px |
| `spacing[12]` | 3rem | 48px |

## Touch Targets (WCAG)

| Token | Value | Usage |
|-------|-------|-------|
| `touchTargets.min` | 44px | WCAG minimum |
| `touchTargets.optimal` | 48px | Recommended |
| `touchTargets.large` | 56px | Primary CTAs |

## Usage

```typescript
import { spacing, touchTargets } from '@spinozaos/tokens';

// Spacing
spacing[4]  // 1rem (16px)
spacing[8]  // 2rem (32px)

// Touch targets
touchTargets.min     // 44px
touchTargets.optimal // 48px
```
