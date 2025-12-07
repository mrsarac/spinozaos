---
title: Select
description: Dropdown select component with keyboard navigation
---

## Select Component

A dropdown select component with smooth animations and keyboard support.

```tsx
import { Select } from '@spinozaos/react';

<Select
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]}
  placeholder="Select framework"
/>
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard select with border |
| `ghost` | Transparent, minimal style |
| `glass` | Glassmorphism effect |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | - | Array of options |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default selected value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `label` | `string` | - | Label text |
| `helperText` | `string` | - | Helper text |
| `disabled` | `boolean` | `false` | Disable select |
| `state` | `string` | `'default'` | Visual state |

## Option Type

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Examples

```tsx
// Basic select
<Select
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]}
  placeholder="Select framework"
/>

// With label and helper text
<Select
  options={frameworks}
  label="Framework"
  helperText="Choose your preferred framework"
/>

// With default value
<Select
  options={frameworks}
  defaultValue="react"
/>

// Controlled
const [value, setValue] = useState('');

<Select
  options={frameworks}
  value={value}
  onChange={setValue}
/>

// Error state
<Select
  options={frameworks}
  state="error"
  helperText="Selection is required"
/>

// With disabled options
<Select
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular (coming soon)', disabled: true },
  ]}
/>

// Glass variant
<Select
  variant="glass"
  options={frameworks}
/>
```

## Keyboard Support

- **Space/Enter**: Open dropdown
- **Escape**: Close dropdown
- **Click outside**: Close dropdown

## Motion

The select includes smooth animations:
- **Dropdown**: Slide and fade animation
- **Options**: Subtle hover slide
- **Chevron**: Rotation on open/close
