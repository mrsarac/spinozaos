import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Avatar, AvatarGroup } from '../components/Avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders with image', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
      expect(img).toHaveAttribute('alt', 'User');
    });

    it('renders initials when no image', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders single letter initials for single name', () => {
      render(<Avatar name="John" />);
      expect(screen.getByText('JO')).toBeInTheDocument();
    });

    it('renders fallback when no image or name', () => {
      render(<Avatar />);
      // User icon from lucide-react is rendered
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders custom fallback', () => {
      render(<Avatar fallback={<span data-testid="custom-fallback">?</span>} />);
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Avatar className="custom-avatar" />);
      expect(document.querySelector('.custom-avatar')).toBeInTheDocument();
    });
  });

  describe('Image Fallback', () => {
    it('shows initials when image fails to load', async () => {
      render(<Avatar src="https://example.com/broken.jpg" name="Jane Doe" />);

      const img = screen.getByRole('img');
      fireEvent.error(img);

      // Component needs to re-render after error state updates
      await waitFor(() => {
        expect(screen.queryByText('JD')).toBeInTheDocument();
      });
    });

    it('shows fallback icon when image fails and no name', async () => {
      render(<Avatar src="https://example.com/broken.jpg" />);

      const img = screen.getByRole('img');
      fireEvent.error(img);

      // Component needs to re-render after error state updates
      await waitFor(() => {
        expect(document.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Sizes', () => {
    it('renders xs size', () => {
      render(<Avatar size="xs" name="AB" />);
      expect(document.querySelector('.w-6.h-6')).toBeInTheDocument();
    });

    it('renders sm size', () => {
      render(<Avatar size="sm" name="AB" />);
      expect(document.querySelector('.w-8.h-8')).toBeInTheDocument();
    });

    it('renders md size (default)', () => {
      render(<Avatar size="md" name="AB" />);
      expect(document.querySelector('.w-10.h-10')).toBeInTheDocument();
    });

    it('renders lg size', () => {
      render(<Avatar size="lg" name="AB" />);
      expect(document.querySelector('.w-12.h-12')).toBeInTheDocument();
    });

    it('renders xl size', () => {
      render(<Avatar size="xl" name="AB" />);
      expect(document.querySelector('.w-16.h-16')).toBeInTheDocument();
    });

    it('renders 2xl size', () => {
      render(<Avatar size="2xl" name="AB" />);
      expect(document.querySelector('.w-20.h-20')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Avatar variant="default" name="AB" />);
      expect(document.querySelector('.bg-white\\/10')).toBeInTheDocument();
    });

    it('renders oracle variant', () => {
      render(<Avatar variant="oracle" name="AB" />);
      expect(document.querySelector('.text-spinoza-yellow')).toBeInTheDocument();
    });

    it('renders cosmic variant', () => {
      render(<Avatar variant="cosmic" name="AB" />);
      expect(document.querySelector('.text-purple-400')).toBeInTheDocument();
    });

    it('renders teal variant', () => {
      render(<Avatar variant="teal" name="AB" />);
      expect(document.querySelector('.text-teal-400')).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Avatar variant="success" name="AB" />);
      expect(document.querySelector('.text-green-400')).toBeInTheDocument();
    });

    it('renders error variant', () => {
      render(<Avatar variant="error" name="AB" />);
      expect(document.querySelector('.text-red-400')).toBeInTheDocument();
    });

    it('renders gradient variant', () => {
      render(<Avatar variant="gradient" name="AB" />);
      expect(document.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    });
  });

  describe('Shapes', () => {
    it('renders circle shape', () => {
      render(<Avatar shape="circle" name="AB" />);
      expect(document.querySelector('.rounded-full')).toBeInTheDocument();
    });

    it('renders square shape (default)', () => {
      render(<Avatar shape="square" name="AB" />);
      expect(document.querySelector('.rounded-none')).toBeInTheDocument();
    });

    it('renders rounded shape', () => {
      render(<Avatar shape="rounded" name="AB" />);
      expect(document.querySelector('.rounded-lg')).toBeInTheDocument();
    });
  });

  describe('Highlighted', () => {
    it('applies highlight ring when highlighted', () => {
      render(<Avatar highlighted name="AB" />);
      expect(document.querySelector('.ring-2')).toBeInTheDocument();
    });
  });

  describe('Status Indicator', () => {
    it('renders online status', () => {
      render(<Avatar status="online" name="AB" />);
      expect(document.querySelector('.bg-green-500')).toBeInTheDocument();
    });

    it('renders offline status', () => {
      render(<Avatar status="offline" name="AB" />);
      expect(document.querySelector('.bg-neutral-500')).toBeInTheDocument();
    });

    it('renders away status', () => {
      render(<Avatar status="away" name="AB" />);
      expect(document.querySelector('.bg-yellow-500')).toBeInTheDocument();
    });

    it('renders busy status', () => {
      render(<Avatar status="busy" name="AB" />);
      expect(document.querySelector('.bg-red-500')).toBeInTheDocument();
    });

    it('does not render status indicator when not provided', () => {
      render(<Avatar name="AB" />);
      expect(document.querySelector('.bg-green-500')).not.toBeInTheDocument();
      expect(document.querySelector('.bg-neutral-500')).not.toBeInTheDocument();
    });
  });
});

describe('AvatarGroup', () => {
  describe('Rendering', () => {
    it('renders all avatars when under max', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );
      expect(screen.getByText('U1')).toBeInTheDocument();
      expect(screen.getByText('U2')).toBeInTheDocument();
      expect(screen.getByText('U3')).toBeInTheDocument();
    });

    it('shows overflow count when over max', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
        </AvatarGroup>
      );
      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <AvatarGroup className="custom-group">
          <Avatar name="User 1" />
        </AvatarGroup>
      );
      expect(document.querySelector('.custom-group')).toBeInTheDocument();
    });
  });

  describe('Spacing', () => {
    it('renders tight spacing', () => {
      render(
        <AvatarGroup spacing="tight">
          <Avatar name="User 1" />
          <Avatar name="User 2" />
        </AvatarGroup>
      );
      expect(document.querySelector('.-space-x-3')).toBeInTheDocument();
    });

    it('renders normal spacing (default)', () => {
      render(
        <AvatarGroup spacing="normal">
          <Avatar name="User 1" />
          <Avatar name="User 2" />
        </AvatarGroup>
      );
      expect(document.querySelector('.-space-x-2')).toBeInTheDocument();
    });

    it('renders loose spacing', () => {
      render(
        <AvatarGroup spacing="loose">
          <Avatar name="User 1" />
          <Avatar name="User 2" />
        </AvatarGroup>
      );
      expect(document.querySelector('.-space-x-1')).toBeInTheDocument();
    });
  });

  describe('Size Propagation', () => {
    it('applies size to all avatars', () => {
      render(
        <AvatarGroup size="lg">
          <Avatar name="User 1" />
          <Avatar name="User 2" />
        </AvatarGroup>
      );
      const avatars = document.querySelectorAll('.w-12.h-12');
      expect(avatars.length).toBeGreaterThan(0);
    });
  });

  describe('No Max', () => {
    it('shows all avatars when max is not set', () => {
      render(
        <AvatarGroup>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
          <Avatar name="User 5" />
        </AvatarGroup>
      );
      expect(screen.getByText('U1')).toBeInTheDocument();
      expect(screen.getByText('U5')).toBeInTheDocument();
      expect(screen.queryByText('+')).not.toBeInTheDocument();
    });
  });
});
