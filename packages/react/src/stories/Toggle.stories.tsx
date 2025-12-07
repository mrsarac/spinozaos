import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../components/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Forms/Toggle',
  component: Toggle,
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
      options: ['default', 'oracle', 'success'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: 'Dark mode',
  },
};

export const Checked: Story = {
  args: {
    label: 'Notifications enabled',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Auto-save',
    description: 'Automatically save your work',
    defaultChecked: true,
  },
};

export const OracleVariant: Story = {
  args: {
    label: 'Oracle mode',
    variant: 'oracle',
    defaultChecked: true,
  },
};

export const SuccessVariant: Story = {
  args: {
    label: 'Online status',
    variant: 'success',
    defaultChecked: true,
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Enable feature',
    labelPosition: 'left',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Locked setting',
    disabled: true,
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toggle size="sm" label="Small toggle" />
      <Toggle size="md" label="Medium toggle" />
      <Toggle size="lg" label="Large toggle" />
    </div>
  ),
};

export const SettingsPanel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Toggle label="Email notifications" description="Receive updates via email" defaultChecked />
      <Toggle label="Push notifications" description="Browser push notifications" />
      <Toggle label="Marketing emails" description="Tips and product updates" />
      <Toggle label="Two-factor auth" description="Enhanced security" variant="success" defaultChecked />
    </div>
  ),
};
