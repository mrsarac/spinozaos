import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
} from '@spinozaos/react';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Expandable content sections. Extracted from Substance FAQ patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic Accordion
export const Default: Story = {
  render: () => (
    <Accordion type="single" defaultValue={['item-1']} className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is SpinozaOS?</AccordionTrigger>
        <AccordionContent>
          SpinozaOS is a design system for building interfaces in the age of superintelligence.
          It provides React components, design tokens, and motion utilities.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          Install via npm or pnpm: <code className="bg-white/10 px-1">pnpm add @spinozaos/react</code>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes! All components follow WAI-ARIA guidelines and support keyboard navigation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Multiple items open
export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>
          Multiple items can be open at the same time when type="multiple".
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Section</AccordionTrigger>
        <AccordionContent>
          Click on multiple items to expand them all.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>
          This is useful for FAQ sections or multi-part content.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Bordered variant
export const Bordered: Story = {
  render: () => (
    <Accordion type="single" className="w-full max-w-lg">
      <AccordionItem value="item-1" variant="bordered">
        <AccordionTrigger>Bordered Variant</AccordionTrigger>
        <AccordionContent>
          This variant has a border with transparent background.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" variant="bordered">
        <AccordionTrigger>Another Bordered Item</AccordionTrigger>
        <AccordionContent>
          Good for cleaner, more minimal designs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// FAQ Preset
export const FAQPreset: Story = {
  render: () => (
    <FAQAccordion
      className="w-full max-w-lg"
      showIcon
      items={[
        {
          question: 'What is AGI?',
          answer: 'Artificial General Intelligence (AGI) refers to AI systems that can perform any intellectual task that a human can.',
        },
        {
          question: 'When will AGI arrive?',
          answer: 'Predictions vary widely, from 2027 to 2040 or later. Substance tracks expert forecasts and aggregates predictions.',
        },
        {
          question: 'How accurate are predictions?',
          answer: 'Historical accuracy varies by domain. Our system tracks Brier scores and other metrics to evaluate forecaster accuracy.',
        },
      ]}
    />
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-lg">
      <div>
        <p className="text-xs text-neutral-500 mb-2">Small</p>
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger size="sm">Small Trigger</AccordionTrigger>
            <AccordionContent>Compact content area.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">Medium (default)</p>
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger size="md">Medium Trigger</AccordionTrigger>
            <AccordionContent>Default content area.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">Large</p>
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger size="lg">Large Trigger</AccordionTrigger>
            <AccordionContent>Spacious content area.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Disabled item
export const DisabledItem: Story = {
  render: () => (
    <Accordion type="single" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled Item</AccordionTrigger>
        <AccordionContent>This item is enabled and can be opened.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Item</AccordionTrigger>
        <AccordionContent>This content is hidden.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Enabled Item</AccordionTrigger>
        <AccordionContent>This item is also enabled.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
