import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../components/Tooltip';

// Mock timers for delay testing
beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('Tooltip', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('does not show tooltip initially', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Show/Hide Behavior', () => {
    it('shows tooltip on mouse enter after delay', async () => {
      render(
        <Tooltip content="Tooltip text" delay={200}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(250);
      });

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      });
    });

    it('hides tooltip on mouse leave', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await act(async () => {
        await userEvent.unhover(button);
        vi.advanceTimersByTime(200);
      });

      // Tooltip animates out (opacity 0) before being removed from DOM
      await waitFor(() => {
        const tooltip = screen.queryByRole('tooltip');
        // Either not in document or has opacity 0 (animating out)
        expect(tooltip === null || tooltip.style.opacity === '0').toBe(true);
      });
    });

    it('does not show tooltip if mouse leaves before delay', async () => {
      render(
        <Tooltip content="Tooltip text" delay={500}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(100);
        await userEvent.unhover(button);
        vi.advanceTimersByTime(500);
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Focus Behavior', () => {
    it('shows tooltip on focus', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button>Focus me</button>
        </Tooltip>
      );

      const button = screen.getByText('Focus me');

      await act(async () => {
        button.focus();
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('hides tooltip on blur', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button>Focus me</button>
        </Tooltip>
      );

      const button = screen.getByText('Focus me');

      await act(async () => {
        button.focus();
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await act(async () => {
        button.blur();
        vi.advanceTimersByTime(200);
      });

      // Tooltip animates out (opacity 0) before being removed from DOM
      await waitFor(() => {
        const tooltip = screen.queryByRole('tooltip');
        // Either not in document or has opacity 0 (animating out)
        expect(tooltip === null || tooltip.style.opacity === '0').toBe(true);
      });
    });
  });

  describe('Positions', () => {
    it('renders with top position (default)', async () => {
      render(
        <Tooltip content="Tooltip text" position="top" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('bottom-full');
      });
    });

    it('renders with bottom position', async () => {
      render(
        <Tooltip content="Tooltip text" position="bottom" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('top-full');
      });
    });

    it('renders with left position', async () => {
      render(
        <Tooltip content="Tooltip text" position="left" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('right-full');
      });
    });

    it('renders with right position', async () => {
      render(
        <Tooltip content="Tooltip text" position="right" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('left-full');
      });
    });
  });

  describe('Variants', () => {
    it('renders default variant', async () => {
      render(
        <Tooltip content="Tooltip text" variant="default" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('bg-void-lighter');
      });
    });

    it('renders dark variant', async () => {
      render(
        <Tooltip content="Tooltip text" variant="dark" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('bg-black');
      });
    });

    it('renders light variant', async () => {
      render(
        <Tooltip content="Tooltip text" variant="light" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('bg-white');
        expect(tooltip).toHaveClass('text-void');
      });
    });
  });

  describe('Content Types', () => {
    it('renders string content', async () => {
      render(
        <Tooltip content="Simple text" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(screen.getByText('Simple text')).toBeInTheDocument();
      });
    });

    it('renders JSX content', async () => {
      render(
        <Tooltip content={<span data-testid="jsx-content">JSX Content</span>} delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(screen.getByTestId('jsx-content')).toBeInTheDocument();
      });
    });
  });

  describe('Custom Delay', () => {
    it('respects custom delay', async () => {
      render(
        <Tooltip content="Tooltip text" delay={500}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(300);
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct role', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');

      await act(async () => {
        await userEvent.hover(button);
        vi.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });
});
