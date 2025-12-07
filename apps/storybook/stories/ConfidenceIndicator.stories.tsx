import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfidenceIndicator, ConfidenceSlider } from '@spinozaos/react';

const meta = {
  title: 'Data Display/ConfidenceIndicator',
  component: ConfidenceIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Visual confidence/probability display. Extracted from Substance AGI prediction patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Confidence value (0-100)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'minimal'],
    },
    showIcon: {
      control: 'boolean',
    },
    showLabel: {
      control: 'boolean',
    },
    showPercent: {
      control: 'boolean',
    },
    showBar: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ConfidenceIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 75,
    showIcon: true,
  },
};

export const HighConfidence: Story = {
  args: {
    value: 85,
    showIcon: true,
    showLabel: true,
    size: 'xl',
  },
};

export const MediumConfidence: Story = {
  args: {
    value: 55,
    showIcon: true,
    showLabel: true,
    size: 'xl',
  },
};

export const LowConfidence: Story = {
  args: {
    value: 25,
    showIcon: true,
    showLabel: true,
    size: 'xl',
  },
};

export const WithBar: Story = {
  args: {
    value: 68,
    showIcon: true,
    showBar: true,
    animated: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <ConfidenceIndicator value={75} size="sm" showIcon />
      <ConfidenceIndicator value={75} size="md" showIcon />
      <ConfidenceIndicator value={75} size="lg" showIcon />
      <ConfidenceIndicator value={75} size="xl" showIcon />
    </div>
  ),
};

export const ConfidenceRange: Story = {
  render: () => (
    <div className="space-y-4">
      <ConfidenceIndicator value={90} showIcon showLabel showBar animated />
      <ConfidenceIndicator value={65} showIcon showLabel showBar animated />
      <ConfidenceIndicator value={35} showIcon showLabel showBar animated />
      <ConfidenceIndicator value={15} showIcon showLabel showBar animated />
    </div>
  ),
};

export const CardVariant: Story = {
  args: {
    value: 82,
    variant: 'card',
    showIcon: true,
    showLabel: true,
    size: 'lg',
  },
};

// Interactive Slider Story
const SliderDemo = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="w-80 p-6 bg-void border border-white/10 space-y-6">
      <ConfidenceSlider
        value={value}
        onChange={setValue}
        label="Your Confidence Level"
        showValue
      />
    </div>
  );
};

export const InteractiveSlider: Story = {
  render: () => <SliderDemo />,
};

export const InPredictionCard: Story = {
  render: () => (
    <div className="w-80 p-6 bg-void border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-neutral-500 uppercase">
          Market Probability
        </span>
        <span className="text-xs text-neutral-400">Last updated: 2h ago</span>
      </div>

      <div className="flex items-center justify-center py-4">
        <ConfidenceIndicator
          value={73}
          size="xl"
          showIcon
          showLabel
          animated
        />
      </div>

      <div className="h-px bg-white/10" />

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-neutral-400">
          Based on 1,247 predictions
        </span>
      </div>
    </div>
  ),
};
