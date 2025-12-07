import type { Meta, StoryObj } from '@storybook/react';
import {
  EmptyState,
  NoResults,
  NoData,
  ErrorState,
  NotFound,
  Button,
} from '@spinozaos/react';
import { Trophy, FileText, MessageSquare, Inbox } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Empty/zero state display. Extracted from Substance Leaderboard patterns.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'subtle'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// Basic EmptyState
export const Default: Story = {
  args: {
    title: 'No items yet',
    description: 'Get started by creating your first item.',
    icon: Inbox,
  },
};

// With Action Button
export const WithAction: Story = {
  args: {
    title: 'No predictions yet',
    description: 'Be the first to make a prediction!',
    icon: Trophy,
    action: (
      <Button variant="primary" size="sm">
        Make Prediction
      </Button>
    ),
  },
};

// Animated
export const Animated: Story = {
  args: {
    title: 'No data available',
    description: 'Check back later for updates.',
    icon: FileText,
    animated: true,
  },
};

// All Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <EmptyState
        title="Default Variant"
        description="Standard empty state"
        variant="default"
      />
      <EmptyState
        title="Bordered Variant"
        description="With border and background"
        variant="bordered"
      />
      <EmptyState
        title="Subtle Variant"
        description="Transparent background"
        variant="subtle"
      />
    </div>
  ),
};

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <EmptyState
        title="Small Size"
        description="Compact empty state"
        size="sm"
        variant="bordered"
      />
      <EmptyState
        title="Medium Size"
        description="Default empty state"
        size="md"
        variant="bordered"
      />
      <EmptyState
        title="Large Size"
        description="Spacious empty state"
        size="lg"
        variant="bordered"
      />
    </div>
  ),
};

// No Results Preset
export const NoResultsPreset: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <NoResults searchTerm="quantum computing" />
      <NoResults description="Try broadening your search criteria" />
    </div>
  ),
};

// No Data Preset
export const NoDataPreset: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <NoData dataType="predictions" />
      <NoData
        dataType="comments"
        action={
          <Button variant="secondary" size="sm">
            Start Discussion
          </Button>
        }
      />
    </div>
  ),
};

// Error State Preset
export const ErrorStatePreset: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <ErrorState error="Failed to load predictions" onRetry={() => alert('Retrying...')} />
      <ErrorState
        error="Network Error"
        description="Please check your internet connection and try again."
        action={
          <Button variant="primary" size="sm">
            Reload Page
          </Button>
        }
      />
    </div>
  ),
};

// Not Found Preset
export const NotFoundPreset: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <NotFound itemType="Market" />
      <NotFound
        itemType="User"
        description="The profile may have been deleted or is private."
        action={
          <Button variant="secondary" size="sm">
            Go to Home
          </Button>
        }
      />
    </div>
  ),
};

// In Context - Leaderboard Empty
export const LeaderboardContext: Story = {
  render: () => (
    <div className="max-w-lg border border-white/10">
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Trophy size={20} className="text-spinoza-yellow" />
          <h2 className="text-lg font-serif text-white">Leaderboard</h2>
        </div>
      </div>
      <NoData
        dataType="predictions"
        size="lg"
        action={
          <Button variant="primary" size="sm">
            Make First Prediction
          </Button>
        }
      />
    </div>
  ),
};

// In Context - Search Results Empty
export const SearchContext: Story = {
  render: () => (
    <div className="max-w-lg p-6 bg-neutral-900/50 border border-white/10">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search predictions..."
          className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-neutral-500"
          defaultValue="xyz123"
        />
      </div>
      <NoResults
        searchTerm="xyz123"
        description="Try adjusting your search terms or browse all predictions."
        action={
          <Button variant="secondary" size="sm">
            Browse All
          </Button>
        }
      />
    </div>
  ),
};

// In Context - Comments Section
export const CommentsContext: Story = {
  render: () => (
    <div className="max-w-lg border border-white/10">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <MessageSquare size={16} className="text-neutral-500" />
        <span className="text-sm font-mono text-neutral-400 uppercase">Comments</span>
        <span className="text-xs text-neutral-600">(0)</span>
      </div>
      <EmptyState
        icon={MessageSquare}
        iconColor="text-neutral-600"
        title="No comments yet"
        description="Start the conversation!"
        size="md"
        action={
          <Button variant="ghost" size="sm">
            Add Comment
          </Button>
        }
      />
    </div>
  ),
};
