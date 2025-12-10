import type { Meta, StoryObj } from '@storybook/react';
import { Terminal, type TerminalLine } from '@spinozaos/react';

const meta: Meta<typeof Terminal> = {
  title: 'Components/Terminal',
  component: Terminal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Interactive CLI component with typewriter effect, command history, and hacker aesthetic. Part of Substance design language.',
      },
    },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Terminal>;

// Default
export const Default: Story = {
  args: {
    welcomeMessage: 'Welcome to SpinozaOS Terminal v1.0.0\nType "help" for available commands.',
  },
};

// With Custom Prompt
export const CustomPrompt: Story = {
  args: {
    prompt: 'substance>',
    welcomeMessage: 'Substance Intelligence Engine v2.0',
  },
};

// With Pre-filled Lines
export const WithHistory: Story = {
  args: {
    lines: [
      { id: '1', type: 'system', content: 'Initializing SpinozaOS...', timestamp: new Date() },
      { id: '2', type: 'success', content: 'System ready.', timestamp: new Date() },
      { id: '3', type: 'input', content: 'status', timestamp: new Date() },
      { id: '4', type: 'output', content: 'All systems operational\nCPU: 45%\nMemory: 2.3GB / 8GB\nUptime: 48h 23m', timestamp: new Date() },
      { id: '5', type: 'input', content: 'markets --active', timestamp: new Date() },
      { id: '6', type: 'output', content: 'Active markets: 89\nTotal volume: $45.6M\nTop market: AGI-2026 (34%)', timestamp: new Date() },
    ],
    welcomeMessage: '',
  },
};

// With Custom Commands
export const CustomCommands: Story = {
  args: {
    welcomeMessage: 'AGI Prediction Terminal\nType "help" for commands or try "predict", "market", "status"',
    commands: {
      predict: (args) => {
        if (args.length === 0) return 'Usage: predict <market-id>';
        return `Prediction submitted for market: ${args[0]}\nConfidence: 73%\nStake: 100 tokens`;
      },
      market: (args) => {
        if (args.length === 0) return 'Usage: market <id|list>';
        if (args[0] === 'list') {
          return 'Active Markets:\n  AGI-2026    $0.34  +12.5%\n  AGI-2027    $0.52   +8.2%\n  GPT-5       $0.78   -3.4%';
        }
        return `Market ${args[0]}:\n  Price: $0.34\n  Volume: 1.2M\n  Predictions: 4,521`;
      },
      status: () => 'System Status: ONLINE\nLatency: 12ms\nConnected nodes: 847',
    },
    onCommand: (cmd) => {
      console.log('Unknown command:', cmd);
    },
  },
};

// With Timestamps
export const WithTimestamps: Story = {
  args: {
    showTimestamps: true,
    lines: [
      { id: '1', type: 'info', content: 'Connection established', timestamp: new Date(Date.now() - 60000) },
      { id: '2', type: 'output', content: 'Fetching market data...', timestamp: new Date(Date.now() - 30000) },
      { id: '3', type: 'success', content: 'Data synchronized', timestamp: new Date() },
    ],
    welcomeMessage: '',
  },
};

// Read Only
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    lines: [
      { id: '1', type: 'system', content: '[SYSTEM LOG]', timestamp: new Date() },
      { id: '2', type: 'output', content: '2024-01-15 10:23:45 - Server started', timestamp: new Date() },
      { id: '3', type: 'output', content: '2024-01-15 10:23:46 - Database connected', timestamp: new Date() },
      { id: '4', type: 'success', content: '2024-01-15 10:23:47 - All services running', timestamp: new Date() },
      { id: '5', type: 'output', content: '2024-01-15 10:24:12 - New prediction: AGI-2026', timestamp: new Date() },
      { id: '6', type: 'error', content: '2024-01-15 10:25:33 - Rate limit exceeded for user_847', timestamp: new Date() },
      { id: '7', type: 'output', content: '2024-01-15 10:25:34 - Throttling applied', timestamp: new Date() },
    ],
    welcomeMessage: '',
  },
};

// Error States
export const ErrorStates: Story = {
  args: {
    lines: [
      { id: '1', type: 'input', content: 'connect --host=invalid', timestamp: new Date() },
      { id: '2', type: 'error', content: 'Error: Connection refused\nHost "invalid" is not reachable.\nCheck your network settings and try again.', timestamp: new Date() },
      { id: '3', type: 'input', content: 'retry', timestamp: new Date() },
      { id: '4', type: 'info', content: 'Retrying connection...', timestamp: new Date() },
      { id: '5', type: 'error', content: 'Error: Maximum retries exceeded', timestamp: new Date() },
    ],
    welcomeMessage: '',
  },
};

// Hacker Aesthetic
export const HackerMode: Story = {
  render: () => (
    <div className="bg-void p-4">
      <Terminal
        prompt="root@spinoza:~#"
        welcomeMessage={`
  ███████╗██████╗ ██╗███╗   ██╗ ██████╗ ███████╗ █████╗
  ██╔════╝██╔══██╗██║████╗  ██║██╔═══██╗╚══███╔╝██╔══██╗
  ███████╗██████╔╝██║██╔██╗ ██║██║   ██║  ███╔╝ ███████║
  ╚════██║██╔═══╝ ██║██║╚██╗██║██║   ██║ ███╔╝  ██╔══██║
  ███████║██║     ██║██║ ╚████║╚██████╔╝███████╗██║  ██║
  ╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝

  SUBSTANCE INTELLIGENCE ENGINE v2.0
  Clearance Level: COSMIC

  Type "help" for available commands.
        `}
        commands={{
          scan: () => 'Scanning network...\n[████████████████████] 100%\nFound 847 active nodes.',
          analyze: (args) => `Analyzing ${args[0] || 'system'}...\nThreat level: LOW\nConfidence: 94%`,
          deploy: () => 'Deploying prediction model...\nModel: spinoza-v3.2\nStatus: ACTIVE',
        }}
      />
    </div>
  ),
};

// In Dashboard Context
export const DashboardContext: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="analytics-card p-4">
        <h3 className="text-sm font-semibold text-white mb-3">System Logs</h3>
        <Terminal
          readOnly
          lines={[
            { id: '1', type: 'output', content: 'Market sync complete', timestamp: new Date() },
            { id: '2', type: 'success', content: 'New prediction: AGI-2026', timestamp: new Date() },
            { id: '3', type: 'output', content: 'Processing 1,234 votes', timestamp: new Date() },
          ]}
          welcomeMessage=""
          className="h-48"
        />
      </div>
      <div className="analytics-card p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Command Center</h3>
        <Terminal
          prompt="cmd>"
          welcomeMessage="Quick commands: status, markets, users"
          className="h-48"
        />
      </div>
    </div>
  ),
};
