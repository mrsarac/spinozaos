// AGI Prediction Markets Mock Data

export interface PredictionMarket {
  id: string;
  name: string;
  symbol: string;
  description: string;
  category: 'agi' | 'asi' | 'capability' | 'safety' | 'timeline';
  currentPrice: number; // 0-100 representing probability %
  previousPrice: number;
  volume24h: number;
  openInterest: number;
  resolveDate: string;
  status: 'active' | 'pending' | 'resolved';
  priceHistory: { time: string; price: number; volume: number }[];
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
  side: 'buy' | 'sell';
}

export interface Trade {
  id: string;
  marketId: string;
  price: number;
  size: number;
  side: 'buy' | 'sell';
  timestamp: Date;
}

// Generate price history for charts
function generatePriceHistory(basePrice: number, volatility: number = 5): PredictionMarket['priceHistory'] {
  const history: PredictionMarket['priceHistory'] = [];
  let price = basePrice - 15 + Math.random() * 10;

  for (let i = 48; i >= 0; i--) {
    const time = new Date();
    time.setHours(time.getHours() - i);

    const change = (Math.random() - 0.5) * volatility;
    price = Math.max(1, Math.min(99, price + change));

    history.push({
      time: time.toISOString(),
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 50000) + 10000,
    });
  }

  // Ensure last price matches current
  if (history.length > 0) {
    history[history.length - 1].price = basePrice;
  }

  return history;
}

export const predictionMarkets: PredictionMarket[] = [
  {
    id: 'agi-2027',
    name: 'AGI by 2027',
    symbol: 'AGI27',
    description: 'Will Artificial General Intelligence be achieved by December 31, 2027?',
    category: 'agi',
    currentPrice: 34.5,
    previousPrice: 32.1,
    volume24h: 2847293,
    openInterest: 15420000,
    resolveDate: '2027-12-31',
    status: 'active',
    priceHistory: generatePriceHistory(34.5, 3),
  },
  {
    id: 'asi-2030',
    name: 'ASI by 2030',
    symbol: 'ASI30',
    description: 'Will Artificial Superintelligence emerge by December 31, 2030?',
    category: 'asi',
    currentPrice: 12.8,
    previousPrice: 11.9,
    volume24h: 1523847,
    openInterest: 8750000,
    resolveDate: '2030-12-31',
    status: 'active',
    priceHistory: generatePriceHistory(12.8, 2),
  },
  {
    id: 'gpt5-reasoning',
    name: 'GPT-5 PhD-Level Reasoning',
    symbol: 'G5PHD',
    description: 'Will GPT-5 demonstrate PhD-level reasoning in scientific domains?',
    category: 'capability',
    currentPrice: 67.2,
    previousPrice: 68.4,
    volume24h: 982374,
    openInterest: 4230000,
    resolveDate: '2025-12-31',
    status: 'active',
    priceHistory: generatePriceHistory(67.2, 4),
  },
  {
    id: 'alignment-solved',
    name: 'Alignment Problem Solved',
    symbol: 'ALIGN',
    description: 'Will the AI alignment problem be formally solved before AGI?',
    category: 'safety',
    currentPrice: 23.1,
    previousPrice: 24.7,
    volume24h: 743928,
    openInterest: 3890000,
    resolveDate: '2028-12-31',
    status: 'active',
    priceHistory: generatePriceHistory(23.1, 3),
  },
  {
    id: 'claude-consciousness',
    name: 'Claude Passes Consciousness Test',
    symbol: 'CLCON',
    description: 'Will Claude pass a recognized consciousness evaluation by 2026?',
    category: 'capability',
    currentPrice: 8.4,
    previousPrice: 7.9,
    volume24h: 456782,
    openInterest: 2150000,
    resolveDate: '2026-12-31',
    status: 'active',
    priceHistory: generatePriceHistory(8.4, 2),
  },
  {
    id: 'robotics-breakthrough',
    name: 'Humanoid Robot Mass Production',
    symbol: 'ROBOT',
    description: 'Will humanoid robots enter mass production (>100k/year) by 2026?',
    category: 'capability',
    currentPrice: 71.3,
    previousPrice: 69.8,
    volume24h: 1234567,
    openInterest: 6780000,
    resolveDate: '2026-12-31',
    status: 'active',
    priceHistory: generatePriceHistory(71.3, 5),
  },
  {
    id: 'ai-regulation',
    name: 'Global AI Treaty Signed',
    symbol: 'AILAW',
    description: 'Will a binding international AI safety treaty be signed by 2027?',
    category: 'safety',
    currentPrice: 41.6,
    previousPrice: 43.2,
    volume24h: 567890,
    openInterest: 3210000,
    resolveDate: '2027-12-31',
    status: 'active',
    priceHistory: generatePriceHistory(41.6, 4),
  },
  {
    id: 'compute-10x',
    name: '10x Compute Efficiency',
    symbol: 'COMP10',
    description: 'Will AI training efficiency improve 10x from 2024 baselines by 2026?',
    category: 'capability',
    currentPrice: 82.4,
    previousPrice: 81.1,
    volume24h: 892341,
    openInterest: 4560000,
    resolveDate: '2026-12-31',
    status: 'active',
    priceHistory: generatePriceHistory(82.4, 3),
  },
];

// Generate order book
export function generateOrderBook(currentPrice: number): { bids: OrderBookEntry[]; asks: OrderBookEntry[] } {
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];

  let bidTotal = 0;
  let askTotal = 0;

  for (let i = 0; i < 12; i++) {
    const bidPrice = Math.round((currentPrice - 0.1 - i * 0.1) * 100) / 100;
    const bidSize = Math.floor(Math.random() * 50000) + 5000;
    bidTotal += bidSize;
    bids.push({ price: bidPrice, size: bidSize, total: bidTotal, side: 'buy' });

    const askPrice = Math.round((currentPrice + 0.1 + i * 0.1) * 100) / 100;
    const askSize = Math.floor(Math.random() * 50000) + 5000;
    askTotal += askSize;
    asks.push({ price: askPrice, size: askSize, total: askTotal, side: 'sell' });
  }

  return { bids, asks };
}

// Generate recent trades
export function generateRecentTrades(marketId: string, currentPrice: number): Trade[] {
  const trades: Trade[] = [];

  for (let i = 0; i < 20; i++) {
    const time = new Date();
    time.setSeconds(time.getSeconds() - i * Math.floor(Math.random() * 30));

    trades.push({
      id: `trade-${i}`,
      marketId,
      price: Math.round((currentPrice + (Math.random() - 0.5) * 0.5) * 100) / 100,
      size: Math.floor(Math.random() * 10000) + 500,
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      timestamp: time,
    });
  }

  return trades;
}

// Terminal commands for the command interface
export const terminalCommands = [
  { command: 'markets', description: 'List all active prediction markets' },
  { command: 'price <symbol>', description: 'Get current price for a market' },
  { command: 'buy <symbol> <amount>', description: 'Place a buy order' },
  { command: 'sell <symbol> <amount>', description: 'Place a sell order' },
  { command: 'portfolio', description: 'View your current positions' },
  { command: 'history <symbol>', description: 'View price history' },
  { command: 'alerts', description: 'View price alerts' },
  { command: 'help', description: 'Show available commands' },
];

// News feed for the terminal
export const newsFeed = [
  { id: 1, time: '2 min ago', title: 'OpenAI announces GPT-5 preview', impact: 'high', symbols: ['G5PHD', 'AGI27'] },
  { id: 2, time: '15 min ago', title: 'Anthropic releases Claude 4 benchmarks', impact: 'medium', symbols: ['CLCON', 'ALIGN'] },
  { id: 3, time: '32 min ago', title: 'EU AI Act enforcement begins', impact: 'medium', symbols: ['AILAW'] },
  { id: 4, time: '1 hr ago', title: 'Tesla Bot enters limited production', impact: 'high', symbols: ['ROBOT'] },
  { id: 5, time: '2 hr ago', title: 'DeepMind achieves 5x training efficiency', impact: 'medium', symbols: ['COMP10'] },
  { id: 6, time: '3 hr ago', title: 'New consciousness evaluation framework proposed', impact: 'low', symbols: ['CLCON'] },
];
