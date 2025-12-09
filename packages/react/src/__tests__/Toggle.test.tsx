import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../components/Toggle';

describe('Toggle', () => {
  describe('Rendering', () => {
    it('renders without label', () => {
      render(<Toggle />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Toggle label="Enable feature" />);
      expect(screen.getByText('Enable feature')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Toggle description="This enables the feature" />);
      expect(screen.getByText('This enables the feature')).toBeInTheDocument();
    });

    it('renders with label and description', () => {
      render(<Toggle label="Feature" description="Description text" />);
      expect(screen.getByText('Feature')).toBeInTheDocument();
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Toggle className="custom-class" />);
      // className is applied to the outermost wrapper div
      expect(document.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Toggle size="sm" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('w-8', 'h-5');
    });

    it('renders medium size (default)', () => {
      render(<Toggle size="md" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('w-10', 'h-6');
    });

    it('renders large size', () => {
      render(<Toggle size="lg" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('w-12', 'h-7');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Toggle variant="default" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('bg-white/10');
    });

    it('renders oracle variant', () => {
      render(<Toggle variant="oracle" checked />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('data-[state=checked]:bg-oracle');
    });

    it('renders success variant', () => {
      render(<Toggle variant="success" checked />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('data-[state=checked]:bg-status-success');
    });
  });

  describe('Label Position', () => {
    it('renders label on the right by default', () => {
      render(<Toggle label="Right label" />);
      const container = screen.getByRole('switch').closest('.flex');
      const toggle = screen.getByRole('switch');
      const label = screen.getByText('Right label');
      expect(toggle.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('renders label on the left when specified', () => {
      render(<Toggle label="Left label" labelPosition="left" />);
      const toggle = screen.getByRole('switch');
      const label = screen.getByText('Left label');
      expect(toggle.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_PRECEDING);
    });
  });

  describe('States', () => {
    it('renders unchecked by default', () => {
      render(<Toggle />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');
      expect(toggle).toHaveAttribute('data-state', 'unchecked');
    });

    it('renders checked when defaultChecked', () => {
      render(<Toggle defaultChecked />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
      expect(toggle).toHaveAttribute('data-state', 'checked');
    });

    it('renders checked when checked prop is true', () => {
      render(<Toggle checked onChange={() => {}} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('can be disabled', () => {
      render(<Toggle disabled />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('toggles state on click', async () => {
      const user = userEvent.setup();
      render(<Toggle />);

      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');

      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'true');

      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles when clicking on label', async () => {
      const user = userEvent.setup();
      render(<Toggle label="Click me" />);

      const toggle = screen.getByRole('switch');
      const label = screen.getByText('Click me');

      expect(toggle).toHaveAttribute('aria-checked', 'false');
      await user.click(label);
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles on Space key', async () => {
      const user = userEvent.setup();
      render(<Toggle />);

      const toggle = screen.getByRole('switch');
      toggle.focus();

      expect(toggle).toHaveAttribute('aria-checked', 'false');
      await user.keyboard(' ');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles on Enter key', async () => {
      const user = userEvent.setup();
      render(<Toggle />);

      const toggle = screen.getByRole('switch');
      toggle.focus();

      expect(toggle).toHaveAttribute('aria-checked', 'false');
      await user.keyboard('{Enter}');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(<Toggle disabled />);

      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');

      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onChange when toggled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Toggle onChange={handleChange} />);

      await user.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Controlled Component', () => {
    it('respects controlled checked prop', async () => {
      const user = userEvent.setup();
      const ControlledToggle = () => {
        const [checked, setChecked] = React.useState(false);
        return <Toggle checked={checked} onChange={() => setChecked(!checked)} />;
      };

      render(<ControlledToggle />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveAttribute('aria-checked', 'false');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Toggle />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('has correct aria-checked attribute', () => {
      const { rerender } = render(<Toggle />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

      rerender(<Toggle checked onChange={() => {}} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('is focusable', () => {
      render(<Toggle />);
      const toggle = screen.getByRole('switch');
      toggle.focus();
      expect(document.activeElement).toBe(toggle);
    });

    it('has hidden native checkbox for form submission', () => {
      render(<Toggle name="feature" />);
      const checkbox = document.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass('sr-only');
      expect(checkbox).toHaveAttribute('name', 'feature');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to hidden input element', () => {
      const ref = vi.fn();
      render(<Toggle ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});

// Import React for controlled component test
import * as React from 'react';
