---
title: Toast
description: Notification toast component with auto-dismiss
---

## Toast Component

A notification toast component for displaying feedback messages.

```tsx
import { Toast, ToastContainer } from '@spinozaos/react';

<ToastContainer position="bottom-right">
  <Toast
    variant="success"
    title="Success!"
    description="Your changes have been saved."
  />
</ToastContainer>
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Neutral notification |
| `success` | Green success message |
| `error` | Red error message |
| `warning` | Orange warning message |
| `info` | Blue information message |

## Positions

| Position | Description |
|----------|-------------|
| `top-right` | Top right corner |
| `top-left` | Top left corner |
| `top-center` | Top center |
| `bottom-right` | Bottom right corner |
| `bottom-left` | Bottom left corner |
| `bottom-center` | Bottom center |

## Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Toast title |
| `description` | `string` | Toast description |
| `icon` | `ReactNode` | Custom icon |
| `action` | `ReactNode` | Action button |
| `onClose` | `() => void` | Close callback |
| `duration` | `number` | Auto-dismiss duration (ms) |

## Examples

```tsx
// Basic toasts
<Toast title="Notification" description="Something happened." />

<Toast
  variant="success"
  title="Success!"
  description="Your changes have been saved."
/>

<Toast
  variant="error"
  title="Error"
  description="Something went wrong."
/>

<Toast
  variant="warning"
  title="Warning"
  description="Your session will expire soon."
/>

<Toast
  variant="info"
  title="Info"
  description="A new version is available."
/>

// With action button
<Toast
  variant="info"
  title="Update Available"
  description="SpinozaOS v2.0 is now available."
  action={<Button size="sm">Update Now</Button>}
/>

// With close button
<Toast
  variant="success"
  title="File Uploaded"
  description="document.pdf uploaded successfully."
  onClose={() => handleClose()}
/>

// Custom duration (10 seconds)
<Toast
  title="Important"
  description="This will stay longer."
  duration={10000}
/>
```

## Toast Container

Use `ToastContainer` to position multiple toasts:

```tsx
const [toasts, setToasts] = useState([]);

<ToastContainer position="bottom-right">
  {toasts.map(toast => (
    <Toast
      key={toast.id}
      {...toast}
      onClose={() => removeToast(toast.id)}
    />
  ))}
</ToastContainer>
```

## Motion

The toast includes smooth animations:
- **Enter**: Slide up, fade in, scale
- **Exit**: Slide down, fade out
- **Transition**: Soft spring physics
