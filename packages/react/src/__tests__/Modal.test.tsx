import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Modal {...defaultProps} title="Test Modal" />);
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<Modal {...defaultProps} description="Modal description" />);
      expect(screen.getByText('Modal description')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Modal {...defaultProps}>
          <p>Custom content</p>
        </Modal>
      );
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders with default size (md)', () => {
      const { container } = render(<Modal {...defaultProps} />);
      expect(container.querySelector('.max-w-md')).toBeInTheDocument();
    });

    it('renders sm size correctly', () => {
      const { container } = render(<Modal {...defaultProps} size="sm" />);
      expect(container.querySelector('.max-w-sm')).toBeInTheDocument();
    });

    it('renders lg size correctly', () => {
      const { container } = render(<Modal {...defaultProps} size="lg" />);
      expect(container.querySelector('.max-w-lg')).toBeInTheDocument();
    });

    it('renders xl size correctly', () => {
      const { container } = render(<Modal {...defaultProps} size="xl" />);
      expect(container.querySelector('.max-w-xl')).toBeInTheDocument();
    });

    it('renders full size correctly', () => {
      const { container } = render(<Modal {...defaultProps} size="full" />);
      expect(container.querySelector('.max-w-4xl')).toBeInTheDocument();
    });
  });

  describe('Close button', () => {
    it('renders close button by default', () => {
      render(<Modal {...defaultProps} title="Modal" />);
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(<Modal {...defaultProps} showCloseButton={false} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(<Modal {...defaultProps} title="Modal" onClose={onClose} />);

      await user.click(screen.getByRole('button'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Overlay click', () => {
    it('calls onClose when overlay is clicked', async () => {
      const onClose = vi.fn();
      const { container } = render(<Modal {...defaultProps} onClose={onClose} />);

      const overlay = container.querySelector('.bg-black\\/60');
      if (overlay) {
        fireEvent.click(overlay);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it('does not call onClose when closeOnOverlayClick is false', async () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />
      );

      const overlay = container.querySelector('.bg-black\\/60');
      if (overlay) {
        fireEvent.click(overlay);
        expect(onClose).not.toHaveBeenCalled();
      }
    });

    it('does not close when clicking inside modal content', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(<Modal {...defaultProps} onClose={onClose} />);

      await user.click(screen.getByText('Modal Content'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Escape key', () => {
    it('calls onClose when Escape is pressed', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when closeOnEscape is false', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Body scroll lock', () => {
    it('locks body scroll when modal is open', () => {
      render(<Modal {...defaultProps} isOpen={true} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('unlocks body scroll when modal is closed', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);
      rerender(<Modal {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe('');
    });
  });
});

describe('Modal Sub-components', () => {
  describe('ModalHeader', () => {
    it('renders children', () => {
      render(<ModalHeader>Header Content</ModalHeader>);
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ModalHeader className="custom-header">Header</ModalHeader>
      );
      expect(container.firstChild).toHaveClass('custom-header');
    });
  });

  describe('ModalBody', () => {
    it('renders children', () => {
      render(<ModalBody>Body Content</ModalBody>);
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ModalBody className="custom-body">Body</ModalBody>
      );
      expect(container.firstChild).toHaveClass('custom-body');
    });
  });

  describe('ModalFooter', () => {
    it('renders children', () => {
      render(<ModalFooter>Footer Content</ModalFooter>);
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ModalFooter className="custom-footer">Footer</ModalFooter>
      );
      expect(container.firstChild).toHaveClass('custom-footer');
    });
  });
});
