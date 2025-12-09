# Contributing to SpinozaOS

Thank you for your interest in contributing to SpinozaOS! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm 8.15.0 or higher
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/mrsarac/spinozaos.git
cd spinozaos

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development mode
pnpm dev
```

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

### Commit Messages

We follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(react): add DatePicker component`
- `fix(tokens): correct spacing values`
- `docs: update installation guide`

## Design Principles

When contributing components or features, follow these principles:

### 1. Dark-Only (Void-First)

SpinozaOS is intentionally dark-only. Do not add light mode support.

```typescript
// Good
background: COLORS.void.DEFAULT

// Bad - no light mode
background: theme === 'light' ? '#fff' : COLORS.void.DEFAULT
```

### 2. Motion-First

Every interaction should have spring-based animation.

```typescript
// Good - using spring physics
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
>

// Bad - no motion or CSS-only animation
<div className="hover:scale-102 transition-transform">
```

### 3. Token-Based

Always use design tokens, never hardcode values.

```typescript
// Good
color: COLORS.spinoza.yellow

// Bad
color: '#fbbf24'
```

### 4. Accessibility

All components must meet WCAG 2.1 AA standards:

- Proper ARIA attributes
- Keyboard navigation support
- Focus visible states
- Color contrast ratios

## Component Structure

```
packages/react/src/components/ComponentName/
├── index.ts           # Exports
├── ComponentName.tsx  # Main component
├── types.ts          # TypeScript interfaces
└── variants.ts       # CVA variants (optional)
```

### Component Template

```typescript
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const componentVariants = cva(
  'base-classes-here',
  {
    variants: {
      variant: {
        default: 'default-styles',
      },
      size: {
        md: 'size-styles',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific package
pnpm test --filter=@spinozaos/react
```

### Test Requirements

- Unit tests for all components
- Accessibility tests using jest-axe
- Snapshot tests for visual regression

## Documentation

- Update component documentation in `apps/docs/`
- Include usage examples
- Document all props with TypeScript JSDoc comments

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm build` and `pnpm test`
4. Create a changeset: `pnpm changeset`
5. Submit a pull request

### PR Checklist

- [ ] Tests pass
- [ ] Builds successfully
- [ ] Documentation updated
- [ ] Changeset created
- [ ] Follows design principles

## Changesets

We use changesets for versioning. After making changes:

```bash
pnpm changeset
```

Select the packages affected and describe the changes.

## Questions?

- Open a GitHub issue for bugs or feature requests
- Email mustafa@mustafasarac.com for other inquiries

---

*Thank you for contributing to SpinozaOS!*
