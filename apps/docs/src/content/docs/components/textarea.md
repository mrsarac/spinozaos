---
title: Textarea
description: Multiline text input component with character counting
---

## Textarea Component

A multiline text input component with optional character counting and validation states.

```tsx
import { Textarea } from '@spinozaos/react';

<Textarea
  label="Message"
  placeholder="Enter your message..."
/>
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard textarea with border |
| `ghost` | Transparent, minimal style |
| `glass` | Glassmorphism effect |

## Sizes

| Size | Min Height |
|------|------------|
| `sm` | 80px |
| `md` | 100px |
| `lg` | 140px |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text above textarea |
| `helperText` | `string` | - | Helper text below textarea |
| `showCount` | `boolean` | `false` | Show character count |
| `maxLength` | `number` | - | Maximum character limit |
| `state` | `string` | `'default'` | Visual state |
| `resize` | `string` | `'none'` | Resize behavior |

## Examples

```tsx
// Basic textarea
<Textarea placeholder="Enter your message..." />

// With label and helper text
<Textarea
  label="Description"
  placeholder="Describe your project..."
  helperText="Maximum 500 characters"
/>

// With character count
<Textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  showCount
  maxLength={200}
/>

// Error state
<Textarea
  label="Comment"
  state="error"
  helperText="This field is required"
/>

// Success state
<Textarea
  label="Notes"
  state="success"
  helperText="Saved successfully"
  defaultValue="Your content here..."
/>

// Resizable
<Textarea
  label="Feedback"
  resize="vertical"
  placeholder="You can resize this..."
/>

// Glass variant
<Textarea
  variant="glass"
  label="Message"
  placeholder="Enter message..."
/>
```

## Resize Options

| Option | Description |
|--------|-------------|
| `none` | Cannot be resized |
| `vertical` | Can resize vertically |
| `horizontal` | Can resize horizontally |
| `both` | Can resize in both directions |

## Accessibility

- Proper label association
- Error states announced to screen readers
- Character count updates announced
