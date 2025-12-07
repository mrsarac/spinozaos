import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastContainer } from './Toast';
import { Button } from './Button';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: 'Notification',
    description: 'This is a default toast notification.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Your session will expire in 5 minutes.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'A new version is available for download.',
  },
};

export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'Update Available',
    description: 'SpinozaOS v2.0 is now available.',
    action: (
      <Button size="sm" variant="primary">
        Update Now
      </Button>
    ),
  },
};

export const WithClose: Story = {
  args: {
    variant: 'success',
    title: 'File Uploaded',
    description: 'document.pdf has been uploaded successfully.',
    onClose: () => console.log('Toast closed'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Toast title="Default" description="Default toast notification" />
      <Toast variant="success" title="Success" description="Operation completed" />
      <Toast variant="error" title="Error" description="Something went wrong" />
      <Toast variant="warning" title="Warning" description="Please review your input" />
      <Toast variant="info" title="Info" description="New features available" />
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: function ToastDemo() {
    const [toasts, setToasts] = React.useState<Array<{ id: number; variant: 'success' | 'error' | 'warning' | 'info' }>>([]);

    const addToast = (variant: 'success' | 'error' | 'warning' | 'info') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, variant }]);
    };

    const removeToast = (id: number) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    const titles = {
      success: 'Success!',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
    };

    const descriptions = {
      success: 'Your action was completed successfully.',
      error: 'Something went wrong. Please try again.',
      warning: 'Please review before continuing.',
      info: 'Here is some useful information.',
    };

    return (
      <div>
        <div className="flex gap-2 mb-8">
          <Button variant="primary" onClick={() => addToast('success')}>Success</Button>
          <Button variant="secondary" onClick={() => addToast('error')}>Error</Button>
          <Button variant="ghost" onClick={() => addToast('warning')}>Warning</Button>
          <Button variant="ghost" onClick={() => addToast('info')}>Info</Button>
        </div>
        <ToastContainer position="bottom-right">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={titles[toast.variant]}
              description={descriptions[toast.variant]}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </ToastContainer>
      </div>
    );
  },
};
