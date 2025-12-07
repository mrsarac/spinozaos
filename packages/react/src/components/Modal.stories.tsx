import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { Button } from './Button';
import { Input } from './Input';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: function ModalDemo() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
          description="This is a description of the modal content."
        >
          <p className="text-neutral-300">
            This is the modal body content. You can put any content here.
          </p>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const SmallModal: Story = {
  render: function ModalDemo() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          size="sm"
        >
          <p className="text-neutral-300">
            Are you sure you want to proceed?
          </p>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Yes, Proceed
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const LargeModal: Story = {
  render: function ModalDemo() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Detailed Information"
          description="Review the following information carefully."
          size="lg"
        >
          <div className="space-y-4 text-neutral-300">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: function ModalDemo() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Create New Prediction"
          description="Enter the details for your AGI milestone prediction."
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Milestone Title"
              placeholder="e.g., AGI achieves human-level reasoning"
            />
            <Input
              label="Target Date"
              type="date"
            />
            <Input
              label="Your Confidence (%)"
              type="number"
              placeholder="0-100"
            />
          </div>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Submit Prediction
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const DangerModal: Story = {
  render: function ModalDemo() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Delete Account
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Account"
          description="This action cannot be undone."
          size="sm"
        >
          <p className="text-neutral-300">
            Are you sure you want to delete your account? All of your data will
            be permanently removed. This action cannot be undone.
          </p>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="bg-error hover:bg-error/80"
              onClick={() => setIsOpen(false)}
            >
              Delete Account
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const NoCloseOnOverlay: Story = {
  render: function ModalDemo() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Modal (No Overlay Close)
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Important Action"
          closeOnOverlayClick={false}
        >
          <p className="text-neutral-300">
            This modal won't close when clicking the overlay. You must use the
            close button or press Escape.
          </p>
          <ModalFooter>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Got it
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
