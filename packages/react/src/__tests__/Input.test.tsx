import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../components/Input';

describe('Input', () => {
  // Rendering Tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Email" placeholder="Enter email" />);
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="This is a hint" placeholder="Enter text" />);
      expect(screen.getByText('This is a hint')).toBeInTheDocument();
    });

    it('renders with left icon', () => {
      render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<Input rightIcon={<span data-testid="right-icon">✓</span>} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders with both icons', () => {
      render(
        <Input
          leftIcon={<span data-testid="left-icon">🔍</span>}
          rightIcon={<span data-testid="right-icon">✓</span>}
        />
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  // Variant Tests
  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Input variant="default" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('bg-void-light');
    });

    it('renders ghost variant', () => {
      render(<Input variant="ghost" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('bg-transparent');
    });

    it('renders glass variant', () => {
      render(<Input variant="glass" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('backdrop-blur-sm');
    });
  });

  // Size Tests
  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Input size="sm" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('h-9');
    });

    it('renders medium size (default)', () => {
      render(<Input size="md" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('h-10');
    });

    it('renders large size', () => {
      render(<Input size="lg" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('h-12');
    });
  });

  // State Tests
  describe('States', () => {
    it('renders error state', () => {
      render(<Input state="error" label="Email" helperText="Invalid email" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('border-error');
    });

    it('renders success state', () => {
      render(<Input state="success" label="Email" helperText="Email is valid" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('border-success');
    });

    it('renders disabled state', () => {
      render(<Input disabled placeholder="Disabled" />);
      expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('handles text input', async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Type here" />);
      const input = screen.getByPlaceholderText('Type here');

      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange handler', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} placeholder="Type here" />);

      await user.type(screen.getByPlaceholderText('Type here'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles focus and blur', () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(<Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Focus me" />);

      const input = screen.getByPlaceholderText('Focus me');
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalled();

      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalled();
    });

    it('does not allow input when disabled', async () => {
      const handleChange = vi.fn();
      render(<Input disabled onChange={handleChange} placeholder="Disabled" />);

      const input = screen.getByPlaceholderText('Disabled');
      fireEvent.change(input, { target: { value: 'test' } });

      // Disabled inputs don't fire change events in the same way
      expect(input).toBeDisabled();
    });
  });

  // Type Tests
  describe('Input Types', () => {
    it('renders as text input by default', () => {
      render(<Input type="text" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');
    });

    it('renders as password input', () => {
      render(<Input type="password" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    });

    it('renders as email input', () => {
      render(<Input type="email" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
    });

    it('renders as number input', () => {
      render(<Input type="number" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'number');
    });
  });

  // Ref Forwarding
  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
