// Command Center Mock Data

export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  max: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: number[];
}

export interface Service {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  uptime: string;
  latency: number;
  region: string;
  lastCheck: Date;
  instances: number;
  healthyInstances: number;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug' | 'trace';
  service: string;
  message: string;
  metadata?: Record<string, string>;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  acknowledged: boolean;
  service: string;
}

export interface Process {
  id: string;
  name: string;
  pid: number;
  cpu: number;
  memory: number;
  status: 'running' | 'sleeping' | 'stopped';
  user: string;
  startTime: Date;
}

// Generate trend data
function generateTrend(baseValue: number, variance: number = 10): number[] {
  return Array.from({ length: 20 }, () =>
    Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance))
  );
}

export const systemMetrics: SystemMetric[] = [
  {
    id: 'cpu',
    name: 'CPU Usage',
    value: 42,
    max: 100,
    unit: '%',
    status: 'normal',
    trend: generateTrend(42, 15),
  },
  {
    id: 'memory',
    name: 'Memory',
    value: 67,
    max: 100,
    unit: '%',
    status: 'warning',
    trend: generateTrend(67, 8),
  },
  {
    id: 'disk',
    name: 'Disk I/O',
    value: 23,
    max: 100,
    unit: '%',
    status: 'normal',
    trend: generateTrend(23, 20),
  },
  {
    id: 'network',
    name: 'Network',
    value: 156,
    max: 1000,
    unit: 'Mbps',
    status: 'normal',
    trend: generateTrend(15, 10),
  },
  {
    id: 'gpu',
    name: 'GPU Usage',
    value: 89,
    max: 100,
    unit: '%',
    status: 'critical',
    trend: generateTrend(89, 5),
  },
  {
    id: 'temp',
    name: 'Temperature',
    value: 72,
    max: 100,
    unit: '°C',
    status: 'warning',
    trend: generateTrend(72, 3),
  },
];

export const services: Service[] = [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    status: 'online',
    uptime: '99.99%',
    latency: 12,
    region: 'us-east-1',
    lastCheck: new Date(),
    instances: 5,
    healthyInstances: 5,
  },
  {
    id: 'auth-service',
    name: 'Auth Service',
    status: 'online',
    uptime: '99.95%',
    latency: 23,
    region: 'us-east-1',
    lastCheck: new Date(),
    instances: 3,
    healthyInstances: 3,
  },
  {
    id: 'inference-engine',
    name: 'Inference Engine',
    status: 'degraded',
    uptime: '98.2%',
    latency: 145,
    region: 'us-west-2',
    lastCheck: new Date(),
    instances: 8,
    healthyInstances: 6,
  },
  {
    id: 'model-registry',
    name: 'Model Registry',
    status: 'online',
    uptime: '99.99%',
    latency: 8,
    region: 'eu-west-1',
    lastCheck: new Date(),
    instances: 2,
    healthyInstances: 2,
  },
  {
    id: 'data-pipeline',
    name: 'Data Pipeline',
    status: 'online',
    uptime: '99.8%',
    latency: 34,
    region: 'us-east-1',
    lastCheck: new Date(),
    instances: 4,
    healthyInstances: 4,
  },
  {
    id: 'vector-db',
    name: 'Vector Database',
    status: 'maintenance',
    uptime: '99.5%',
    latency: 0,
    region: 'us-west-2',
    lastCheck: new Date(),
    instances: 3,
    healthyInstances: 0,
  },
  {
    id: 'cache-layer',
    name: 'Cache Layer',
    status: 'online',
    uptime: '99.99%',
    latency: 2,
    region: 'global',
    lastCheck: new Date(),
    instances: 12,
    healthyInstances: 12,
  },
  {
    id: 'metrics-collector',
    name: 'Metrics Collector',
    status: 'online',
    uptime: '99.9%',
    latency: 5,
    region: 'us-east-1',
    lastCheck: new Date(),
    instances: 2,
    healthyInstances: 2,
  },
];

const logMessages = [
  { level: 'info' as const, message: 'Request processed successfully', service: 'api-gateway' },
  { level: 'debug' as const, message: 'Cache hit for key: user_session_12345', service: 'cache-layer' },
  { level: 'warn' as const, message: 'High latency detected on inference request', service: 'inference-engine' },
  { level: 'error' as const, message: 'Connection timeout to vector database', service: 'vector-db' },
  { level: 'info' as const, message: 'Model v2.3.1 deployed successfully', service: 'model-registry' },
  { level: 'trace' as const, message: 'Token validation passed', service: 'auth-service' },
  { level: 'warn' as const, message: 'Memory usage approaching threshold', service: 'inference-engine' },
  { level: 'info' as const, message: 'Batch job completed: 1.2M records processed', service: 'data-pipeline' },
  { level: 'debug' as const, message: 'Metrics aggregation completed', service: 'metrics-collector' },
  { level: 'error' as const, message: 'Rate limit exceeded for client: api_key_xyz', service: 'api-gateway' },
  { level: 'info' as const, message: 'Health check passed', service: 'auth-service' },
  { level: 'warn' as const, message: 'Scheduled maintenance in 15 minutes', service: 'vector-db' },
];

export function generateLogs(count: number = 50): LogEntry[] {
  const logs: LogEntry[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const template = logMessages[Math.floor(Math.random() * logMessages.length)];
    logs.push({
      id: `log-${now}-${i}`,
      timestamp: new Date(now - i * Math.random() * 10000),
      level: template.level,
      service: template.service,
      message: template.message,
      metadata: Math.random() > 0.7 ? { requestId: `req-${Math.random().toString(36).substr(2, 9)}` } : undefined,
    });
  }

  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'High GPU Utilization',
    message: 'GPU usage has been above 85% for the last 10 minutes',
    severity: 'high',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    acknowledged: false,
    service: 'inference-engine',
  },
  {
    id: 'alert-2',
    title: 'Memory Warning',
    message: 'Memory usage approaching 70% threshold',
    severity: 'medium',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    acknowledged: true,
    service: 'data-pipeline',
  },
  {
    id: 'alert-3',
    title: 'Service Degradation',
    message: '2 instances of Inference Engine are unhealthy',
    severity: 'high',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    acknowledged: false,
    service: 'inference-engine',
  },
  {
    id: 'alert-4',
    title: 'Scheduled Maintenance',
    message: 'Vector Database maintenance window starting soon',
    severity: 'low',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    acknowledged: true,
    service: 'vector-db',
  },
  {
    id: 'alert-5',
    title: 'Connection Errors',
    message: 'Intermittent connection failures to vector database',
    severity: 'critical',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    acknowledged: false,
    service: 'vector-db',
  },
];

export const processes: Process[] = [
  { id: 'p1', name: 'inference-worker', pid: 12345, cpu: 45.2, memory: 2048, status: 'running', user: 'spinoza', startTime: new Date(Date.now() - 86400000) },
  { id: 'p2', name: 'api-server', pid: 12346, cpu: 12.8, memory: 512, status: 'running', user: 'spinoza', startTime: new Date(Date.now() - 172800000) },
  { id: 'p3', name: 'cache-manager', pid: 12347, cpu: 3.2, memory: 1024, status: 'running', user: 'spinoza', startTime: new Date(Date.now() - 259200000) },
  { id: 'p4', name: 'log-aggregator', pid: 12348, cpu: 8.5, memory: 256, status: 'running', user: 'root', startTime: new Date(Date.now() - 43200000) },
  { id: 'p5', name: 'model-loader', pid: 12349, cpu: 0.1, memory: 4096, status: 'sleeping', user: 'spinoza', startTime: new Date(Date.now() - 3600000) },
  { id: 'p6', name: 'health-checker', pid: 12350, cpu: 1.1, memory: 128, status: 'running', user: 'spinoza', startTime: new Date(Date.now() - 604800000) },
];

// Terminal commands
export const terminalCommands = [
  { command: 'status', description: 'Show system status overview' },
  { command: 'services', description: 'List all services and their status' },
  { command: 'logs [service]', description: 'Show recent logs (optionally filter by service)' },
  { command: 'alerts', description: 'Show active alerts' },
  { command: 'processes', description: 'List running processes' },
  { command: 'restart <service>', description: 'Restart a service' },
  { command: 'scale <service> <count>', description: 'Scale service instances' },
  { command: 'clear', description: 'Clear terminal' },
  { command: 'help', description: 'Show available commands' },
];
