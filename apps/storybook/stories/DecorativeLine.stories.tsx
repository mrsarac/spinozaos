import type { Meta, StoryObj } from '@storybook/react';
import { DecorativeLine, GradientDivider, CardTopLine, SectionDivider } from '@spinozaos/react';

const meta = {
  title: 'Data Display/DecorativeLine',
  component: DecorativeLine,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Gradient line decorations. Extracted from Substance AGI card patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['gradient', 'gradientReverse', 'gold', 'oracle', 'teal', 'success', 'error', 'subtle', 'pulse'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    animated: {
      control: 'boolean',
    },
    glow: {
      control: 'boolean',
    },
    animateFrom: {
      control: 'select',
      options: ['left', 'right', 'center'],
    },
  },
} satisfies Meta<typeof DecorativeLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'gradient',
    width: 200,
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    width: 300,
    size: 'md',
  },
};

export const GradientReverse: Story = {
  args: {
    variant: 'gradientReverse',
    width: 300,
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">Gradient</span>
        <DecorativeLine variant="gradient" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">Gradient Reverse</span>
        <DecorativeLine variant="gradientReverse" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">Gold</span>
        <DecorativeLine variant="gold" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">Oracle</span>
        <DecorativeLine variant="oracle" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">Teal</span>
        <DecorativeLine variant="teal" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">Success</span>
        <DecorativeLine variant="success" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">Error</span>
        <DecorativeLine variant="error" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">Subtle</span>
        <DecorativeLine variant="subtle" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">XS</span>
        <DecorativeLine size="xs" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">SM</span>
        <DecorativeLine size="sm" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">MD</span>
        <DecorativeLine size="md" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">LG</span>
        <DecorativeLine size="lg" />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-1 block">XL</span>
        <DecorativeLine size="xl" />
      </div>
    </div>
  ),
};

export const Animated: Story = {
  args: {
    variant: 'gradient',
    width: 300,
    animated: true,
    animateFrom: 'left',
  },
};

export const AnimatedFromCenter: Story = {
  args: {
    variant: 'gradient',
    width: 300,
    animated: true,
    animateFrom: 'center',
  },
};

export const WithGlow: Story = {
  args: {
    variant: 'gradient',
    width: 300,
    size: 'md',
    glow: true,
  },
};

export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <span className="text-xs text-neutral-500 mb-2 block">GradientDivider</span>
        <GradientDivider />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-2 block">CardTopLine (animated)</span>
        <CardTopLine />
      </div>
      <div>
        <span className="text-xs text-neutral-500 mb-2 block">SectionDivider</span>
        <SectionDivider />
      </div>
    </div>
  ),
};

export const InCardContext: Story = {
  render: () => (
    <div className="w-80 bg-void border border-white/10 overflow-hidden">
      <CardTopLine />
      <div className="p-6 space-y-4">
        <h3 className="text-white font-medium">AGI Milestone</h3>
        <p className="text-sm text-neutral-400">
          Artificial General Intelligence capable of self-improvement.
        </p>
        <SectionDivider />
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Probability: 45%</span>
          <span>2027-2030</span>
        </div>
      </div>
    </div>
  ),
};

export const VerticalLine: Story = {
  render: () => (
    <div className="flex gap-6 h-32">
      <div className="flex gap-2">
        <DecorativeLine position="left" variant="gradient" height="100%" />
        <div className="text-sm text-neutral-400">
          Vertical gradient line
        </div>
      </div>
      <div className="flex gap-2">
        <DecorativeLine position="left" variant="gold" height="100%" size="md" glow />
        <div className="text-sm text-neutral-400">
          With glow
        </div>
      </div>
    </div>
  ),
};
