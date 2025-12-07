import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
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
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const basicOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select framework',
  },
};

export const WithLabel: Story = {
  args: {
    options: basicOptions,
    label: 'Framework',
    placeholder: 'Select framework',
    helperText: 'Choose your preferred framework',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: basicOptions,
    label: 'Framework',
    defaultValue: 'react',
  },
};

export const ErrorState: Story = {
  args: {
    options: basicOptions,
    label: 'Framework',
    state: 'error',
    helperText: 'Selection is required',
  },
};

export const SuccessState: Story = {
  args: {
    options: basicOptions,
    label: 'Framework',
    state: 'success',
    defaultValue: 'react',
    helperText: 'Good choice!',
  },
};

export const GlassVariant: Story = {
  args: {
    options: basicOptions,
    variant: 'glass',
    label: 'Framework',
    placeholder: 'Select framework',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular (coming soon)', disabled: true },
      { value: 'svelte', label: 'Svelte (coming soon)', disabled: true },
    ],
    label: 'Framework',
    placeholder: 'Select framework',
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    label: 'Framework',
    defaultValue: 'react',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select options={basicOptions} size="sm" placeholder="Small" />
      <Select options={basicOptions} size="md" placeholder="Medium" />
      <Select options={basicOptions} size="lg" placeholder="Large" />
    </div>
  ),
};
