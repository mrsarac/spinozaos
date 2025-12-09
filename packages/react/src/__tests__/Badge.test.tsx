import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../components/Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children text', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Badge</Badge>);
      expect(screen.getByText('Badge')).toHaveClass('custom-class');
    });

    it('renders with dot indicator', () => {
      render(<Badge dot>Status</Badge>);
      const badge = screen.getByText('Status');
      const dot = badge.querySelector('span.rounded-full');
      expect(dot).toBeInTheDocument();
    });

    it('renders dot with pulse animation', () => {
      render(<Badge dot pulse>Status</Badge>);
      const badge = screen.getByText('Status');
      const dot = badge.querySelector('span.animate-pulse');
      expect(dot).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Badge variant="default">Default</Badge>);
      expect(screen.getByText('Default')).toHaveClass('bg-void-lighter');
    });

    it('renders primary variant', () => {
      render(<Badge variant="primary">Primary</Badge>);
      const badge = screen.getByText('Primary');
      expect(badge).toHaveClass('bg-spinoza-yellow/10');
      expect(badge).toHaveClass('text-spinoza-yellow');
    });

    it('renders success variant', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-success/10');
      expect(badge).toHaveClass('text-success');
    });

    it('renders error variant', () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText('Error');
      expect(badge).toHaveClass('bg-error/10');
      expect(badge).toHaveClass('text-error');
    });

    it('renders warning variant', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-warning/10');
      expect(badge).toHaveClass('text-warning');
    });

    it('renders info variant', () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText('Info');
      expect(badge).toHaveClass('bg-info/10');
      expect(badge).toHaveClass('text-info');
    });

    it('renders oracle variant', () => {
      render(<Badge variant="oracle">Oracle</Badge>);
      const badge = screen.getByText('Oracle');
      expect(badge).toHaveClass('bg-oracle-purple/10');
      expect(badge).toHaveClass('text-oracle-purple');
    });

    it('renders solid variant', () => {
      render(<Badge variant="solid">Solid</Badge>);
      const badge = screen.getByText('Solid');
      expect(badge).toHaveClass('bg-spinoza-yellow');
      expect(badge).toHaveClass('text-void');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Badge size="sm">Small</Badge>);
      expect(screen.getByText('Small')).toHaveClass('h-5');
    });

    it('renders medium size (default)', () => {
      render(<Badge size="md">Medium</Badge>);
      expect(screen.getByText('Medium')).toHaveClass('h-6');
    });

    it('renders large size', () => {
      render(<Badge size="lg">Large</Badge>);
      expect(screen.getByText('Large')).toHaveClass('h-7');
    });
  });

  describe('Dot Colors by Variant', () => {
    it('renders success dot color', () => {
      render(<Badge variant="success" dot>Success</Badge>);
      const badge = screen.getByText('Success');
      const dot = badge.querySelector('span.bg-success');
      expect(dot).toBeInTheDocument();
    });

    it('renders error dot color', () => {
      render(<Badge variant="error" dot>Error</Badge>);
      const badge = screen.getByText('Error');
      const dot = badge.querySelector('span.bg-error');
      expect(dot).toBeInTheDocument();
    });

    it('renders warning dot color', () => {
      render(<Badge variant="warning" dot>Warning</Badge>);
      const badge = screen.getByText('Warning');
      const dot = badge.querySelector('span.bg-warning');
      expect(dot).toBeInTheDocument();
    });

    it('renders info dot color', () => {
      render(<Badge variant="info" dot>Info</Badge>);
      const badge = screen.getByText('Info');
      const dot = badge.querySelector('span.bg-info');
      expect(dot).toBeInTheDocument();
    });

    it('renders primary dot color', () => {
      render(<Badge variant="primary" dot>Primary</Badge>);
      const badge = screen.getByText('Primary');
      const dot = badge.querySelector('span.bg-spinoza-yellow');
      expect(dot).toBeInTheDocument();
    });

    it('renders oracle dot color', () => {
      render(<Badge variant="oracle" dot>Oracle</Badge>);
      const badge = screen.getByText('Oracle');
      const dot = badge.querySelector('span.bg-oracle-purple');
      expect(dot).toBeInTheDocument();
    });

    it('renders default dot color', () => {
      render(<Badge variant="default" dot>Default</Badge>);
      const badge = screen.getByText('Default');
      const dot = badge.querySelector('span.bg-neutral-400');
      expect(dot).toBeInTheDocument();
    });

    it('renders solid dot color', () => {
      render(<Badge variant="solid" dot>Solid</Badge>);
      const badge = screen.getByText('Solid');
      const dot = badge.querySelector('span.bg-void');
      expect(dot).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('renders without animation by default', () => {
      render(<Badge>Static</Badge>);
      // Badge renders but doesn't have initial animation state
      expect(screen.getByText('Static')).toBeInTheDocument();
    });

    it('renders with animation when animated prop is true', () => {
      render(<Badge animated>Animated</Badge>);
      expect(screen.getByText('Animated')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('has mono font', () => {
      render(<Badge>Mono</Badge>);
      expect(screen.getByText('Mono')).toHaveClass('font-mono');
    });

    it('has uppercase text', () => {
      render(<Badge>Uppercase</Badge>);
      expect(screen.getByText('Uppercase')).toHaveClass('uppercase');
    });

    it('has rounded-full', () => {
      render(<Badge>Rounded</Badge>);
      expect(screen.getByText('Rounded')).toHaveClass('rounded-full');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to span element', () => {
      const ref = vi.fn();
      render(<Badge ref={ref}>Ref</Badge>);
      expect(ref).toHaveBeenCalled();
    });
  });
});
