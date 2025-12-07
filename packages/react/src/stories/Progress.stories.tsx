import type { Meta, StoryObj } from '@storybook/react';
import { Progress, Spinner, LoadingDots, Skeleton } from '../components/Progress';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'oracle', 'success', 'error', 'gradient'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    label: 'Upload progress',
    showValue: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Progress value={60} variant="default" label="Default" showValue />
      <Progress value={60} variant="oracle" label="Oracle" showValue />
      <Progress value={60} variant="success" label="Success" showValue />
      <Progress value={60} variant="error" label="Error" showValue />
      <Progress value={60} variant="gradient" label="Gradient" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Progress value={60} size="sm" label="Small" />
      <Progress value={60} size="md" label="Medium" />
      <Progress value={60} size="lg" label="Large" />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading...',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    variant: 'success',
    label: 'Complete',
    showValue: true,
  },
};

// Spinner stories
export const SpinnerDefault: Story = {
  render: () => <Spinner />,
  name: 'Spinner - Default',
};

export const SpinnerWithLabel: Story = {
  render: () => <Spinner label="Loading..." />,
  name: 'Spinner - With Label',
};

export const SpinnerVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spinner variant="default" label="Default" />
      <Spinner variant="oracle" label="Oracle" />
      <Spinner variant="white" label="White" />
      <Spinner variant="success" label="Success" />
    </div>
  ),
  name: 'Spinner - Variants',
};

export const SpinnerSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
  name: 'Spinner - Sizes',
};

// Loading Dots stories
export const LoadingDotsDefault: Story = {
  render: () => <LoadingDots />,
  name: 'Loading Dots - Default',
};

export const LoadingDotsVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <LoadingDots variant="default" />
      <LoadingDots variant="oracle" />
      <LoadingDots variant="white" />
    </div>
  ),
  name: 'Loading Dots - Variants',
};

export const LoadingDotsSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <LoadingDots size="sm" />
      <LoadingDots size="md" />
      <LoadingDots size="lg" />
    </div>
  ),
  name: 'Loading Dots - Sizes',
};

// Skeleton stories
export const SkeletonDefault: Story = {
  render: () => <Skeleton width="100%" height={20} />,
  name: 'Skeleton - Default',
};

export const SkeletonCard: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
      <Skeleton width={48} height={48} rounded="full" />
      <Skeleton width="70%" height={16} />
      <Skeleton width="100%" height={12} />
      <Skeleton width="85%" height={12} />
    </div>
  ),
  name: 'Skeleton - Card Layout',
};

export const SkeletonText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Skeleton width="100%" height={16} />
      <Skeleton width="90%" height={16} />
      <Skeleton width="95%" height={16} />
      <Skeleton width="60%" height={16} />
    </div>
  ),
  name: 'Skeleton - Text Block',
};
