---
title: Springs
description: Spring physics configurations for natural motion
---

## Spring Configurations

```typescript
import { SPRING } from '@spinozaos/motion';
```

| Preset | Stiffness | Damping | Use Case |
|--------|-----------|---------|----------|
| `tight` | 500 | 30 | Buttons, toggles |
| `soft` | 300 | 30 | Cards, panels |
| `bouncy` | 400 | 20 | Badges, achievements |
| `slow` | 200 | 30 | Page transitions |
| `mobile` | 400 | 35 | Touch optimized |
| `snappy` | 600 | 35 | Quick UI feedback |

## Usage with Framer Motion

```tsx
import { motion } from 'framer-motion';
import { SPRING } from '@spinozaos/motion';

function Button() {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING.tight}
    >
      Click me
    </motion.button>
  );
}
```

## Mobile-Aware Springs

```typescript
import { getSpring } from '@spinozaos/motion';

// Automatically returns mobile-optimized spring on mobile devices
const spring = getSpring('soft');
```
