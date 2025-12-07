---
title: Motion Overview
description: SpinozaOS motion system and animation philosophy
---

## Motion Philosophy

SpinozaOS follows a **motion-first** approach with these principles:

- **60fps minimum** - Smooth, performant animations
- **Spring physics** - Natural, physical motion
- **Reduced motion support** - Accessibility-first
- **Mobile optimization** - Touch-optimized presets

## Packages

The motion system is split into reusable presets:

```typescript
import { 
  SPRING,    // Spring configurations
  EASE,      // Easing curves
  VARIANTS,  // Animation variants
  MICRO,     // Micro-interactions
  DURATION,  // Duration presets
} from '@spinozaos/motion';
```

## Duration Scale

| Token | Duration | Use Case |
|-------|----------|----------|
| instant | 100ms | Hover states |
| fast | 200ms | Button feedback |
| normal | 300ms | Menu open |
| slow | 500ms | Page transitions |
| glacial | 1000ms | Hero animations |

## Helpers

```typescript
import { isMobile, prefersReducedMotion, getSpring } from '@spinozaos/motion';

// Check device
if (isMobile()) {
  // Use mobile-optimized animations
}

// Respect user preferences
if (prefersReducedMotion()) {
  // Skip or reduce animations
}

// Get appropriate spring
const spring = getSpring('soft'); // Auto-detects mobile/reduced motion
```
