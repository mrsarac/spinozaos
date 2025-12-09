import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PeriodTabs,
} from '../components/Tabs';

describe('Tabs', () => {
  describe('Rendering', () => {
    it('renders tab triggers', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
    });

    it('renders tab content for active tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1" className="custom-tabs">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(document.querySelector('.custom-tabs')).toBeInTheDocument();
    });
  });

  describe('Tab Switching', () => {
    it('switches content when clicking tabs', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();

      await user.click(screen.getByText('Tab 2'));

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('calls onValueChange when tab changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1" onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      await user.click(screen.getByText('Tab 2'));
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled value', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(
        <Tabs value="tab1" onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      await user.click(screen.getByText('Tab 2'));
      expect(handleChange).toHaveBeenCalledWith('tab2');

      // Content should not change since we control value
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      // Update controlled value
      rerender(
        <Tabs value="tab2" onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('TabsList Variants', () => {
    it('renders default variant', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList variant="default">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(document.querySelector('[role="tablist"]')).toHaveClass('gap-2');
    });

    it('renders pills variant', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList variant="pills">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(document.querySelector('[role="tablist"]')).toHaveClass('gap-1');
    });

    it('renders underline variant', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(document.querySelector('[role="tablist"]')).toHaveClass('border-b');
    });

    it('renders segment variant', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList variant="segment">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(document.querySelector('[role="tablist"]')).toHaveClass('bg-neutral-900');
    });
  });

  describe('TabsTrigger Sizes', () => {
    it('renders small size', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList size="sm">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(screen.getByRole('tab')).toHaveClass('text-[10px]');
    });

    it('renders medium size (default)', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList size="md">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(screen.getByRole('tab')).toHaveClass('text-xs');
    });

    it('renders large size', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList size="lg">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(screen.getByRole('tab')).toHaveClass('text-sm');
    });
  });

  describe('TabsTrigger Styling', () => {
    it('applies active state styling', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const activeTab = screen.getByText('Tab 1');
      expect(activeTab).toHaveAttribute('data-state', 'active');

      const inactiveTab = screen.getByText('Tab 2');
      expect(inactiveTab).toHaveAttribute('data-state', 'inactive');
    });
  });

  describe('TabsContent Animation', () => {
    it('applies animation class when animated', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" animated>
            Content 1
          </TabsContent>
        </Tabs>
      );
      expect(screen.getByRole('tabpanel')).toHaveClass('animate-[fadeInUp_0.2s_ease-out]');
    });

    it('does not apply animation class by default', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );
      expect(screen.getByRole('tabpanel')).not.toHaveClass('animate-[fadeInUp_0.2s_ease-out]');
    });
  });

  describe('Accessibility', () => {
    it('has correct roles', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('has correct aria-selected attribute', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'false');

      await user.click(screen.getByText('Tab 2'));

      expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'true');
    });
  });
});

describe('PeriodTabs', () => {
  it('renders period options', () => {
    render(<PeriodTabs value="all" onChange={() => {}} />);
    expect(screen.getByText('All Time')).toBeInTheDocument();
    expect(screen.getByText('This Month')).toBeInTheDocument();
    expect(screen.getByText('This Week')).toBeInTheDocument();
  });

  it('calls onChange with selected period', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<PeriodTabs value="all" onChange={handleChange} />);

    await user.click(screen.getByText('This Month'));
    expect(handleChange).toHaveBeenCalledWith('month');
  });

  it('highlights active period', () => {
    render(<PeriodTabs value="month" onChange={() => {}} />);
    expect(screen.getByText('This Month')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('All Time')).toHaveAttribute('data-state', 'inactive');
  });

  it('accepts custom labels', () => {
    render(
      <PeriodTabs
        value="all"
        onChange={() => {}}
        labels={{ all: 'Lifetime', month: 'Monthly', week: 'Weekly' }}
      />
    );
    expect(screen.getByText('Lifetime')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
  });
});
