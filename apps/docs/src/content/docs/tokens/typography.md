---
title: Typography
description: SpinozaOS typography system
---

## Font Stack

```css
--font-serif: 'Playfair Display', Georgia, serif;
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

## Type Styles

| Style | Font | Size | Use Case |
|-------|------|------|----------|
| Display | Serif | 60px | Hero headlines |
| Heading 1 | Serif | 36px | Section titles |
| Heading 2 | Sans | 24px | Card titles |
| Body | Sans | 16px | Paragraphs |
| Label | Mono | 10px | Categories |
| Data | Mono | 48px | Numbers |

## Usage

```typescript
import { typography } from '@spinozaos/tokens';

// Font families
typography.fontFamily.serif  // 'Playfair Display', Georgia, serif
typography.fontFamily.sans   // 'Inter', system-ui, sans-serif
typography.fontFamily.mono   // 'JetBrains Mono', monospace

// Font sizes
typography.fontSize.base     // 1rem (16px)
typography.fontSize['4xl']   // 2.25rem (36px)
```
