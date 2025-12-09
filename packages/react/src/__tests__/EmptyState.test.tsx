import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from 'lucide-react';
import {
  EmptyState,
  NoResults,
  NoData,
  ErrorState,
  NotFound,
} from '../components/EmptyState';

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('renders title', () => {
      render(<EmptyState title="No items found" />);
      expect(screen.getByText('No items found')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <EmptyState
          title="No items"
          description="Try adding some items"
        />
      );
      expect(screen.getByText('Try adding some items')).toBeInTheDocument();
    });

    it('renders with default icon', () => {
      render(<EmptyState title="Empty" />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders with custom icon', () => {
      render(<EmptyState title="No results" icon={Search} />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders action', () => {
      render(
        <EmptyState
          title="Empty"
          action={<button>Add Item</button>}
        />
      );
      expect(screen.getByText('Add Item')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<EmptyState title="Empty" className="custom-empty" />);
      expect(document.querySelector('.custom-empty')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<EmptyState title="Empty" variant="default" />);
      expect(document.querySelector('.text-center')).toBeInTheDocument();
    });

    it('renders bordered variant', () => {
      render(<EmptyState title="Empty" variant="bordered" />);
      expect(document.querySelector('.border')).toBeInTheDocument();
      expect(document.querySelector('.rounded-lg')).toBeInTheDocument();
    });

    it('renders subtle variant', () => {
      render(<EmptyState title="Empty" variant="subtle" />);
      expect(document.querySelector('.bg-transparent')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<EmptyState title="Empty" size="sm" />);
      expect(document.querySelector('.py-8')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<EmptyState title="Empty" size="md" />);
      expect(document.querySelector('.py-12')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<EmptyState title="Empty" size="lg" />);
      expect(document.querySelector('.py-16')).toBeInTheDocument();
    });
  });

  describe('Icon Color', () => {
    it('applies custom icon color', () => {
      render(<EmptyState title="Empty" iconColor="text-red-500" />);
      expect(document.querySelector('.text-red-500')).toBeInTheDocument();
    });

    it('applies default icon color', () => {
      render(<EmptyState title="Empty" />);
      expect(document.querySelector('.text-neutral-600')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('applies animation class when animated', () => {
      render(<EmptyState title="Empty" animated />);
      const container = document.querySelector('.animate-\\[fadeInUp_0\\.3s_ease-out\\]');
      expect(container).toBeInTheDocument();
    });

    it('does not apply animation class by default', () => {
      render(<EmptyState title="Empty" />);
      const container = document.querySelector('.animate-\\[fadeInUp_0\\.3s_ease-out\\]');
      expect(container).not.toBeInTheDocument();
    });
  });
});

describe('NoResults', () => {
  it('renders default title', () => {
    render(<NoResults />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders title with search term', () => {
    render(<NoResults searchTerm="test query" />);
    expect(screen.getByText('No results for "test query"')).toBeInTheDocument();
  });

  it('renders default description', () => {
    render(<NoResults />);
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
  });

  it('renders custom description', () => {
    render(<NoResults description="Custom description" />);
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('renders Search icon', () => {
    render(<NoResults />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});

describe('NoData', () => {
  it('renders default title', () => {
    render(<NoData />);
    expect(screen.getByText('No data yet')).toBeInTheDocument();
  });

  it('renders title with custom data type', () => {
    render(<NoData dataType="predictions" />);
    expect(screen.getByText('No predictions yet')).toBeInTheDocument();
  });

  it('renders default description', () => {
    render(<NoData />);
    expect(screen.getByText('Be the first to add data!')).toBeInTheDocument();
  });

  it('renders custom description', () => {
    render(<NoData description="Add your first item" />);
    expect(screen.getByText('Add your first item')).toBeInTheDocument();
  });

  it('renders Inbox icon', () => {
    render(<NoData />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});

describe('ErrorState', () => {
  it('renders default error message', () => {
    render(<ErrorState />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders custom error message', () => {
    render(<ErrorState error="Failed to load data" />);
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });

  it('renders default description', () => {
    render(<ErrorState />);
    expect(screen.getByText('An error occurred while loading data')).toBeInTheDocument();
  });

  it('renders custom description', () => {
    render(<ErrorState description="Please check your connection" />);
    expect(screen.getByText('Please check your connection')).toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided', () => {
    render(<ErrorState onRetry={() => {}} />);
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const handleRetry = vi.fn();
    const user = userEvent.setup();

    render(<ErrorState onRetry={handleRetry} />);

    await user.click(screen.getByText('Try Again'));
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('renders custom action instead of retry button', () => {
    render(<ErrorState action={<button>Custom Action</button>} />);
    expect(screen.getByText('Custom Action')).toBeInTheDocument();
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('renders AlertCircle icon with red color', () => {
    render(<ErrorState />);
    expect(document.querySelector('.text-red-400')).toBeInTheDocument();
  });
});

describe('NotFound', () => {
  it('renders default title', () => {
    render(<NotFound />);
    expect(screen.getByText('item not found')).toBeInTheDocument();
  });

  it('renders title with custom item type', () => {
    render(<NotFound itemType="User" />);
    expect(screen.getByText('User not found')).toBeInTheDocument();
  });

  it('renders default description', () => {
    render(<NotFound />);
    expect(screen.getByText("The item you're looking for doesn't exist")).toBeInTheDocument();
  });

  it('renders custom description', () => {
    render(<NotFound description="The page has been moved" />);
    expect(screen.getByText('The page has been moved')).toBeInTheDocument();
  });

  it('renders FileQuestion icon', () => {
    render(<NotFound />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
