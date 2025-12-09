import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Input,
  Modal,
  Select,
  Toast,
  Button,
  Checkbox,
  Toggle,
  Textarea,
} from '../index';

describe('Accessibility Tests', () => {
  describe('Input', () => {
    it('associates label with input via htmlFor/id', () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('generates unique id when not provided', () => {
      render(<Input label="Name" />);
      const label = screen.getByText('Name');
      const input = screen.getByRole('textbox');
      const labelFor = label.getAttribute('for');
      expect(labelFor).toBeTruthy();
      expect(input).toHaveAttribute('id', labelFor);
    });

    it('sets aria-invalid on error state', () => {
      render(<Input state="error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid on default state', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('associates helperText with input via aria-describedby', () => {
      render(<Input helperText="Enter your email address" id="email" />);
      const input = screen.getByRole('textbox');
      const helper = screen.getByText('Enter your email address');
      expect(input).toHaveAttribute('aria-describedby', 'email-helper');
      expect(helper).toHaveAttribute('id', 'email-helper');
    });
  });

  describe('Modal', () => {
    it('has role="dialog"', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby pointing to title', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      const labelledBy = dialog.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      const title = document.getElementById(labelledBy!);
      expect(title).toHaveTextContent('Test Modal');
    });

    it('has aria-describedby pointing to description', () => {
      render(
        <Modal
          isOpen={true}
          onClose={() => {}}
          title="Test Modal"
          description="This is a description"
        >
          Content
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      const describedBy = dialog.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const description = document.getElementById(describedBy!);
      expect(description).toHaveTextContent('This is a description');
    });

    it('close button has aria-label', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );
      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      expect(closeButton).toBeInTheDocument();
    });

    it('traps focus within modal', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <input data-testid="input1" />
          <button data-testid="button1">Button</button>
        </Modal>
      );

      // Focus should start on first focusable element
      await waitFor(() => {
        expect(document.activeElement).toBe(
          screen.getByRole('button', { name: 'Close modal' })
        );
      });

      // Tab through elements
      await user.tab();
      expect(document.activeElement).toBe(screen.getByTestId('input1'));

      await user.tab();
      expect(document.activeElement).toBe(screen.getByTestId('button1'));

      // Should wrap back to close button
      await user.tab();
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Close modal' })
      );
    });

    it('overlay has aria-hidden', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );
      // The overlay should have aria-hidden
      const overlay = document.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Select', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3', disabled: true },
    ];

    it('has role="combobox"', () => {
      render(<Select options={options} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('has aria-haspopup="listbox"', () => {
      render(<Select options={options} />);
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-haspopup',
        'listbox'
      );
    });

    it('has aria-expanded="false" when closed', () => {
      render(<Select options={options} />);
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('has aria-expanded="true" when open', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('has aria-controls pointing to listbox', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      const combobox = screen.getByRole('combobox');
      const listboxId = combobox.getAttribute('aria-controls');
      expect(listboxId).toBeTruthy();

      await user.click(combobox);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('id', listboxId);
    });

    it('has aria-invalid on error state', () => {
      render(<Select options={options} state="error" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('options have role="option"', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      await user.click(screen.getByRole('combobox'));

      const optionElements = screen.getAllByRole('option');
      expect(optionElements).toHaveLength(3);
    });

    it('selected option has aria-selected="true"', async () => {
      const user = userEvent.setup();
      render(<Select options={options} defaultValue="2" />);

      await user.click(screen.getByRole('combobox'));

      const selectedOption = screen.getByRole('option', { name: 'Option 2' });
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });

    it('disabled options have aria-disabled="true"', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      await user.click(screen.getByRole('combobox'));

      const disabledOption = screen.getByRole('option', { name: 'Option 3' });
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports keyboard navigation with arrow keys', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      const combobox = screen.getByRole('combobox');
      await user.click(combobox);

      // Arrow down should move focus
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      // Third option is disabled, should stay on second

      // Enter should select focused option
      await user.keyboard('{Enter}');

      expect(combobox).toHaveTextContent('Option 2');
    });

    it('closes on Escape key', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Toast', () => {
    it('has role="status" for info/success/default variants', () => {
      render(<Toast title="Info message" variant="info" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has role="alert" for error variant', () => {
      render(<Toast title="Error message" variant="error" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('has role="alert" for warning variant', () => {
      render(<Toast title="Warning message" variant="warning" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('has aria-live="polite" for non-urgent toasts', () => {
      render(<Toast title="Info message" variant="info" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });

    it('has aria-live="assertive" for urgent toasts', () => {
      render(<Toast title="Error message" variant="error" />);
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
    });

    it('has aria-atomic="true"', () => {
      render(<Toast title="Message" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-atomic', 'true');
    });

    it('close button has aria-label', () => {
      render(<Toast title="Message" onClose={() => {}} />);
      const closeButton = screen.getByRole('button', {
        name: 'Dismiss notification',
      });
      expect(closeButton).toBeInTheDocument();
    });

    it('icon has aria-hidden', () => {
      render(<Toast title="Message" variant="success" />);
      const iconContainer = document.querySelector('[aria-hidden="true"]');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('Button', () => {
    it('has correct focus ring', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus-visible:ring-2');
    });

    it('disabled button has aria-disabled behavior', () => {
      render(<Button disabled>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Checkbox', () => {
    it('has role="checkbox"', () => {
      render(<Checkbox />);
      // The button element has role="checkbox" (there's also a hidden native checkbox)
      const checkboxes = screen.getAllByRole('checkbox');
      // One is the hidden native, one is the visible button
      expect(checkboxes.length).toBeGreaterThanOrEqual(1);
    });

    it('has aria-checked reflecting state', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);

      // Get the button checkbox (the interactive one with aria-checked)
      const checkbox = screen.getAllByRole('checkbox').find(
        el => el.hasAttribute('aria-checked')
      )!;
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('has visible focus ring', () => {
      render(<Checkbox />);
      // The checkbox button has focus ring classes
      const checkbox = screen.getAllByRole('checkbox').find(
        el => el.hasAttribute('aria-checked')
      )!;
      expect(checkbox.className).toContain('focus:');
    });
  });

  describe('Toggle', () => {
    it('has role="switch"', () => {
      render(<Toggle />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('has aria-checked reflecting state', async () => {
      const user = userEvent.setup();
      render(<Toggle />);

      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');

      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Textarea', () => {
    it('associates label with textarea', () => {
      render(<Textarea label="Description" id="desc" />);
      const label = screen.getByText('Description');
      const textarea = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', 'desc');
      expect(textarea).toHaveAttribute('id', 'desc');
    });

    it('sets aria-invalid on error state', () => {
      render(<Textarea state="error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
