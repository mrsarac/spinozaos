import type { Meta, StoryObj } from '@storybook/react';
import { Gauge, GaugeCluster, type GaugeConfig } from '@spinozaos/react';
import { Cpu, HardDrive, Wifi, Thermometer, Activity, Zap } from 'lucide-react';

const systemGauges: GaugeConfig[] = [
  { id: '1', label: 'CPU', value: 67, unit: '%', thresholds: { warning: 70, critical: 90 }, icon: <Cpu className="w-4 h-4" /> },
  { id: '2', label: 'Memory', value: 45, unit: '%', thresholds: { warning: 80, critical: 95 }, icon: <HardDrive className="w-4 h-4" /> },
  { id: '3', label: 'Network', value: 23, unit: '%', thresholds: { warning: 70, critical: 90 }, icon: <Wifi className="w-4 h-4" /> },
  { id: '4', label: 'Temp', value: 58, unit: '°C', max: 100, thresholds: { warning: 70, critical: 85 }, icon: <Thermometer className="w-4 h-4" /> },
];

const performanceGauges: GaugeConfig[] = [
  { id: '1', label: 'Accuracy', value: 89, unit: '%', thresholds: { warning: 70, critical: 50 } },
  { id: '2', label: 'Confidence', value: 73, unit: '%', thresholds: { warning: 60, critical: 40 } },
  { id: '3', label: 'Speed', value: 95, unit: 'ms', max: 200, thresholds: { warning: 150, critical: 180 } },
  { id: '4', label: 'Uptime', value: 99.9, unit: '%', thresholds: { warning: 99, critical: 95 } },
];

const meta: Meta<typeof GaugeCluster> = {
  title: 'Components/GaugeCluster',
  component: GaugeCluster,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'SVG-based animated gauges for dashboard metrics with threshold coloring. Part of Substance design language.',
      },
    },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof GaugeCluster>;

// Single Gauge
export const SingleGauge: Story = {
  render: () => (
    <Gauge
      id="cpu"
      label="CPU Usage"
      value={67}
      unit="%"
      thresholds={{ warning: 70, critical: 90 }}
      size="lg"
      animated
    />
  ),
};

// Gauge Sizes
export const GaugeSizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <Gauge id="sm" label="Small" value={45} unit="%" size="sm" />
      <Gauge id="md" label="Medium" value={67} unit="%" size="md" />
      <Gauge id="lg" label="Large" value={89} unit="%" size="lg" />
    </div>
  ),
};

// Threshold Colors
export const ThresholdColors: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <Gauge
        id="low"
        label="Normal"
        value={45}
        unit="%"
        thresholds={{ warning: 60, critical: 80 }}
        size="md"
      />
      <Gauge
        id="warning"
        label="Warning"
        value={72}
        unit="%"
        thresholds={{ warning: 60, critical: 80 }}
        size="md"
      />
      <Gauge
        id="critical"
        label="Critical"
        value={92}
        unit="%"
        thresholds={{ warning: 60, critical: 80 }}
        size="md"
      />
    </div>
  ),
};

// Row Layout
export const RowLayout: Story = {
  args: {
    gauges: systemGauges,
    layout: 'row',
    size: 'md',
    animated: true,
  },
};

// Grid Layout
export const GridLayout: Story = {
  args: {
    gauges: systemGauges,
    layout: 'grid',
    size: 'md',
    animated: true,
  },
};

// Without Animation
export const NoAnimation: Story = {
  args: {
    gauges: systemGauges,
    layout: 'row',
    size: 'md',
    animated: false,
  },
};

// With Icons
export const WithIcons: Story = {
  args: {
    gauges: systemGauges,
    layout: 'row',
    size: 'lg',
    animated: true,
  },
};

// Performance Metrics
export const PerformanceMetrics: Story = {
  args: {
    gauges: performanceGauges,
    layout: 'grid',
    size: 'md',
    animated: true,
  },
};

// Small Cluster
export const SmallCluster: Story = {
  args: {
    gauges: systemGauges,
    layout: 'row',
    size: 'sm',
    animated: true,
  },
};

// Large Cluster
export const LargeCluster: Story = {
  args: {
    gauges: systemGauges,
    layout: 'grid',
    size: 'lg',
    animated: true,
  },
};

// In Dashboard Context
export const DashboardContext: Story = {
  render: () => (
    <div className="bg-void p-6 space-y-6">
      <div className="analytics-card">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-spinoza-yellow" />
            System Health
          </h3>
        </div>
        <div className="p-6">
          <GaugeCluster
            gauges={systemGauges}
            layout="row"
            size="md"
            animated
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="analytics-card p-4">
          <h4 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">CPU Status</h4>
          <Gauge
            id="cpu-detail"
            label="CPU Load"
            value={67}
            unit="%"
            thresholds={{ warning: 70, critical: 90 }}
            size="lg"
            icon={<Cpu className="w-5 h-5" />}
            animated
          />
        </div>
        <div className="analytics-card p-4">
          <h4 className="text-xs text-neutral-500 uppercase tracking-wider mb-4">Memory Status</h4>
          <Gauge
            id="mem-detail"
            label="Memory Usage"
            value={45}
            unit="%"
            thresholds={{ warning: 80, critical: 95 }}
            size="lg"
            icon={<HardDrive className="w-5 h-5" />}
            animated
          />
        </div>
      </div>
    </div>
  ),
};

// Real-time Simulation
export const RealTimeSimulation: Story = {
  render: () => {
    const dynamicGauges: GaugeConfig[] = [
      { id: '1', label: 'Active Users', value: Math.floor(Math.random() * 100), thresholds: { warning: 80, critical: 95 } },
      { id: '2', label: 'API Calls/s', value: Math.floor(Math.random() * 100), thresholds: { warning: 70, critical: 90 } },
      { id: '3', label: 'Cache Hit', value: 85 + Math.floor(Math.random() * 15), unit: '%', thresholds: { warning: 70, critical: 50 } },
      { id: '4', label: 'Queue Depth', value: Math.floor(Math.random() * 100), thresholds: { warning: 60, critical: 80 } },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-spinoza-yellow" />
          <span className="text-sm text-white">Real-time Metrics (refresh page for new values)</span>
        </div>
        <GaugeCluster
          gauges={dynamicGauges}
          layout="row"
          size="md"
          animated
        />
      </div>
    );
  },
};
