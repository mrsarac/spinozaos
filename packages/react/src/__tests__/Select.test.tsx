import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../components/Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const mockOptionsWithDisabled = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  describe('Rendering', () => {
    it('renders with placeholder', () => {
      render(<Select options={mockOptions} placeholder="Choose option" />);
      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    it('renders with default placeholder when none provided', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select options={mockOptions} label="Select Label" />);
      expect(screen.getByText('Select Label')).toBeInTheDocument();
    });

    it('renders with helperText', () => {
      render(<Select options={mockOptions} helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Select options={mockOptions} className="custom-class" />);
      const container = screen.getByRole('button').closest('.custom-class');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Select options={mockOptions} variant="default" />);
      expect(screen.getByRole('button')).toHaveClass('bg-void-light');
    });

    it('renders ghost variant', () => {
      render(<Select options={mockOptions} variant="ghost" />);
      expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    });

    it('renders glass variant', () => {
      render(<Select options={mockOptions} variant="glass" />);
      expect(screen.getByRole('button')).toHaveClass('backdrop-blur-md');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Select options={mockOptions} size="sm" />);
      expect(screen.getByRole('button')).toHaveClass('h-9');
    });

    it('renders medium size (default)', () => {
      render(<Select options={mockOptions} size="md" />);
      expect(screen.getByRole('button')).toHaveClass('h-10');
    });

    it('renders large size', () => {
      render(<Select options={mockOptions} size="lg" />);
      expect(screen.getByRole('button')).toHaveClass('h-12');
    });
  });

  describe('States', () => {
    it('renders default state', () => {
      render(<Select options={mockOptions} state="default" />);
      const trigger = screen.getByRole('button');
      expect(trigger).not.toHaveClass('border-status-error');
    });

    it('renders error state', () => {
      render(<Select options={mockOptions} state="error" />);
      expect(screen.getByRole('button')).toHaveClass('border-status-error/50');
    });

    it('renders success state', () => {
      render(<Select options={mockOptions} state="success" />);
      expect(screen.getByRole('button')).toHaveClass('border-status-success/50');
    });

    it('can be disabled', () => {
      render(<Select options={mockOptions} disabled />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });
    });

    it('closes dropdown when option is selected', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 1'));

      await waitFor(() => {
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
      });
    });

    it('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Option 1')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
      });
    });

    it('closes dropdown on click outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={mockOptions} />
          <button data-testid="outside-button">Outside</button>
        </div>
      );

      // Click the select trigger (first button in the select)
      const selectTrigger = screen.getAllByRole('button')[0];
      await user.click(selectTrigger);
      expect(screen.getByText('Option 1')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside-button'));

      await waitFor(() => {
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
      });
    });

    it('does not open when disabled', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} disabled />);

      await user.click(screen.getByRole('button'));

      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('shows selected option label', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      // Get the trigger button (first button)
      const trigger = screen.getAllByRole('button')[0];
      await user.click(trigger);
      await user.click(screen.getByText('Option 2'));

      // After selection, dropdown closes, only trigger remains
      await waitFor(() => {
        expect(screen.getAllByRole('button')[0]).toHaveTextContent('Option 2');
      });
    });

    it('calls onChange with selected value', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Select options={mockOptions} onChange={handleChange} />);

      const trigger = screen.getAllByRole('button')[0];
      await user.click(trigger);
      await user.click(screen.getByText('Option 2'));

      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('shows defaultValue on initial render', () => {
      render(<Select options={mockOptions} defaultValue="option2" />);
      expect(screen.getByRole('button')).toHaveTextContent('Option 2');
    });

    it('respects controlled value', () => {
      render(<Select options={mockOptions} value="option3" />);
      expect(screen.getByRole('button')).toHaveTextContent('Option 3');
    });

    it('does not select disabled options', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Select options={mockOptionsWithDisabled} onChange={handleChange} />);

      const trigger = screen.getAllByRole('button')[0];
      await user.click(trigger);
      await user.click(screen.getByText('Option 2'));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('highlights selected option in dropdown', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} defaultValue="option2" />);

      // Click the select trigger
      const trigger = document.querySelector('button[type="button"]');
      await user.click(trigger!);

      // Find the selected option button (Option 2)
      const optionButtons = document.querySelectorAll('[class*="bg-gold"]');
      expect(optionButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Disabled Options', () => {
    it('renders disabled options with correct styling', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptionsWithDisabled} />);

      await user.click(screen.getByRole('button'));

      const disabledOption = screen.getByText('Option 2').closest('button');
      expect(disabledOption).toBeDisabled();
      expect(disabledOption).toHaveClass('cursor-not-allowed');
    });
  });

  describe('Label State Styling', () => {
    it('applies error styling to label', () => {
      render(<Select options={mockOptions} label="Error Label" state="error" />);
      expect(screen.getByText('Error Label')).toHaveClass('text-status-error');
    });

    it('applies success styling to label', () => {
      render(<Select options={mockOptions} label="Success Label" state="success" />);
      expect(screen.getByText('Success Label')).toHaveClass('text-status-success');
    });
  });

  describe('Helper Text State Styling', () => {
    it('applies error styling to helper text', () => {
      render(<Select options={mockOptions} helperText="Error message" state="error" />);
      expect(screen.getByText('Error message')).toHaveClass('text-status-error');
    });

    it('applies success styling to helper text', () => {
      render(<Select options={mockOptions} helperText="Success message" state="success" />);
      expect(screen.getByText('Success message')).toHaveClass('text-status-success');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to container element', () => {
      const ref = vi.fn();
      render(<Select options={mockOptions} ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
