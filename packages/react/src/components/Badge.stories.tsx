import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'error', 'warning', 'info', 'oracle', 'solid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'DEFAULT',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'ACTIVE',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'COMPLETE',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'FAILED',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'PENDING',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'INFO',
  },
};

export const Oracle: Story = {
  args: {
    variant: 'oracle',
    children: 'ORACLE',
  },
};

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'NEW',
  },
};

export const WithDot: Story = {
  args: {
    variant: 'success',
    children: 'ONLINE',
    dot: true,
  },
};

export const WithPulsingDot: Story = {
  args: {
    variant: 'success',
    children: 'LIVE',
    dot: true,
    pulse: true,
  },
};

export const Animated: Story = {
  args: {
    variant: 'primary',
    children: 'ANIMATED',
    animated: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">DEFAULT</Badge>
      <Badge variant="primary">PRIMARY</Badge>
      <Badge variant="success">SUCCESS</Badge>
      <Badge variant="error">ERROR</Badge>
      <Badge variant="warning">WARNING</Badge>
      <Badge variant="info">INFO</Badge>
      <Badge variant="oracle">ORACLE</Badge>
      <Badge variant="solid">SOLID</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">SMALL</Badge>
      <Badge size="md">MEDIUM</Badge>
      <Badge size="lg">LARGE</Badge>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant="success" dot pulse>ACTIVE</Badge>
        <span className="text-neutral-400">Server is running</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="warning" dot>PENDING</Badge>
        <span className="text-neutral-400">Deployment in progress</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="error" dot>OFFLINE</Badge>
        <span className="text-neutral-400">Connection lost</span>
      </div>
    </div>
  ),
};
