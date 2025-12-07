// Avatar - User avatar with fallback initials
// Extracted from Substance Leaderboard patterns

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { User } from 'lucide-react';

const avatarVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-bold uppercase',
    'overflow-hidden',
    'select-none',
    'transition-all duration-200',
  ],
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-[10px]',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-20 h-20 text-2xl',
      },
      variant: {
        default: 'bg-white/10 text-neutral-400 border border-white/10',
        oracle: 'bg-spinoza-yellow/20 text-spinoza-yellow border border-spinoza-yellow/30',
        cosmic: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
        teal: 'bg-teal-500/20 text-teal-400 border border-teal-500/30',
        success: 'bg-green-500/20 text-green-400 border border-green-500/30',
        error: 'bg-red-500/20 text-red-400 border border-red-500/30',
        gradient: [
          'bg-gradient-to-br from-spinoza-yellow/20 via-teal-500/20 to-purple-500/20',
          'text-white border border-white/20',
        ],
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-none',
        rounded: 'rounded-lg',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      shape: 'square',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Name to generate initials from */
  name?: string;
  /** Custom fallback content */
  fallback?: React.ReactNode;
  /** Show border/ring highlight */
  highlighted?: boolean;
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-neutral-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

export function Avatar({
  src,
  alt,
  name,
  fallback,
  size,
  variant,
  shape,
  highlighted = false,
  status,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const showImage = src && !imageError;
  const initials = name ? getInitials(name) : null;

  const highlightClass = highlighted
    ? 'ring-2 ring-spinoza-yellow/50 ring-offset-2 ring-offset-void'
    : '';

  const statusSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  return (
    <div className="relative inline-flex">
      <div
        className={`${avatarVariants({ size, variant, shape, className })} ${highlightClass}`}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : fallback ? (
          fallback
        ) : (
          <User
            size={
              size === 'xs' ? 12 :
              size === 'sm' ? 14 :
              size === 'lg' ? 20 :
              size === 'xl' ? 28 :
              size === '2xl' ? 36 : 16
            }
          />
        )}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSize[size || 'md']} ${statusColors[status]} rounded-full border-2 border-void`}
        />
      )}
    </div>
  );
}

// Avatar Group
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show */
  max?: number;
  /** Size for all avatars */
  size?: VariantProps<typeof avatarVariants>['size'];
  /** Spacing between avatars */
  spacing?: 'tight' | 'normal' | 'loose';
  children: React.ReactNode;
}

const spacingValues = {
  tight: '-space-x-3',
  normal: '-space-x-2',
  loose: '-space-x-1',
};

export function AvatarGroup({
  max,
  size = 'md',
  spacing = 'normal',
  className,
  children,
  ...props
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const count = childArray.length;
  const visible = max && count > max ? childArray.slice(0, max) : childArray;
  const remaining = max && count > max ? count - max : 0;

  return (
    <div
      className={`flex items-center ${spacingValues[spacing]} ${className || ''}`}
      {...props}
    >
      {visible.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
              key: index,
              size,
              className: 'ring-2 ring-void',
            })
          : child
      )}
      {remaining > 0 && (
        <Avatar
          size={size}
          variant="default"
          className="ring-2 ring-void"
          fallback={<span className="text-xs">+{remaining}</span>}
        />
      )}
    </div>
  );
}

export { avatarVariants };
