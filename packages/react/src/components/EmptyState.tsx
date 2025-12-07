// EmptyState - Empty/zero state display
// Extracted from Substance Leaderboard patterns

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon, Inbox, Search, AlertCircle, FileQuestion } from 'lucide-react';

const emptyStateVariants = cva(
  ['text-center flex flex-col items-center justify-center'],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-white/10 rounded-lg bg-white/5',
        subtle: 'bg-transparent',
      },
      size: {
        sm: 'py-8 px-4',
        md: 'py-12 px-6',
        lg: 'py-16 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const iconContainerVariants = cva(
  ['mx-auto mb-4 flex items-center justify-center'],
  {
    variants: {
      size: {
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
      },
      variant: {
        default: '',
        bordered: 'border border-white/10 rounded-lg bg-white/5',
        subtle: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Icon component */
  icon?: LucideIcon;
  /** Icon color class */
  iconColor?: string;
  /** Action button */
  action?: React.ReactNode;
  /** Animate on mount */
  animated?: boolean;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  iconColor = 'text-neutral-600',
  action,
  variant,
  size,
  animated = false,
  className,
  ...props
}: EmptyStateProps) {
  const iconSize =
    size === 'sm' ? 24 :
    size === 'lg' ? 40 : 32;

  const titleSize =
    size === 'sm' ? 'text-sm' :
    size === 'lg' ? 'text-lg' : 'text-base';

  const descSize =
    size === 'sm' ? 'text-xs' :
    size === 'lg' ? 'text-sm' : 'text-xs';

  const content = (
    <>
      <div className={iconContainerVariants({ size, variant })}>
        <Icon size={iconSize} className={iconColor} />
      </div>

      <p className={`${titleSize} font-mono text-neutral-400`}>{title}</p>

      {description && (
        <p className={`${descSize} text-neutral-600 mt-1 max-w-xs`}>
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </>
  );

  // Use CSS animations to avoid Framer Motion TypeScript conflicts
  const animatedClass = animated ? 'animate-[fadeInUp_0.3s_ease-out]' : '';

  return (
    <div
      className={`${emptyStateVariants({ variant, size, className })} ${animatedClass}`}
      {...props}
    >
      {content}
    </div>
  );
}

// Preset: No Results
export interface NoResultsProps extends Omit<EmptyStateProps, 'title' | 'icon'> {
  searchTerm?: string;
}

export function NoResults({
  searchTerm,
  description,
  ...props
}: NoResultsProps) {
  return (
    <EmptyState
      icon={Search}
      iconColor="text-neutral-500"
      title={searchTerm ? `No results for "${searchTerm}"` : 'No results found'}
      description={description || 'Try adjusting your search or filters'}
      {...props}
    />
  );
}

// Preset: No Data
export interface NoDataProps extends Omit<EmptyStateProps, 'title' | 'icon'> {
  dataType?: string;
}

export function NoData({
  dataType = 'data',
  description,
  ...props
}: NoDataProps) {
  return (
    <EmptyState
      icon={Inbox}
      iconColor="text-neutral-600"
      title={`No ${dataType} yet`}
      description={description || `Be the first to add ${dataType}!`}
      {...props}
    />
  );
}

// Preset: Error State
export interface ErrorStateProps extends Omit<EmptyStateProps, 'title' | 'icon'> {
  error?: string;
  onRetry?: () => void;
}

export function ErrorState({
  error,
  description,
  onRetry,
  action,
  ...props
}: ErrorStateProps) {
  return (
    <EmptyState
      icon={AlertCircle}
      iconColor="text-red-400"
      title={error || 'Something went wrong'}
      description={description || 'An error occurred while loading data'}
      action={
        action || (onRetry ? (
          <button
            onClick={onRetry}
            className="px-4 py-2 text-xs font-mono uppercase bg-white/5 text-neutral-300 hover:bg-white/10 transition-colors"
          >
            Try Again
          </button>
        ) : null)
      }
      {...props}
    />
  );
}

// Preset: Not Found
export interface NotFoundProps extends Omit<EmptyStateProps, 'title' | 'icon'> {
  itemType?: string;
}

export function NotFound({
  itemType = 'item',
  description,
  ...props
}: NotFoundProps) {
  return (
    <EmptyState
      icon={FileQuestion}
      iconColor="text-neutral-500"
      title={`${itemType} not found`}
      description={description || `The ${itemType.toLowerCase()} you're looking for doesn't exist`}
      {...props}
    />
  );
}

export { emptyStateVariants, iconContainerVariants };
