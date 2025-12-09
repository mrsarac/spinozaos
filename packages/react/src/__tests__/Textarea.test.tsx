import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../components/Textarea';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders textarea element', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Textarea label="Description" />);
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('renders with helperText', () => {
      render(<Textarea helperText="Enter your message" />);
      expect(screen.getByText('Enter your message')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Textarea placeholder="Type here..." />);
      expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Textarea className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Textarea variant="default" />);
      expect(screen.getByRole('textbox')).toHaveClass('bg-void-light');
    });

    it('renders ghost variant', () => {
      render(<Textarea variant="ghost" />);
      expect(screen.getByRole('textbox')).toHaveClass('bg-transparent');
    });

    it('renders glass variant', () => {
      render(<Textarea variant="glass" />);
      expect(screen.getByRole('textbox')).toHaveClass('backdrop-blur-md');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Textarea size="sm" />);
      expect(screen.getByRole('textbox')).toHaveClass('min-h-[80px]');
    });

    it('renders medium size (default)', () => {
      render(<Textarea size="md" />);
      expect(screen.getByRole('textbox')).toHaveClass('min-h-[100px]');
    });

    it('renders large size', () => {
      render(<Textarea size="lg" />);
      expect(screen.getByRole('textbox')).toHaveClass('min-h-[140px]');
    });
  });

  describe('States', () => {
    it('renders default state', () => {
      render(<Textarea state="default" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveClass('border-status-error');
      expect(textarea).not.toHaveClass('border-status-success');
    });

    it('renders error state', () => {
      render(<Textarea state="error" />);
      expect(screen.getByRole('textbox')).toHaveClass('border-status-error/50');
    });

    it('renders success state', () => {
      render(<Textarea state="success" />);
      expect(screen.getByRole('textbox')).toHaveClass('border-status-success/50');
    });

    it('can be disabled', () => {
      render(<Textarea disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('Resize Options', () => {
    it('defaults to resize none', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toHaveClass('resize-none');
    });

    it('renders with vertical resize', () => {
      render(<Textarea resize="vertical" />);
      expect(screen.getByRole('textbox')).toHaveClass('resize-y');
    });

    it('renders with horizontal resize', () => {
      render(<Textarea resize="horizontal" />);
      expect(screen.getByRole('textbox')).toHaveClass('resize-x');
    });

    it('renders with both resize', () => {
      render(<Textarea resize="both" />);
      expect(screen.getByRole('textbox')).toHaveClass('resize');
    });
  });

  describe('Character Count', () => {
    it('shows character count when showCount is true', async () => {
      const user = userEvent.setup();
      render(<Textarea showCount />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows character count with maxLength', async () => {
      const user = userEvent.setup();
      render(<Textarea showCount maxLength={100} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      expect(screen.getByText('5/100')).toBeInTheDocument();
    });

    it('applies error style when at maxLength', async () => {
      const user = userEvent.setup();
      render(<Textarea showCount maxLength={5} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      const countDisplay = screen.getByText('5/5');
      expect(countDisplay).toHaveClass('text-status-error');
    });

    it('respects maxLength attribute', async () => {
      const user = userEvent.setup();
      render(<Textarea maxLength={5} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello World');

      expect(textarea).toHaveValue('Hello');
    });
  });

  describe('Interactions', () => {
    it('accepts text input', async () => {
      const user = userEvent.setup();
      render(<Textarea />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Test message');

      expect(textarea).toHaveValue('Test message');
    });

    it('calls onChange handler', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('supports defaultValue', () => {
      render(<Textarea defaultValue="Default text" />);
      expect(screen.getByRole('textbox')).toHaveValue('Default text');
    });

    it('supports controlled value', () => {
      render(<Textarea value="Controlled" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('Controlled');
    });
  });

  describe('Accessibility', () => {
    it('has proper textbox role', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Textarea aria-label="Message input" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Message input');
    });

    it('is focusable', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      textarea.focus();
      expect(document.activeElement).toBe(textarea);
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to textarea element', () => {
      const ref = vi.fn();
      render(<Textarea ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Label State Styling', () => {
    it('applies error styling to label', () => {
      render(<Textarea label="Error Label" state="error" />);
      expect(screen.getByText('Error Label')).toHaveClass('text-status-error');
    });

    it('applies success styling to label', () => {
      render(<Textarea label="Success Label" state="success" />);
      expect(screen.getByText('Success Label')).toHaveClass('text-status-success');
    });
  });

  describe('Helper Text State Styling', () => {
    it('applies error styling to helper text', () => {
      render(<Textarea helperText="Error message" state="error" />);
      expect(screen.getByText('Error message')).toHaveClass('text-status-error');
    });

    it('applies success styling to helper text', () => {
      render(<Textarea helperText="Success message" state="success" />);
      expect(screen.getByText('Success message')).toHaveClass('text-status-success');
    });
  });
});
