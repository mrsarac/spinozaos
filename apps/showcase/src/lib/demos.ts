export interface Demo {
  id: string;
  title: string;
  description: string;
  category: 'dashboard' | 'chat' | 'landing' | 'dataviz' | 'forms' | 'trading';
  status: 'live' | 'coming-soon' | 'beta';
  href: string;
  components: string[];
  preview?: string;
}

export const demos: Demo[] = [
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
    description: 'Conversational UI for AI assistant with real-time streaming and typing indicators.',
    category: 'chat',
    status: 'coming-soon',
    href: '/demos/ai-chat',
    components: ['Input', 'Button', 'Avatar', 'Toast', 'Skeleton', 'LoadingDots'],
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
    id: 'data-viz',
    title: 'Data Visualization',
    description: 'Complex data charts and graphs with SpinozaOS styling and Recharts integration.',
    category: 'dataviz',
    status: 'coming-soon',
    href: '/demos/data-viz',
    components: ['StatCard', 'Progress', 'Tooltip', 'Badge', 'Tabs', 'ConfidenceIndicator'],
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
