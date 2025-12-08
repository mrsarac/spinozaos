import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastContainer } from '../components/Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders with title', () => {
      render(<Toast title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Toast description="Test description" />);
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders with both title and description', () => {
      render(<Toast title="Title" description="Description" />);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('renders custom action', () => {
      render(<Toast action={<button>Undo</button>} />);
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(<Toast title="Default" />);
      expect(container.firstChild).toHaveClass('border-white/10');
    });

    it('renders success variant', () => {
      const { container } = render(<Toast variant="success" title="Success" />);
      expect(container.firstChild).toHaveClass('border-success/30');
      expect(container.firstChild).toHaveClass('bg-success/5');
    });

    it('renders error variant', () => {
      const { container } = render(<Toast variant="error" title="Error" />);
      expect(container.firstChild).toHaveClass('border-error/30');
      expect(container.firstChild).toHaveClass('bg-error/5');
    });

    it('renders warning variant', () => {
      const { container } = render(<Toast variant="warning" title="Warning" />);
      expect(container.firstChild).toHaveClass('border-warning/30');
      expect(container.firstChild).toHaveClass('bg-warning/5');
    });

    it('renders info variant', () => {
      const { container } = render(<Toast variant="info" title="Info" />);
      expect(container.firstChild).toHaveClass('border-info/30');
      expect(container.firstChild).toHaveClass('bg-info/5');
    });
  });

  describe('Icons', () => {
    it('renders default icon for each variant', () => {
      const { container } = render(<Toast variant="success" title="Success" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      render(<Toast icon={<span data-testid="custom-icon">*</span>} title="Custom" />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Close button', () => {
    it('renders close button when onClose is provided', () => {
      render(<Toast title="Closable" onClose={() => {}} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('does not render close button when onClose is not provided', () => {
      render(<Toast title="Not closable" />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      vi.useRealTimers(); // Use real timers for user interaction
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(<Toast title="Closable" onClose={onClose} />);

      const closeButton = screen.getByRole('button');
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
      vi.useFakeTimers(); // Restore fake timers
    });
  });

  describe('Auto dismiss', () => {
    it('calls onClose after duration', () => {
      const onClose = vi.fn();
      render(<Toast title="Auto dismiss" onClose={onClose} duration={3000} />);

      expect(onClose).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('uses default duration of 5000ms', () => {
      const onClose = vi.fn();
      render(<Toast title="Default duration" onClose={onClose} />);

      act(() => {
        vi.advanceTimersByTime(4999);
      });
      expect(onClose).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not auto dismiss if onClose is not provided', () => {
      render(<Toast title="No auto dismiss" duration={1000} />);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Should still be in the document
      expect(screen.getByText('No auto dismiss')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('merges custom className', () => {
      const { container } = render(<Toast className="custom-toast" title="Custom" />);
      expect(container.firstChild).toHaveClass('custom-toast');
      expect(container.firstChild).toHaveClass('relative'); // Default class
    });
  });
});

describe('ToastContainer', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(
        <ToastContainer>
          <Toast title="Toast 1" />
          <Toast title="Toast 2" />
        </ToastContainer>
      );
      expect(screen.getByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
    });
  });

  describe('Positioning', () => {
    it('positions at bottom-right by default', () => {
      const { container } = render(
        <ToastContainer>
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('bottom-4', 'right-4');
    });

    it('positions at top-right', () => {
      const { container } = render(
        <ToastContainer position="top-right">
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('top-4', 'right-4');
    });

    it('positions at top-left', () => {
      const { container } = render(
        <ToastContainer position="top-left">
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('top-4', 'left-4');
    });

    it('positions at bottom-left', () => {
      const { container } = render(
        <ToastContainer position="bottom-left">
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('bottom-4', 'left-4');
    });

    it('positions at top-center', () => {
      const { container } = render(
        <ToastContainer position="top-center">
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('top-4', 'left-1/2');
    });

    it('positions at bottom-center', () => {
      const { container } = render(
        <ToastContainer position="bottom-center">
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('bottom-4', 'left-1/2');
    });
  });

  describe('Styling', () => {
    it('has fixed positioning', () => {
      const { container } = render(
        <ToastContainer>
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('fixed');
    });

    it('has high z-index', () => {
      const { container } = render(
        <ToastContainer>
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('z-50');
    });

    it('stacks toasts with gap', () => {
      const { container } = render(
        <ToastContainer>
          <Toast title="Test" />
        </ToastContainer>
      );
      expect(container.firstChild).toHaveClass('gap-2');
    });
  });
});
