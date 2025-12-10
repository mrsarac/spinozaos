export interface Demo {
  id: string;
  title: string;
  description: string;
  category: 'dashboard' | 'chat' | 'landing' | 'dataviz' | 'forms' | 'trading' | 'monitoring';
  status: 'live' | 'coming-soon' | 'beta';
  href: string;
  components: string[];
  preview?: string;
}

export const demos: Demo[] = [
  {
    id: 'command-center',
    title: 'Command Center',
    description: 'System monitoring dashboard with real-time metrics, service status, log streaming, and alert management.',
    category: 'monitoring',
    status: 'live',
    href: 'http://localhost:3103',
    components: ['MetricsPanel', 'ServiceGrid', 'LogViewer', 'AlertPanel', 'ProcessList', 'Header'],
  },
  {
    id: 'trading-terminal',
    title: 'AGI Prediction Markets',
    description: 'Bloomberg-style trading terminal for AGI timeline predictions with real-time charts, order book, and terminal CLI.',
    category: 'trading',
    status: 'live',
    href: 'http://localhost:3102',
    components: ['MarketCard', 'PriceChart', 'OrderBook', 'TradeHistory', 'Terminal', 'NewsFeed', 'MarketTicker'],
  },
  {
    id: 'agi-dashboard',
    title: 'AGI Dashboard',
    description: 'Bloomberg Terminal-style analytics dashboard for AI predictions and model monitoring.',
    category: 'dashboard',
    status: 'live',
    href: 'http://localhost:3101',
    components: ['StatCard', 'Progress', 'Badge', 'Card', 'Tabs', 'ClearanceBadge'],
  },
  {
    id: 'ai-chat',
    title: 'AI Chat Interface',
    description: 'ChatGPT-style conversational UI with streaming text, typing indicators, multi-modal attachments, and conversation history.',
    category: 'chat',
    status: 'live',
    href: 'http://localhost:3104',
    components: ['MessageBubble', 'ChatInput', 'TypingIndicator', 'ChatSidebar', 'CodeBlock', 'AttachmentPreview'],
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Award-winning marketing site showcasing SpinozaOS design philosophy.',
    category: 'landing',
    status: 'coming-soon',
    href: '/demos/landing-page',
    components: ['Button', 'Text', 'Card', 'GlitchText', 'DecorativeLine', 'Badge'],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Business intelligence dashboard with KPIs, revenue charts, heatmaps, conversion funnels, and real-time activity feeds.',
    category: 'dataviz',
    status: 'live',
    href: 'http://localhost:3105',
    components: ['KPICards', 'RevenueChart', 'TrafficSources', 'FunnelChart', 'HeatmapChart', 'GeoMap', 'ActivityFeed', 'ProductTable'],
  },
  {
    id: 'form-builder',
    title: 'Form Builder',
    description: 'Interactive form creation tool with drag-and-drop and live preview.',
    category: 'forms',
    status: 'coming-soon',
    href: '/demos/form-builder',
    components: ['Input', 'Textarea', 'Select', 'Checkbox', 'Toggle', 'Modal'],
  },
];

export const categories = [
  { id: 'all', label: 'All Demos' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'trading', label: 'Trading' },
  { id: 'dashboard', label: 'Dashboards' },
  { id: 'chat', label: 'Chat UI' },
  { id: 'landing', label: 'Landing Pages' },
  { id: 'dataviz', label: 'Data Viz' },
  { id: 'forms', label: 'Forms' },
] as const;

export function getDemosByCategory(category: string): Demo[] {
  if (category === 'all') return demos;
  return demos.filter((demo) => demo.category === category);
}
