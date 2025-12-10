// Revenue Data
export interface RevenueData {
  date: string;
  revenue: number;
  profit: number;
  costs: number;
}

export const revenueData: RevenueData[] = [
  { date: 'Jan', revenue: 4200, profit: 2400, costs: 1800 },
  { date: 'Feb', revenue: 3800, profit: 1800, costs: 2000 },
  { date: 'Mar', revenue: 5100, profit: 3200, costs: 1900 },
  { date: 'Apr', revenue: 4800, profit: 2800, costs: 2000 },
  { date: 'May', revenue: 6200, profit: 4100, costs: 2100 },
  { date: 'Jun', revenue: 5800, profit: 3600, costs: 2200 },
  { date: 'Jul', revenue: 7100, profit: 4800, costs: 2300 },
  { date: 'Aug', revenue: 6800, profit: 4400, costs: 2400 },
  { date: 'Sep', revenue: 7500, profit: 5100, costs: 2400 },
  { date: 'Oct', revenue: 8200, profit: 5800, costs: 2400 },
  { date: 'Nov', revenue: 7800, profit: 5400, costs: 2400 },
  { date: 'Dec', revenue: 9100, profit: 6500, costs: 2600 },
];

// Traffic Sources
export interface TrafficSource {
  name: string;
  value: number;
  color: string;
  growth: number;
}

export const trafficSources: TrafficSource[] = [
  { name: 'Direct', value: 42, color: '#fbbf24', growth: 12.3 },
  { name: 'Organic Search', value: 28, color: '#22c55e', growth: 8.7 },
  { name: 'Referral', value: 18, color: '#3b82f6', growth: -2.4 },
  { name: 'Social Media', value: 12, color: '#8b5cf6', growth: 24.1 },
];

// User Engagement
export interface EngagementData {
  hour: string;
  activeUsers: number;
  sessions: number;
  pageViews: number;
}

export const engagementData: EngagementData[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0') + ':00';
  const baseUsers = 500 + Math.sin(i * 0.3) * 300;
  return {
    hour,
    activeUsers: Math.round(baseUsers + Math.random() * 100),
    sessions: Math.round(baseUsers * 1.5 + Math.random() * 150),
    pageViews: Math.round(baseUsers * 4 + Math.random() * 400),
  };
});

// KPI Metrics
export interface KPIMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  sparklineData: number[];
  icon: string;
}

export const kpiMetrics: KPIMetric[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$847.2K',
    change: 12.5,
    trend: 'up',
    sparklineData: [40, 42, 38, 45, 48, 52, 55, 58, 62, 67, 72, 78],
    icon: 'dollar',
  },
  {
    id: 'users',
    label: 'Active Users',
    value: '24.8K',
    change: 8.2,
    trend: 'up',
    sparklineData: [20, 22, 21, 24, 26, 25, 28, 30, 32, 34, 36, 38],
    icon: 'users',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '3.24%',
    change: -2.1,
    trend: 'down',
    sparklineData: [3.5, 3.4, 3.3, 3.4, 3.2, 3.3, 3.1, 3.2, 3.3, 3.2, 3.1, 3.24],
    icon: 'target',
  },
  {
    id: 'avg-session',
    label: 'Avg. Session',
    value: '4m 32s',
    change: 5.7,
    trend: 'up',
    sparklineData: [4.0, 4.1, 4.2, 4.1, 4.3, 4.4, 4.3, 4.5, 4.4, 4.5, 4.6, 4.53],
    icon: 'clock',
  },
];

// Funnel Data
export interface FunnelStage {
  name: string;
  value: number;
  percentage: number;
  dropoff: number;
}

export const funnelData: FunnelStage[] = [
  { name: 'Visitors', value: 100000, percentage: 100, dropoff: 0 },
  { name: 'Sign Ups', value: 32000, percentage: 32, dropoff: 68 },
  { name: 'Activated', value: 18400, percentage: 18.4, dropoff: 42.5 },
  { name: 'Subscribers', value: 7360, percentage: 7.36, dropoff: 60 },
  { name: 'Premium', value: 2208, percentage: 2.21, dropoff: 70 },
];

// Geographic Distribution
export interface GeoData {
  country: string;
  code: string;
  users: number;
  revenue: number;
  growth: number;
}

export const geoData: GeoData[] = [
  { country: 'United States', code: 'US', users: 12400, revenue: 428000, growth: 15.2 },
  { country: 'Germany', code: 'DE', users: 4200, revenue: 168000, growth: 22.8 },
  { country: 'United Kingdom', code: 'GB', users: 3800, revenue: 142000, growth: 8.4 },
  { country: 'France', code: 'FR', users: 2100, revenue: 78000, growth: 11.3 },
  { country: 'Japan', code: 'JP', users: 1800, revenue: 72000, growth: 18.6 },
  { country: 'Canada', code: 'CA', users: 1500, revenue: 58000, growth: 9.2 },
];

// Product Performance
export interface ProductData {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
  stock: number;
}

export const productData: ProductData[] = [
  { id: '1', name: 'Enterprise Plan', sales: 842, revenue: 252600, growth: 28.4, stock: -1 },
  { id: '2', name: 'Professional Plan', sales: 2156, revenue: 215600, growth: 15.2, stock: -1 },
  { id: '3', name: 'API Credits (1M)', sales: 4820, revenue: 144600, growth: 42.1, stock: -1 },
  { id: '4', name: 'Custom Integration', sales: 124, revenue: 124000, growth: 8.7, stock: 12 },
  { id: '5', name: 'Training Package', sales: 286, revenue: 85800, growth: -5.2, stock: 8 },
];

// Real-time Activity
export interface ActivityItem {
  id: string;
  type: 'signup' | 'purchase' | 'upgrade' | 'churn';
  user: string;
  details: string;
  amount?: number;
  timestamp: Date;
}

export const recentActivity: ActivityItem[] = [
  { id: '1', type: 'purchase', user: 'Acme Corp', details: 'Enterprise Plan - Annual', amount: 14400, timestamp: new Date(Date.now() - 2 * 60000) },
  { id: '2', type: 'signup', user: 'jane.doe@startup.io', details: 'New account created', timestamp: new Date(Date.now() - 5 * 60000) },
  { id: '3', type: 'upgrade', user: 'TechFlow Inc', details: 'Professional to Enterprise', amount: 7200, timestamp: new Date(Date.now() - 8 * 60000) },
  { id: '4', type: 'purchase', user: 'DataSync Ltd', details: 'API Credits (5M)', amount: 2450, timestamp: new Date(Date.now() - 12 * 60000) },
  { id: '5', type: 'churn', user: 'SmallBiz Co', details: 'Subscription cancelled', timestamp: new Date(Date.now() - 15 * 60000) },
  { id: '6', type: 'signup', user: 'mike.chen@enterprise.com', details: 'New account created', timestamp: new Date(Date.now() - 18 * 60000) },
  { id: '7', type: 'upgrade', user: 'CloudFirst', details: 'Starter to Professional', amount: 1200, timestamp: new Date(Date.now() - 22 * 60000) },
  { id: '8', type: 'purchase', user: 'AI Labs', details: 'Custom Integration', amount: 12000, timestamp: new Date(Date.now() - 30 * 60000) },
];

// Performance Metrics for Heatmap
export interface HeatmapData {
  day: string;
  hours: number[];
}

export const heatmapData: HeatmapData[] = [
  { day: 'Mon', hours: [12, 18, 24, 45, 62, 78, 85, 92, 88, 76, 68, 72, 84, 91, 87, 74, 58, 42, 35, 28, 22, 18, 14, 10] },
  { day: 'Tue', hours: [10, 15, 22, 48, 65, 82, 88, 94, 90, 78, 71, 75, 86, 93, 89, 76, 62, 45, 38, 30, 24, 19, 15, 11] },
  { day: 'Wed', hours: [11, 16, 25, 52, 68, 85, 91, 96, 92, 80, 73, 77, 88, 95, 91, 78, 64, 48, 40, 32, 26, 20, 16, 12] },
  { day: 'Thu', hours: [13, 19, 28, 55, 72, 88, 94, 98, 95, 82, 75, 79, 90, 97, 93, 80, 66, 50, 42, 34, 28, 22, 17, 13] },
  { day: 'Fri', hours: [14, 20, 30, 50, 68, 84, 90, 95, 91, 79, 72, 76, 87, 94, 90, 77, 63, 47, 39, 31, 25, 19, 15, 11] },
  { day: 'Sat', hours: [8, 10, 14, 22, 32, 45, 52, 58, 55, 48, 42, 45, 52, 58, 55, 48, 40, 32, 26, 20, 16, 12, 9, 7] },
  { day: 'Sun', hours: [6, 8, 11, 18, 26, 38, 45, 50, 48, 42, 36, 38, 45, 50, 48, 42, 35, 28, 22, 17, 13, 10, 8, 6] },
];

// Date range options
export const dateRanges = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: 'ytd', label: 'Year to date' },
  { id: 'custom', label: 'Custom range' },
];
