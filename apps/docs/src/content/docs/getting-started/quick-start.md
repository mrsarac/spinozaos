---
title: Quick Start
description: Get started with SpinozaOS in minutes
---

## Quick Start

### Using Tokens

```typescript
import { colors, typography, spacing } from '@spinozaos/tokens';

// Colors
colors.spinoza.yellow  // #fbbf24
colors.void            // #020617

// Typography
typography.fontFamily.serif  // 'Playfair Display', Georgia, serif

// Spacing
spacing[4]  // 1rem (16px)
```

### Using React Components

```tsx
import { Button, Card, Text } from '@spinozaos/react';

function App() {
  return (
    <Card>
      <Text variant="heading">Welcome to SpinozaOS</Text>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

### Using Tailwind Preset

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@spinozaos/tailwind')],
  // your config...
};
```

### Using Motion Presets

```tsx
import { motion } from 'framer-motion';
import { SPRING, VARIANTS, MICRO } from '@spinozaos/motion';

function AnimatedCard() {
  return (
    <motion.div
      variants={VARIANTS.fadeInUp}
      initial="initial"
      animate="animate"
      whileHover={MICRO.hover.lift}
      transition={SPRING.soft}
    >
      Content
    </motion.div>
  );
}
```
