import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
} from '../components/Accordion';

describe('Accordion', () => {
  describe('Rendering', () => {
    it('renders accordion items', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('renders multiple items', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('applies custom className to accordion', () => {
      render(
        <Accordion className="custom-accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(document.querySelector('.custom-accordion')).toBeInTheDocument();
    });
  });

  describe('Single Mode (default)', () => {
    it('opens one item at a time', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      await user.click(screen.getByText('Item 1'));
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Item 2'));
      await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
      });
    });

    it('closes item when clicking same trigger again', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      await user.click(screen.getByText('Item 1'));
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Item 1'));
      await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      });
    });
  });

  describe('Multiple Mode', () => {
    it('allows multiple items to be open', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      await user.click(screen.getByText('Item 1'));
      await user.click(screen.getByText('Item 2'));

      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
      });
    });
  });

  describe('Default Value', () => {
    it('opens items specified in defaultValue', () => {
      render(
        <Accordion defaultValue={['item-1']}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled value', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <Accordion value={[]} onValueChange={handleChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      await user.click(screen.getByText('Item 1'));
      expect(handleChange).toHaveBeenCalledWith(['item-1']);

      // Content should not be visible since we're controlling value
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

      // Rerender with the new value
      rerender(
        <Accordion value={['item-1']} onValueChange={handleChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  describe('Disabled Items', () => {
    it('does not toggle disabled items', async () => {
      const user = userEvent.setup();
      render(
        <Accordion>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      await user.click(screen.getByText('Item 1'));
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('applies disabled styling', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole('button');
      expect(trigger).toBeDisabled();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(
        <Accordion variant="default">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(document.querySelector('.space-y-2')).toBeInTheDocument();
    });

    it('renders separated variant', () => {
      render(
        <Accordion variant="separated">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(document.querySelector('.space-y-3')).toBeInTheDocument();
    });
  });

  describe('Trigger Sizes', () => {
    it('renders small size', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger size="sm">Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByRole('button')).toHaveClass('p-3');
    });

    it('renders medium size (default)', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger size="md">Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByRole('button')).toHaveClass('p-4');
    });

    it('renders large size', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger size="lg">Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByRole('button')).toHaveClass('p-5');
    });
  });

  describe('Trigger Icon', () => {
    it('renders default chevron icon', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      // ChevronDown icon is rendered
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('hides icon when hideIcon is true', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger hideIcon>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(document.querySelector('svg')).not.toBeInTheDocument();
    });

    it('renders custom icon', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger icon={<span data-testid="custom-icon">+</span>}>
              Item 1
            </AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-expanded attribute', async () => {
      const user = userEvent.setup();
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has correct data-state attribute', async () => {
      const user = userEvent.setup();
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const item = screen.getByText('Item 1').closest('[data-state]');
      expect(item).toHaveAttribute('data-state', 'closed');

      await user.click(screen.getByText('Item 1'));
      await waitFor(() => {
        expect(item).toHaveAttribute('data-state', 'open');
      });
    });
  });
});

describe('FAQAccordion', () => {
  const faqItems = [
    { question: 'Question 1', answer: 'Answer 1' },
    { question: 'Question 2', answer: 'Answer 2' },
  ];

  it('renders FAQ items', () => {
    render(<FAQAccordion items={faqItems} />);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  it('opens answer on question click', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={faqItems} />);

    await user.click(screen.getByText('Question 1'));
    await waitFor(() => {
      expect(screen.getByText('Answer 1')).toBeInTheDocument();
    });
  });

  it('shows question icon when showIcon is true', () => {
    render(<FAQAccordion items={faqItems} showIcon />);
    // Question mark icon SVG is rendered
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('passes through accordion props', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={faqItems} defaultValue={['item-0']} />);

    // First item should be open by default
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
  });
});
