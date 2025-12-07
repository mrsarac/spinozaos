import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'void',
      values: [
        { name: 'void', value: '#020617' },
        { name: 'void-light', value: '#0f172a' },
        { name: 'void-lighter', value: '#1e293b' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#ffffff',
      }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
