---
title: Variants
description: Pre-built animation variants for common patterns
---

## Animation Variants

```typescript
import { VARIANTS } from '@spinozaos/motion';
```

### Fade Animations

```typescript
VARIANTS.fadeIn      // Simple opacity fade
VARIANTS.fadeInUp    // Fade + slide up
VARIANTS.fadeInScale // Fade + scale
```

### Slide Animations

```typescript
VARIANTS.slideInRight     // Slide from right
VARIANTS.slideInRightFull // Full-screen slide (mobile)
VARIANTS.slideInUp        // Slide from bottom (sheets)
VARIANTS.slideInDown      // Slide from top (dropdowns)
```

### Stagger Animations

```typescript
VARIANTS.stagger          // Simple stagger
VARIANTS.staggerContainer // Container with delay
VARIANTS.staggerItem      // Child item
```

## Usage Example

```tsx
import { motion } from 'framer-motion';
import { VARIANTS, SPRING } from '@spinozaos/motion';

function CardList({ items }) {
  return (
    <motion.div variants={VARIANTS.staggerContainer} initial="initial" animate="animate">
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={VARIANTS.staggerItem}
          transition={SPRING.soft}
        >
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Micro-Interactions

```typescript
import { MICRO } from '@spinozaos/motion';

// Hover effects
MICRO.hover.lift       // { y: -4, scale: 1.01 }
MICRO.hover.glow       // Gold glow effect
MICRO.hover.scale      // { scale: 1.02 }

// Tap effects
MICRO.tap.press        // { scale: 0.98 }
MICRO.tap.click        // { scale: 0.95 }

// Touch (mobile)
MICRO.touch.press      // { scale: 0.96 }
MICRO.touch.highlight  // Gold highlight
```
