import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress, Spinner, LoadingDots, Skeleton } from '../components/Progress';

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders progress bar', () => {
      render(<Progress value={50} />);
      expect(document.querySelector('[class*="bg-gold"]')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Progress value={50} label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with value display', () => {
      render(<Progress value={75} showValue />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Progress value={50} className="custom-class" />);
      expect(document.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Value Calculation', () => {
    it('calculates percentage correctly', () => {
      render(<Progress value={25} max={100} showValue />);
      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('handles custom max value', () => {
      render(<Progress value={50} max={200} showValue />);
      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('clamps value to 0', () => {
      render(<Progress value={-10} showValue />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('clamps value to 100', () => {
      render(<Progress value={150} showValue />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Progress value={50} size="sm" />);
      expect(document.querySelector('.h-1')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<Progress value={50} size="md" />);
      expect(document.querySelector('.h-2')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Progress value={50} size="lg" />);
      expect(document.querySelector('.h-3')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Progress value={50} variant="default" />);
      expect(document.querySelector('.bg-gold')).toBeInTheDocument();
    });

    it('renders oracle variant', () => {
      render(<Progress value={50} variant="oracle" />);
      expect(document.querySelector('.bg-oracle')).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Progress value={50} variant="success" />);
      expect(document.querySelector('.bg-status-success')).toBeInTheDocument();
    });

    it('renders error variant', () => {
      render(<Progress value={50} variant="error" />);
      expect(document.querySelector('.bg-status-error')).toBeInTheDocument();
    });

    it('renders gradient variant', () => {
      render(<Progress value={50} variant="gradient" />);
      expect(document.querySelector('.bg-gradient-to-r')).toBeInTheDocument();
    });
  });

  describe('Indeterminate Mode', () => {
    it('renders indeterminate animation', () => {
      render(<Progress indeterminate />);
      const bar = document.querySelector('.w-1\\/3');
      expect(bar).toBeInTheDocument();
    });

    it('does not show value when indeterminate', () => {
      render(<Progress indeterminate showValue />);
      expect(screen.queryByText('%')).not.toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref', () => {
      const ref = vi.fn();
      render(<Progress value={50} ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders spinner', () => {
      render(<Spinner />);
      expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Spinner label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Spinner className="custom-class" />);
      expect(document.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Spinner size="sm" />);
      expect(document.querySelector('.w-4.h-4')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<Spinner size="md" />);
      expect(document.querySelector('.w-6.h-6')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Spinner size="lg" />);
      expect(document.querySelector('.w-8.h-8')).toBeInTheDocument();
    });

    it('renders xl size', () => {
      render(<Spinner size="xl" />);
      expect(document.querySelector('.w-12.h-12')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Spinner variant="default" />);
      expect(document.querySelector('.border-t-gold')).toBeInTheDocument();
    });

    it('renders oracle variant', () => {
      render(<Spinner variant="oracle" />);
      expect(document.querySelector('.border-t-oracle')).toBeInTheDocument();
    });

    it('renders white variant', () => {
      render(<Spinner variant="white" />);
      expect(document.querySelector('.border-t-white')).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Spinner variant="success" />);
      expect(document.querySelector('.border-t-status-success')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref', () => {
      const ref = vi.fn();
      render(<Spinner ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});

describe('LoadingDots', () => {
  describe('Rendering', () => {
    it('renders three dots', () => {
      render(<LoadingDots />);
      const dots = document.querySelectorAll('.rounded-full');
      expect(dots).toHaveLength(3);
    });

    it('applies custom className', () => {
      render(<LoadingDots className="custom-class" />);
      expect(document.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<LoadingDots size="sm" />);
      expect(document.querySelector('.w-1\\.5')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<LoadingDots size="md" />);
      expect(document.querySelector('.w-2')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<LoadingDots size="lg" />);
      expect(document.querySelector('.w-3')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<LoadingDots variant="default" />);
      expect(document.querySelector('.bg-gold')).toBeInTheDocument();
    });

    it('renders oracle variant', () => {
      render(<LoadingDots variant="oracle" />);
      expect(document.querySelector('.bg-oracle')).toBeInTheDocument();
    });

    it('renders white variant', () => {
      render(<LoadingDots variant="white" />);
      expect(document.querySelector('.bg-white')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref', () => {
      const ref = vi.fn();
      render(<LoadingDots ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders skeleton element', () => {
      render(<Skeleton />);
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Skeleton className="custom-class" />);
      expect(document.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('applies custom width', () => {
      render(<Skeleton width={200} />);
      const skeleton = document.querySelector('.animate-pulse');
      expect(skeleton).toHaveStyle({ width: '200px' });
    });

    it('applies custom height', () => {
      render(<Skeleton height={50} />);
      const skeleton = document.querySelector('.animate-pulse');
      expect(skeleton).toHaveStyle({ height: '50px' });
    });

    it('applies string width', () => {
      render(<Skeleton width="100%" />);
      const skeleton = document.querySelector('.animate-pulse');
      expect(skeleton).toHaveStyle({ width: '100%' });
    });
  });

  describe('Rounded Options', () => {
    it('renders rounded none', () => {
      render(<Skeleton rounded="none" />);
      expect(document.querySelector('.rounded-none')).toBeInTheDocument();
    });

    it('renders rounded sm', () => {
      render(<Skeleton rounded="sm" />);
      expect(document.querySelector('.rounded-sm')).toBeInTheDocument();
    });

    it('renders rounded md (default)', () => {
      render(<Skeleton rounded="md" />);
      expect(document.querySelector('.rounded-md')).toBeInTheDocument();
    });

    it('renders rounded lg', () => {
      render(<Skeleton rounded="lg" />);
      expect(document.querySelector('.rounded-lg')).toBeInTheDocument();
    });

    it('renders rounded full', () => {
      render(<Skeleton rounded="full" />);
      expect(document.querySelector('.rounded-full')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref', () => {
      const ref = vi.fn();
      render(<Skeleton ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
