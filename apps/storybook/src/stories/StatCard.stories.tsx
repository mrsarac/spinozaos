import type { Meta, StoryObj } from '@storybook/react';
import { StatCard, StatGrid, QuickStats } from '@spinozaos/react';
import { Users, Target, TrendingUp, Flame, Trophy, Activity } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Statistics display card. Extracted from Substance Leaderboard patterns.',
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
      options: ['default', 'bordered', 'elevated', 'gradient'],
    },
    valueColor: {
      control: 'select',
      options: ['default', 'yellow', 'teal', 'purple', 'green', 'red'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// Basic StatCard
export const Default: Story = {
  args: {
    label: 'Total Users',
    value: '12,847',
    icon: Users,
  },
};

// With Color
export const WithColor: Story = {
  args: {
    label: 'Accuracy',
    value: '89%',
    valueColor: 'green',
    icon: Target,
  },
};

// With Trend
export const WithTrend: Story = {
  args: {
    label: 'Predictions',
    value: '1,234',
    icon: TrendingUp,
    trend: 'up',
    trendValue: '+12%',
  },
};

// Animated
export const Animated: Story = {
  args: {
    label: 'Live Score',
    value: '94%',
    icon: Activity,
    valueColor: 'teal',
    animated: true,
  },
};

// All Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      <StatCard label="Default" value="100" variant="default" icon={Activity} />
      <StatCard label="Bordered" value="200" variant="bordered" icon={Activity} />
      <StatCard label="Elevated" value="300" variant="elevated" icon={Activity} />
      <StatCard label="Gradient" value="400" variant="gradient" icon={Activity} />
    </div>
  ),
};

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <StatCard label="Small" value="123" size="sm" icon={Activity} variant="bordered" />
      <StatCard label="Medium" value="456" size="md" icon={Activity} variant="bordered" />
      <StatCard label="Large" value="789" size="lg" icon={Activity} variant="bordered" />
    </div>
  ),
};

// All Value Colors
export const ValueColors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-lg">
      <StatCard label="Default" value="100" valueColor="default" />
      <StatCard label="Yellow" value="200" valueColor="yellow" />
      <StatCard label="Teal" value="300" valueColor="teal" />
      <StatCard label="Purple" value="400" valueColor="purple" />
      <StatCard label="Green" value="500" valueColor="green" />
      <StatCard label="Red" value="600" valueColor="red" />
    </div>
  ),
};

// With Tooltip
export const WithTooltip: Story = {
  args: {
    label: 'Confidence',
    value: '73%',
    icon: Target,
    tooltip: 'Average confidence level across all predictions',
    valueColor: 'yellow',
  },
};

// Loading State
export const Loading: Story = {
  args: {
    label: 'Loading...',
    value: '',
    icon: Activity,
    loading: true,
  },
};

// Stat Grid
export const Grid: Story = {
  render: () => (
    <StatGrid columns={4}>
      <StatCard label="Predictors" value="1,234" icon={Users} />
      <StatCard label="Predictions" value="45,678" icon={Target} />
      <StatCard label="Markets" value="89" icon={TrendingUp} />
      <StatCard label="Avg Confidence" value="67%" icon={Flame} />
    </StatGrid>
  ),
};

// Quick Stats Preset
export const QuickStatsPreset: Story = {
  render: () => (
    <QuickStats
      stats={[
        { label: 'Users', value: '12.8K', icon: Users },
        { label: 'Predictions', value: '45.6K', icon: Target },
        { label: 'Markets', value: '89', icon: TrendingUp },
        { label: 'Accuracy', value: '73%', icon: Flame, tooltip: 'Average accuracy' },
      ]}
    />
  ),
};

// In Context - Leaderboard Stats Bar
export const LeaderboardContext: Story = {
  render: () => (
    <div className="max-w-2xl border border-white/10">
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Trophy size={20} className="text-spinoza-yellow" />
          <h2 className="text-lg font-serif text-white">Leaderboard</h2>
        </div>
      </div>
      <StatGrid columns={4} gap="none">
        <StatCard
          label="Predictors"
          value="1,234"
          icon={Users}
          tooltip="Total number of users who made predictions"
        />
        <StatCard
          label="Predictions"
          value="45,678"
          icon={Target}
          tooltip="Total predictions made"
        />
        <StatCard
          label="Markets"
          value="89"
          icon={TrendingUp}
          tooltip="Active prediction markets"
        />
        <StatCard
          label="Avg Confidence"
          value="67%"
          icon={Flame}
          tooltip="Average confidence across all predictions"
        />
      </StatGrid>
    </div>
  ),
};
