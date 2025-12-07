---
title: Tabs
description: Tab navigation for organizing content
---

## Overview

Tabs provide tabbed navigation for organizing content into sections. Extracted from Substance Leaderboard patterns with multiple visual variants.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@spinozaos/react';

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Solid background active state |
| `pills` | Pill-shaped tabs |
| `underline` | Underline indicator |
| `segment` | Segmented control style |

## Sizes

| Size | Description |
|------|-------------|
| `sm` | Compact tabs |
| `md` | Default size |
| `lg` | Large tabs |

## Tabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | - | Initial active tab |
| `value` | `string` | - | Controlled active tab |
| `onValueChange` | `function` | - | Change callback |

## TabsList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Visual variant |
| `size` | `string` | `'md'` | Tab size |

## TabsTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Tab identifier (required) |
| `variant` | `string` | - | Override variant |
| `size` | `string` | - | Override size |

## TabsContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Tab identifier (required) |
| `animated` | `boolean` | `false` | Animate content change |

## Examples

### Default Variant

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>
```

### Pills Variant

```tsx
<Tabs defaultValue="all">
  <TabsList variant="pills">
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="archived">Archived</TabsTrigger>
  </TabsList>
</Tabs>
```

### Underline Variant

```tsx
<Tabs defaultValue="posts">
  <TabsList variant="underline">
    <TabsTrigger value="posts">Posts</TabsTrigger>
    <TabsTrigger value="comments">Comments</TabsTrigger>
    <TabsTrigger value="likes">Likes</TabsTrigger>
  </TabsList>
</Tabs>
```

### Segment Variant

```tsx
<Tabs defaultValue="day">
  <TabsList variant="segment">
    <TabsTrigger value="day">Day</TabsTrigger>
    <TabsTrigger value="week">Week</TabsTrigger>
    <TabsTrigger value="month">Month</TabsTrigger>
  </TabsList>
</Tabs>
```

### Animated Content

```tsx
<Tabs defaultValue="first">
  <TabsList>
    <TabsTrigger value="first">First</TabsTrigger>
    <TabsTrigger value="second">Second</TabsTrigger>
  </TabsList>
  <TabsContent value="first" animated>
    First content with animation
  </TabsContent>
  <TabsContent value="second" animated>
    Second content with animation
  </TabsContent>
</Tabs>
```

## Period Tabs Preset

For time period filters (common in dashboards):

```tsx
import { PeriodTabs } from '@spinozaos/react';

const [period, setPeriod] = useState<'all' | 'month' | 'week'>('all');

<PeriodTabs
  value={period}
  onChange={setPeriod}
  labels={{
    all: 'All Time',
    month: 'This Month',
    week: 'This Week',
  }}
/>
```

## Controlled Mode

```tsx
const [activeTab, setActiveTab] = useState('overview');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview</TabsContent>
  <TabsContent value="settings">Settings</TabsContent>
</Tabs>
```

## Accessibility

- Follows WAI-ARIA Tabs pattern
- Proper `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Arrow key navigation
- `aria-selected` state
- Focus management

## Use Cases

- Settings pages
- Dashboard sections
- Time period filters
- Feature tabs
- Navigation within modals
