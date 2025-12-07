---
title: Effects
description: Glassmorphism, shadows, and glow effects
---

## Glassmorphism

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
```

## Glow Effects

| Token | Value | Usage |
|-------|-------|-------|
| `glow.yellow` | 0 0 20px rgba(251, 191, 36, 0.3) | Standard gold glow |
| `glow.yellowIntense` | 0 0 40px rgba(251, 191, 36, 0.5) | Intense hover |
| `glow.oracle` | 0 0 20px rgba(139, 92, 246, 0.3) | Premium tier |

## Shadows

| Token | Value |
|-------|-------|
| `shadows.sm` | 0 1px 2px 0 rgba(0, 0, 0, 0.05) |
| `shadows.md` | 0 4px 6px -1px rgba(0, 0, 0, 0.1) |
| `shadows.lg` | 0 10px 15px -3px rgba(0, 0, 0, 0.1) |

## Usage

```typescript
import { glass, shadows } from '@spinozaos/tokens';

// Glass effect
const glassStyle = {
  ...glass.standard,
};

// Glow effect
const glowStyle = {
  boxShadow: shadows.glow.yellow,
};
```
