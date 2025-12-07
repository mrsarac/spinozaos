import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '@spinozaos/react';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'User avatar with fallback initials. Extracted from Substance Leaderboard patterns.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'oracle', 'cosmic', 'teal', 'success', 'error', 'gradient'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic Avatar
export const Default: Story = {
  args: {
    name: 'Mustafa Sarac',
    size: 'md',
    variant: 'default',
    shape: 'square',
  },
};

// With Image
export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    name: 'Felix',
    size: 'lg',
  },
};

// All Variants
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Default" variant="default" />
      <Avatar name="Oracle" variant="oracle" />
      <Avatar name="Cosmic" variant="cosmic" />
      <Avatar name="Teal" variant="teal" />
      <Avatar name="Success" variant="success" />
      <Avatar name="Error" variant="error" />
      <Avatar name="Gradient" variant="gradient" />
    </div>
  ),
};

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
      <Avatar name="2X" size="2xl" />
    </div>
  ),
};

// All Shapes
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Circle" shape="circle" />
      <Avatar name="Square" shape="square" />
      <Avatar name="Rounded" shape="rounded" />
    </div>
  ),
};

// With Status
export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Online" status="online" />
      <Avatar name="Away" status="away" />
      <Avatar name="Busy" status="busy" />
      <Avatar name="Offline" status="offline" />
    </div>
  ),
};

// Highlighted
export const Highlighted: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Normal" />
      <Avatar name="Highlighted" highlighted variant="oracle" />
    </div>
  ),
};

// Avatar Group
export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      <Avatar name="Alice Smith" />
      <Avatar name="Bob Johnson" />
      <Avatar name="Carol Williams" />
      <Avatar name="David Brown" />
      <Avatar name="Eva Martinez" />
      <Avatar name="Frank Garcia" />
    </AvatarGroup>
  ),
};

// Avatar Group with Images
export const GroupWithImages: Story = {
  render: () => (
    <AvatarGroup max={5} spacing="tight">
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" name="Alice" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" name="Bob" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carol" name="Carol" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" name="David" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Eva" name="Eva" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Frank" name="Frank" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Grace" name="Grace" />
    </AvatarGroup>
  ),
};

// In Context - Leaderboard Entry
export const LeaderboardEntry: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-white/10 max-w-md">
      <span className="text-neutral-500 font-mono w-8">#1</span>
      <Avatar name="Oracle Master" variant="oracle" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Oracle Master</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-spinoza-yellow/20 text-spinoza-yellow">
            ORACLE
          </span>
        </div>
        <span className="text-xs text-neutral-500">42 predictions</span>
      </div>
      <span className="text-green-400 font-mono">89%</span>
    </div>
  ),
};
