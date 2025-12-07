import type { Meta, StoryObj } from '@storybook/react';
import { ClearanceBadge } from '@spinozaos/react';

const meta = {
  title: 'Data Display/ClearanceBadge',
  component: ClearanceBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Security clearance level indicator badges. Extracted from Substance AGI design patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['cosmic', 'topSecret', 'secret', 'classified', 'standard'],
      description: 'Clearance level',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showIcon: {
      control: 'boolean',
    },
    pulse: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ClearanceBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 'standard',
  },
};

export const Cosmic: Story = {
  args: {
    level: 'cosmic',
    pulse: true,
  },
};

export const TopSecret: Story = {
  args: {
    level: 'topSecret',
  },
};

export const Secret: Story = {
  args: {
    level: 'secret',
  },
};

export const Classified: Story = {
  args: {
    level: 'classified',
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ClearanceBadge level="cosmic" pulse />
      <ClearanceBadge level="topSecret" />
      <ClearanceBadge level="secret" />
      <ClearanceBadge level="classified" />
      <ClearanceBadge level="standard" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <ClearanceBadge level="topSecret" size="sm" />
      <ClearanceBadge level="topSecret" size="md" />
      <ClearanceBadge level="topSecret" size="lg" />
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ClearanceBadge level="cosmic" label="OMEGA LEVEL" />
      <ClearanceBadge level="topSecret" label="EYES ONLY" />
      <ClearanceBadge level="secret" label="RESTRICTED" />
    </div>
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ClearanceBadge level="cosmic" showIcon={false} />
      <ClearanceBadge level="topSecret" showIcon={false} />
      <ClearanceBadge level="secret" showIcon={false} />
    </div>
  ),
};

export const Animated: Story = {
  args: {
    level: 'cosmic',
    animated: true,
    pulse: true,
  },
};

export const InContext: Story = {
  render: () => (
    <div className="p-6 bg-void border border-white/10 space-y-4 w-80">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-medium">Project Omega</h3>
          <p className="text-sm text-neutral-400">AGI Research Initiative</p>
        </div>
        <ClearanceBadge level="cosmic" size="sm" pulse />
      </div>
      <div className="h-px bg-white/10" />
      <p className="text-xs text-neutral-500">
        Access restricted to authorized personnel only.
      </p>
    </div>
  ),
};
