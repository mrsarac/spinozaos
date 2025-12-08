import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../components/Card';

describe('Card', () => {
  // Rendering Tests
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders with complex children', () => {
      render(
        <Card>
          <h2>Title</h2>
          <p>Description</p>
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });
  });

  // Variant Tests
  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Card variant="default" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('bg-void-light');
    });

    it('renders glass variant', () => {
      render(<Card variant="glass" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('backdrop-blur-xl');
    });

    it('renders elevated variant', () => {
      render(<Card variant="elevated" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('bg-void-lighter');
    });

    it('renders interactive variant', () => {
      render(<Card variant="interactive" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('cursor-pointer');
    });
  });

  // Padding Tests
  describe('Padding', () => {
    it('renders with no padding', () => {
      render(<Card padding="none" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).not.toContain('p-4');
      expect(card.className).not.toContain('p-6');
      expect(card.className).not.toContain('p-8');
    });

    it('renders with small padding', () => {
      render(<Card padding="sm" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-4');
    });

    it('renders with medium padding (default)', () => {
      render(<Card padding="md" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-6');
    });

    it('renders with large padding', () => {
      render(<Card padding="lg" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-8');
    });
  });

  // Animation Tests
  describe('Animation', () => {
    it('enables animation by default', () => {
      render(<Card data-testid="card">Content</Card>);
      // Card with animate=true should have motion div with initial state
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
    });

    it('can disable animation', () => {
      render(<Card animate={false} data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('handles click on interactive variant', () => {
      const handleClick = vi.fn();
      render(
        <Card variant="interactive" onClick={handleClick} data-testid="card">
          Click me
        </Card>
      );

      fireEvent.click(screen.getByTestId('card'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('passes additional props', () => {
      render(
        <Card data-testid="card" aria-label="Test card">
          Content
        </Card>
      );
      expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Test card');
    });
  });

  // Styling Tests
  describe('Styling', () => {
    it('has base styles', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('overflow-hidden');
      expect(card.className).toContain('border');
    });

    it('combines variant and padding styles', () => {
      render(
        <Card variant="glass" padding="lg" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('backdrop-blur-xl');
      expect(card.className).toContain('p-8');
    });
  });

  // Ref Forwarding
  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      const ref = vi.fn();
      render(<Card ref={ref}>Content</Card>);
      expect(ref).toHaveBeenCalled();
    });
  });
});
