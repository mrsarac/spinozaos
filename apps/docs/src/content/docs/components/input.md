---
title: Input
description: Form input component with variants and states
---

## Input Component

A flexible form input component with multiple variants, states, and icon support.

```tsx
import { Input } from '@spinozaos/react';

<Input placeholder="Enter your email" />
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard input with border |
| `ghost` | Transparent, minimal style |
| `glass` | Glassmorphism effect |

## States

| State | Description |
|-------|-------------|
| `default` | Normal state |
| `error` | Red border and text |
| `success` | Green border and text |

## Sizes

| Size | Height |
|------|--------|
| `sm` | 36px |
| `md` | 40px |
| `lg` | 48px |

## Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label text above input |
| `helperText` | `string` | Helper text below input |
| `leftIcon` | `ReactNode` | Icon on the left |
| `rightIcon` | `ReactNode` | Icon on the right |
| `state` | `'default' \| 'error' \| 'success'` | Visual state |

## Examples

```tsx
// Basic input
<Input placeholder="Enter your name" />

// With label
<Input
  label="Email Address"
  placeholder="you@example.com"
  type="email"
/>

// With helper text
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>

// Error state
<Input
  label="Email"
  state="error"
  helperText="Please enter a valid email"
  defaultValue="invalid-email"
/>

// Success state
<Input
  label="Username"
  state="success"
  helperText="Username is available!"
  defaultValue="spinoza_dev"
/>

// Glass variant
<Input
  variant="glass"
  placeholder="Search..."
/>

// With icons
<Input
  placeholder="Search..."
  leftIcon={<SearchIcon />}
/>
```

## Motion

The input includes subtle focus animation:
- **Focus**: Slight scale increase (1.01x)
- **Transition**: Tight spring physics
