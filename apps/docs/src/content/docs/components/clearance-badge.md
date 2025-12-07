---
title: ClearanceBadge
description: Security clearance level indicator badges
---

## Overview

ClearanceBadge is a security clearance level indicator extracted from Substance AGI design patterns. Perfect for displaying access levels, security classifications, or status tiers.

```tsx
import { ClearanceBadge } from '@spinozaos/react';

<ClearanceBadge level="cosmic" />
```

## Clearance Levels

| Level | Color | Description |
|-------|-------|-------------|
| `cosmic` | Purple | Highest clearance level |
| `topSecret` | Red | Top secret classification |
| `secret` | Amber | Secret classification |
| `classified` | Yellow | Classified information |
| `standard` | Gray | Default/public access |

## Sizes

| Size | Dimensions |
|------|------------|
| `sm` | Compact, 9px text |
| `md` | Default, 10px text |
| `lg` | Large, 12px text |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `string` | `'standard'` | Clearance level |
| `size` | `string` | `'md'` | Badge size |
| `label` | `string` | - | Custom label text |
| `showIcon` | `boolean` | `true` | Show level icon |
| `pulse` | `boolean` | `false` | Pulsing animation for urgent items |
| `animated` | `boolean` | `false` | Animate on mount |

## Examples

```tsx
// Basic clearance badges
<ClearanceBadge level="cosmic" />
<ClearanceBadge level="topSecret" />
<ClearanceBadge level="secret" />
<ClearanceBadge level="classified" />
<ClearanceBadge level="standard" />

// With pulse animation (for urgent items)
<ClearanceBadge level="cosmic" pulse />

// Custom label
<ClearanceBadge level="topSecret" label="EYES ONLY" />

// Different sizes
<ClearanceBadge level="secret" size="sm" />
<ClearanceBadge level="secret" size="md" />
<ClearanceBadge level="secret" size="lg" />

// Without icon
<ClearanceBadge level="classified" showIcon={false} />

// Animated on mount
<ClearanceBadge level="cosmic" animated pulse />

// In context
<div className="flex items-center justify-between">
  <h3>Project Omega</h3>
  <ClearanceBadge level="cosmic" size="sm" pulse />
</div>
```

## Icon Mapping

Each clearance level has an associated icon:

- **cosmic**: Star
- **topSecret**: Shield
- **secret**: Lock
- **classified**: AlertTriangle
- **standard**: Eye

## Use Cases

- Security classifications in documents
- User access level indicators
- Project clearance requirements
- Status tier badges
- Premium/restricted content markers
