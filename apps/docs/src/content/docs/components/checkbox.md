---
title: Checkbox
description: Checkbox component with animated checkmark
---

## Checkbox Component

A checkbox component with animated checkmark and multiple variants.

```tsx
import { Checkbox } from '@spinozaos/react';

<Checkbox label="Accept terms and conditions" />
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Gold checkmark |
| `oracle` | Purple checkmark |
| `success` | Green checkmark |

## Sizes

| Size | Dimensions |
|------|------------|
| `sm` | 16x16px |
| `md` | 20x20px |
| `lg` | 24x24px |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text |
| `description` | `string` | - | Description text |
| `checked` | `boolean` | - | Controlled state |
| `defaultChecked` | `boolean` | `false` | Default state |
| `onChange` | `function` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable checkbox |
| `variant` | `string` | `'default'` | Visual variant |
| `size` | `string` | `'md'` | Checkbox size |

## Examples

```tsx
// Basic checkbox
<Checkbox label="Accept terms" />

// With description
<Checkbox
  label="Enable notifications"
  description="Receive updates about your account"
/>

// Default checked
<Checkbox
  label="Subscribe to newsletter"
  defaultChecked
/>

// Controlled
const [checked, setChecked] = useState(false);

<Checkbox
  label="Agree to terms"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Oracle variant
<Checkbox
  label="Enable Oracle features"
  variant="oracle"
/>

// Success variant
<Checkbox
  label="Verified"
  variant="success"
  defaultChecked
/>

// Disabled
<Checkbox
  label="Locked setting"
  disabled
  defaultChecked
/>

// Checkbox group
<div className="space-y-3">
  <Checkbox label="Email notifications" defaultChecked />
  <Checkbox label="Push notifications" />
  <Checkbox label="SMS notifications" />
</div>
```

## Accessibility

- Uses `role="checkbox"` for screen readers
- Keyboard accessible (Space/Enter to toggle)
- Focus visible styles
- Label clickable

## Motion

The checkbox includes smooth animations:
- **Check**: Path drawing animation
- **Toggle**: Scale bounce on click
- **Checkmark**: Fade in with spring physics
