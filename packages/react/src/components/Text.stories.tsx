import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'h1', 'h2', 'h3', 'body', 'label', 'data'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: {
    variant: 'display',
    children: 'Display Text',
  },
};

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text used for paragraphs and general content. It provides good readability for longer passages of text.',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Label Text',
  },
};

export const Data: Story = {
  args: {
    variant: 'data',
    children: '87.3%',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Text variant="display">Display: Superintelligence</Text>
      <Text variant="h1">H1: AGI Prediction Market</Text>
      <Text variant="h2">H2: Current Milestones</Text>
      <Text variant="h3">H3: Signal Analysis</Text>
      <Text variant="body">Body: This platform tracks the progress toward artificial general intelligence through crowdsourced predictions and signal analysis.</Text>
      <Text variant="label">Label: Prediction Category</Text>
      <Text variant="data">94.7%</Text>
    </div>
  ),
};
