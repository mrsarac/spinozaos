---
title: EmptyState
description: Empty and zero state displays with actions
---

## Overview

EmptyState provides consistent empty/zero state displays with icons, messages, and actions. Extracted from Substance Leaderboard patterns.

```tsx
import { EmptyState } from '@spinozaos/react';
import { Inbox } from 'lucide-react';

<EmptyState
  icon={Inbox}
  title="No items yet"
  description="Get started by creating your first item."
/>
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard padding |
| `bordered` | With border and background |
| `subtle` | Transparent background |

## Sizes

| Size | Description |
|------|-------------|
| `sm` | Compact |
| `md` | Default |
| `lg` | Large, more spacing |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Title text (required) |
| `description` | `string` | - | Description text |
| `icon` | `LucideIcon` | `Inbox` | Icon component |
| `iconColor` | `string` | `'text-neutral-600'` | Icon color class |
| `action` | `ReactNode` | - | Action button |
| `variant` | `string` | `'default'` | Visual variant |
| `size` | `string` | `'md'` | Component size |
| `animated` | `boolean` | `false` | Animate on mount |

## Examples

### Basic

```tsx
<EmptyState
  title="No predictions yet"
  description="Be the first to make a prediction!"
/>
```

### With Action

```tsx
import { Button } from '@spinozaos/react';

<EmptyState
  title="No predictions yet"
  description="Make your first prediction to appear on the leaderboard."
  action={
    <Button variant="primary" size="sm">
      Make Prediction
    </Button>
  }
/>
```

### Custom Icon

```tsx
import { Trophy, FileText, MessageSquare } from 'lucide-react';

<EmptyState icon={Trophy} title="No rankings yet" />
<EmptyState icon={FileText} title="No documents" />
<EmptyState icon={MessageSquare} title="No comments" />
```

### With Animation

```tsx
<EmptyState
  title="Loading complete"
  description="No data found."
  animated
/>
```

## Preset Components

### NoResults

For search results:

```tsx
import { NoResults } from '@spinozaos/react';

// With search term
<NoResults searchTerm="quantum computing" />

// Generic
<NoResults description="Try adjusting your filters" />
```

### NoData

For empty data states:

```tsx
import { NoData } from '@spinozaos/react';

// With data type
<NoData dataType="predictions" />
<NoData dataType="comments" />

// With action
<NoData
  dataType="posts"
  action={<Button>Create Post</Button>}
/>
```

### ErrorState

For error displays:

```tsx
import { ErrorState } from '@spinozaos/react';

// With retry
<ErrorState
  error="Failed to load data"
  onRetry={() => refetch()}
/>

// Custom action
<ErrorState
  error="Network Error"
  description="Check your internet connection."
  action={<Button>Reload</Button>}
/>
```

### NotFound

For 404 states:

```tsx
import { NotFound } from '@spinozaos/react';

// Basic
<NotFound itemType="Market" />

// With action
<NotFound
  itemType="User"
  description="The profile may be private."
  action={<Button>Go Home</Button>}
/>
```

## Context Examples

### Search Results

```tsx
<div className="p-6 bg-neutral-900/50 border border-white/10">
  <input
    type="text"
    placeholder="Search..."
    className="w-full px-4 py-2 bg-white/5 border border-white/10"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {results.length === 0 && (
    <NoResults
      searchTerm={search}
      action={<Button onClick={() => setSearch('')}>Clear Search</Button>}
    />
  )}
</div>
```

### Leaderboard Empty

```tsx
<div className="border border-white/10">
  <div className="p-4 border-b border-white/5">
    <h2 className="text-lg font-serif text-white">Leaderboard</h2>
  </div>
  <NoData
    dataType="predictions"
    size="lg"
    action={
      <Button variant="primary">Make First Prediction</Button>
    }
  />
</div>
```

### Comments Section

```tsx
<div className="border border-white/10">
  <div className="p-4 border-b border-white/5 flex items-center gap-2">
    <MessageSquare size={16} className="text-neutral-500" />
    <span className="text-sm text-neutral-400">Comments (0)</span>
  </div>
  <EmptyState
    icon={MessageSquare}
    iconColor="text-neutral-600"
    title="No comments yet"
    description="Start the conversation!"
    size="md"
    action={<Button variant="ghost">Add Comment</Button>}
  />
</div>
```

## Use Cases

- Empty lists/tables
- Search with no results
- Initial onboarding states
- Error recovery
- 404 pages
- Loading completion with no data
