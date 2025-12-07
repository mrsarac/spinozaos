import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'glass'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    helperText: 'Maximum 500 characters',
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    showCount: true,
    maxLength: 200,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Description',
    state: 'error',
    helperText: 'Description is required',
    defaultValue: '',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Notes',
    state: 'success',
    helperText: 'Notes saved successfully',
    defaultValue: 'This is valid content',
  },
};

export const GlassVariant: Story = {
  args: {
    variant: 'glass',
    label: 'Feedback',
    placeholder: 'Share your thoughts...',
  },
};

export const Resizable: Story = {
  args: {
    label: 'Resizable',
    placeholder: 'You can resize this...',
    resize: 'vertical',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Textarea size="sm" placeholder="Small textarea" />
      <Textarea size="md" placeholder="Medium textarea" />
      <Textarea size="lg" placeholder="Large textarea" />
    </div>
  ),
};
