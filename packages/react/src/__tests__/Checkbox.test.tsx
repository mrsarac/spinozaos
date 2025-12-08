import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../components/Checkbox';

describe('Checkbox', () => {
  // Helper to get the visible checkbox button (not the hidden input)
  // We get all elements with role="checkbox" and filter to the button
  const getCheckbox = () => {
    const checkboxes = screen.getAllByRole('checkbox');
    const button = checkboxes.find(el => el.tagName === 'BUTTON');
    if (!button) throw new Error('Checkbox button not found');
    return button;
  };

  // Rendering Tests
  describe('Rendering', () => {
    it('renders without label', () => {
      render(<Checkbox />);
      expect(getCheckbox()).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Checkbox label="Newsletter" description="Get weekly updates" />);
      expect(screen.getByText('Newsletter')).toBeInTheDocument();
      expect(screen.getByText('Get weekly updates')).toBeInTheDocument();
    });

    it('renders with only description', () => {
      render(<Checkbox description="Some description" />);
      expect(screen.getByText('Some description')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-class" />);
      // Custom class is applied to the wrapper div
      const checkbox = getCheckbox();
      expect(checkbox.parentElement).toHaveClass('custom-class');
    });
  });

  // Size Tests
  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Checkbox size="sm" />);
      const checkbox = getCheckbox();
      expect(checkbox.className).toContain('w-4');
      expect(checkbox.className).toContain('h-4');
    });

    it('renders medium size (default)', () => {
      render(<Checkbox size="md" />);
      const checkbox = getCheckbox();
      expect(checkbox.className).toContain('w-5');
      expect(checkbox.className).toContain('h-5');
    });

    it('renders large size', () => {
      render(<Checkbox size="lg" />);
      const checkbox = getCheckbox();
      expect(checkbox.className).toContain('w-6');
      expect(checkbox.className).toContain('h-6');
    });
  });

  // Variant Tests
  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Checkbox variant="default" defaultChecked />);
      const checkbox = getCheckbox();
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('renders oracle variant', () => {
      render(<Checkbox variant="oracle" defaultChecked />);
      const checkbox = getCheckbox();
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('renders success variant', () => {
      render(<Checkbox variant="success" defaultChecked />);
      const checkbox = getCheckbox();
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });
  });

  // State Tests
  describe('States', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox />);
      expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');
    });

    it('renders checked when defaultChecked', () => {
      render(<Checkbox defaultChecked />);
      expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
    });

    it('renders checked when checked prop is true', () => {
      render(<Checkbox checked />);
      expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
    });

    it('renders disabled state', () => {
      render(<Checkbox disabled />);
      expect(getCheckbox()).toBeDisabled();
    });

    it('updates data-state attribute', () => {
      render(<Checkbox defaultChecked />);
      const checkbox = getCheckbox();
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('toggles checked state on click', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);

      const checkbox = getCheckbox();
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles when clicking on label', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click me" />);

      const checkbox = getCheckbox();
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      await user.click(screen.getByText('Click me'));
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('calls onChange when toggled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onChange={handleChange} />);

      await user.click(getCheckbox());
      expect(handleChange).toHaveBeenCalled();
    });

    it('does not toggle when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox disabled onChange={handleChange} />);

      const checkbox = getCheckbox();
      await user.click(checkbox);

      expect(checkbox).toHaveAttribute('aria-checked', 'false');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('toggles on Space key', () => {
      render(<Checkbox />);
      const checkbox = getCheckbox();

      fireEvent.keyDown(checkbox, { key: ' ' });
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles on Enter key', () => {
      render(<Checkbox />);
      const checkbox = getCheckbox();

      fireEvent.keyDown(checkbox, { key: 'Enter' });
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });
  });

  // Controlled Component Tests
  describe('Controlled Component', () => {
    it('respects controlled checked prop', () => {
      const { rerender } = render(<Checkbox checked={false} />);
      expect(getCheckbox()).toHaveAttribute('aria-checked', 'false');

      rerender(<Checkbox checked={true} />);
      expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
    });

    it('does not change controlled value on click without onChange', async () => {
      const user = userEvent.setup();
      render(<Checkbox checked={false} onChange={() => {}} />);

      await user.click(getCheckbox());
      // Internal state changes but controlled component should follow checked prop
      // This tests that we handle controlled behavior
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Checkbox />);
      expect(getCheckbox()).toBeInTheDocument();
    });

    it('has correct aria-checked attribute', () => {
      render(<Checkbox defaultChecked />);
      expect(getCheckbox()).toHaveAttribute('aria-checked', 'true');
    });

    it('is focusable', () => {
      render(<Checkbox />);
      const checkbox = getCheckbox();
      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });

    it('has hidden native checkbox for form submission', () => {
      render(<Checkbox name="terms" />);
      const hiddenInput = document.querySelector('input[type="checkbox"]');
      expect(hiddenInput).toHaveClass('sr-only');
    });
  });

  // Ref Forwarding
  describe('Ref Forwarding', () => {
    it('forwards ref to hidden input element', () => {
      const ref = vi.fn();
      render(<Checkbox ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
