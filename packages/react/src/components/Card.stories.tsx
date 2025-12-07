import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Text } from './Text';
import { Button } from './Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'elevated', 'interactive'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <div style={{ width: '300px' }}>
        <Text variant="h2">Card Title</Text>
        <Text variant="body" style={{ marginTop: '8px' }}>
          This is a default card with some content inside.
        </Text>
      </div>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: (
      <div style={{ width: '300px' }}>
        <Text variant="h2">Glass Card</Text>
        <Text variant="body" style={{ marginTop: '8px' }}>
          Glassmorphism effect with blur backdrop.
        </Text>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div style={{ width: '300px' }}>
        <Text variant="h2">Elevated Card</Text>
        <Text variant="body" style={{ marginTop: '8px' }}>
          Elevated surface for important content.
        </Text>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    children: (
      <div style={{ width: '300px' }}>
        <Text variant="h2">Interactive Card</Text>
        <Text variant="body" style={{ marginTop: '8px' }}>
          Hover to see the interaction effect.
        </Text>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    variant: 'default',
    children: (
      <div style={{ width: '300px' }}>
        <Text variant="label">PREDICTION</Text>
        <Text variant="h2" style={{ marginTop: '8px' }}>AGI by 2027</Text>
        <Text variant="body" style={{ marginTop: '8px' }}>
          Current probability based on signal analysis.
        </Text>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button variant="primary" size="sm">Predict</Button>
          <Button variant="ghost" size="sm">Details</Button>
        </div>
      </div>
    ),
  },
};
