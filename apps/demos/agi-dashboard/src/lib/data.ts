// Mock data for AGI Dashboard demo

export interface Metric {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  description?: string;
}

export interface Prediction {
  id: string;
  title: string;
  confidence: number;
  clearance: 'cosmic' | 'topSecret' | 'secret' | 'classified' | 'standard';
  timestamp: string;
  category: string;
  status: 'active' | 'pending' | 'completed';
}

export interface TimeSeriesPoint {
  time: string;
  value: number;
  baseline?: number;
}

export interface ActivityItem {
  id: string;
  type: 'prediction' | 'alert' | 'update' | 'milestone';
  message: string;
  timestamp: string;
  severity?: 'info' | 'warning' | 'critical';
}

// Dashboard metrics
export const metrics: Metric[] = [
  {
    id: 'accuracy',
    label: 'Prediction Accuracy',
    value: '94.7%',
    trend: 'up',
    trendValue: '+2.3%',
    description: 'Model prediction accuracy over last 24h',
  },
  {
    id: 'latency',
    label: 'Avg Response Time',
    value: '127ms',
    trend: 'down',
    trendValue: '-15ms',
    description: 'Average inference latency',
  },
  {
    id: 'throughput',
    label: 'Throughput',
    value: '12.4K/s',
    trend: 'up',
    trendValue: '+8.2%',
    description: 'Predictions per second',
  },
  {
    id: 'uptime',
    label: 'System Uptime',
    value: '99.97%',
    trend: 'stable',
    trendValue: '0%',
    description: 'Last 30 days availability',
  },
];

// Active predictions
export const predictions: Prediction[] = [
  {
    id: 'pred-001',
    title: 'Market Volatility Spike',
    confidence: 87,
    clearance: 'topSecret',
    timestamp: '2 min ago',
    category: 'Finance',
    status: 'active',
  },
  {
    id: 'pred-002',
    title: 'Supply Chain Disruption',
    confidence: 72,
    clearance: 'secret',
    timestamp: '5 min ago',
    category: 'Logistics',
    status: 'active',
  },
  {
    id: 'pred-003',
    title: 'Energy Grid Anomaly',
    confidence: 94,
    clearance: 'cosmic',
    timestamp: '12 min ago',
    category: 'Infrastructure',
    status: 'pending',
  },
  {
    id: 'pred-004',
    title: 'Consumer Sentiment Shift',
    confidence: 65,
    clearance: 'classified',
    timestamp: '18 min ago',
    category: 'Marketing',
    status: 'active',
  },
  {
    id: 'pred-005',
    title: 'Regulatory Change Detection',
    confidence: 81,
    clearance: 'standard',
    timestamp: '25 min ago',
    category: 'Compliance',
    status: 'completed',
  },
];

// Time series data for charts
export const performanceData: TimeSeriesPoint[] = [
  { time: '00:00', value: 92.1, baseline: 90 },
  { time: '02:00', value: 91.8, baseline: 90 },
  { time: '04:00', value: 93.2, baseline: 90 },
  { time: '06:00', value: 94.5, baseline: 90 },
  { time: '08:00', value: 95.1, baseline: 90 },
  { time: '10:00', value: 94.8, baseline: 90 },
  { time: '12:00', value: 93.9, baseline: 90 },
  { time: '14:00', value: 94.2, baseline: 90 },
  { time: '16:00', value: 95.3, baseline: 90 },
  { time: '18:00', value: 94.9, baseline: 90 },
  { time: '20:00', value: 94.6, baseline: 90 },
  { time: '22:00', value: 94.7, baseline: 90 },
];

export const throughputData: TimeSeriesPoint[] = [
  { time: '00:00', value: 8200 },
  { time: '02:00', value: 6100 },
  { time: '04:00', value: 4800 },
  { time: '06:00', value: 7200 },
  { time: '08:00', value: 11500 },
  { time: '10:00', value: 13200 },
  { time: '12:00', value: 12800 },
  { time: '14:00', value: 14100 },
  { time: '16:00', value: 13500 },
  { time: '18:00', value: 11200 },
  { time: '20:00', value: 9800 },
  { time: '22:00', value: 8900 },
];

// Activity feed
export const activities: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'prediction',
    message: 'New high-confidence prediction: Market Volatility Spike',
    timestamp: '2 min ago',
    severity: 'warning',
  },
  {
    id: 'act-002',
    type: 'milestone',
    message: 'Model accuracy exceeded 94% threshold',
    timestamp: '15 min ago',
    severity: 'info',
  },
  {
    id: 'act-003',
    type: 'alert',
    message: 'Unusual pattern detected in sector Alpha-7',
    timestamp: '32 min ago',
    severity: 'critical',
  },
  {
    id: 'act-004',
    type: 'update',
    message: 'Model weights updated: v2.4.1 → v2.4.2',
    timestamp: '1 hour ago',
    severity: 'info',
  },
  {
    id: 'act-005',
    type: 'prediction',
    message: 'Prediction confirmed: Q3 Revenue Forecast (+12%)',
    timestamp: '2 hours ago',
    severity: 'info',
  },
];

// Category distribution for bar chart
export const categoryDistribution = [
  { category: 'Finance', predictions: 42, accuracy: 91 },
  { category: 'Logistics', predictions: 28, accuracy: 88 },
  { category: 'Infrastructure', predictions: 19, accuracy: 95 },
  { category: 'Marketing', predictions: 35, accuracy: 82 },
  { category: 'Compliance', predictions: 24, accuracy: 89 },
];
