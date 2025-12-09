import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ClearanceBadge } from '../components/ClearanceBadge';

describe('ClearanceBadge', () => {
  describe('Rendering', () => {
    it('renders with default level', () => {
      render(<ClearanceBadge />);
      expect(screen.getByText('STANDARD')).toBeInTheDocument();
    });

    it('renders icon by default', () => {
      render(<ClearanceBadge />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      render(<ClearanceBadge showIcon={false} />);
      expect(document.querySelector('svg')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ClearanceBadge className="custom-badge" />);
      expect(document.querySelector('.custom-badge')).toBeInTheDocument();
    });
  });

  describe('Levels', () => {
    it('renders cosmic level', () => {
      render(<ClearanceBadge level="cosmic" />);
      expect(screen.getByText('COSMIC')).toBeInTheDocument();
      expect(document.querySelector('.text-purple-400')).toBeInTheDocument();
    });

    it('renders topSecret level', () => {
      render(<ClearanceBadge level="topSecret" />);
      expect(screen.getByText('TOP SECRET')).toBeInTheDocument();
      expect(document.querySelector('.text-red-400')).toBeInTheDocument();
    });

    it('renders secret level', () => {
      render(<ClearanceBadge level="secret" />);
      expect(screen.getByText('SECRET')).toBeInTheDocument();
      expect(document.querySelector('.text-amber-400')).toBeInTheDocument();
    });

    it('renders classified level', () => {
      render(<ClearanceBadge level="classified" />);
      expect(screen.getByText('CLASSIFIED')).toBeInTheDocument();
      expect(document.querySelector('.text-yellow-400')).toBeInTheDocument();
    });

    it('renders standard level', () => {
      render(<ClearanceBadge level="standard" />);
      expect(screen.getByText('STANDARD')).toBeInTheDocument();
      expect(document.querySelector('.text-neutral-400')).toBeInTheDocument();
    });
  });

  describe('Custom Label', () => {
    it('renders custom label instead of default', () => {
      render(<ClearanceBadge level="cosmic" label="CUSTOM LEVEL" />);
      expect(screen.getByText('CUSTOM LEVEL')).toBeInTheDocument();
      expect(screen.queryByText('COSMIC')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<ClearanceBadge size="sm" />);
      expect(document.querySelector('.text-\\[9px\\]')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<ClearanceBadge size="md" />);
      expect(document.querySelector('.text-\\[10px\\]')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<ClearanceBadge size="lg" />);
      expect(document.querySelector('.text-xs')).toBeInTheDocument();
    });
  });

  describe('Pulse Animation', () => {
    it('renders pulse indicator when pulse is true', () => {
      render(<ClearanceBadge pulse />);
      expect(document.querySelector('.animate-ping')).toBeInTheDocument();
    });

    it('does not render pulse indicator by default', () => {
      render(<ClearanceBadge />);
      expect(document.querySelector('.animate-ping')).not.toBeInTheDocument();
    });
  });

  describe('Animated', () => {
    it('applies animation class when animated', () => {
      render(<ClearanceBadge animated />);
      // Check for animation class on wrapper span
      const animatedElement = document.querySelector('[class*="animate-"]');
      expect(animatedElement).toBeInTheDocument();
    });

    it('does not apply animation class by default', () => {
      render(<ClearanceBadge />);
      // Should not have fadeInScale animation
      expect(document.querySelector('[class*="fadeInScale"]')).not.toBeInTheDocument();
    });
  });

  describe('Level Icons', () => {
    it('renders Star icon for cosmic level', () => {
      render(<ClearanceBadge level="cosmic" />);
      // Star icon is rendered
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders Shield icon for topSecret level', () => {
      render(<ClearanceBadge level="topSecret" />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders Lock icon for secret level', () => {
      render(<ClearanceBadge level="secret" />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders AlertTriangle icon for classified level', () => {
      render(<ClearanceBadge level="classified" />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders Eye icon for standard level', () => {
      render(<ClearanceBadge level="standard" />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('has mono font', () => {
      render(<ClearanceBadge />);
      // The badge wrapper has font-mono class
      expect(document.querySelector('.font-mono')).toBeInTheDocument();
    });

    it('has uppercase text', () => {
      render(<ClearanceBadge />);
      // The badge wrapper has uppercase class
      expect(document.querySelector('.uppercase')).toBeInTheDocument();
    });

    it('has border', () => {
      render(<ClearanceBadge />);
      // The badge wrapper has border class
      expect(document.querySelector('.border')).toBeInTheDocument();
    });
  });
});
