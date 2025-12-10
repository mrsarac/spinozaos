import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid, formatNumber, formatCurrency, formatPercent, formatDate, type Column } from '@spinozaos/react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  lastUpdate: Date;
}

const sampleData: MarketData[] = [
  { id: '1', symbol: 'AGI-2026', name: 'AGI by 2026', price: 0.34, change: 12.5, volume: 1234567, marketCap: 45000000, lastUpdate: new Date() },
  { id: '2', symbol: 'AGI-2027', name: 'AGI by 2027', price: 0.52, change: 8.2, volume: 987654, marketCap: 78000000, lastUpdate: new Date() },
  { id: '3', symbol: 'GPT-5', name: 'GPT-5 Release Q1', price: 0.78, change: -3.4, volume: 2345678, marketCap: 120000000, lastUpdate: new Date() },
  { id: '4', symbol: 'ROBOT-2025', name: 'Humanoid Robot Mass Prod', price: 0.23, change: 5.7, volume: 567890, marketCap: 23000000, lastUpdate: new Date() },
  { id: '5', symbol: 'AUTO-L5', name: 'Level 5 Autonomy', price: 0.45, change: -1.2, volume: 890123, marketCap: 56000000, lastUpdate: new Date() },
  { id: '6', symbol: 'NEURA-2025', name: 'Neuralink FDA Approval', price: 0.67, change: 15.8, volume: 1456789, marketCap: 89000000, lastUpdate: new Date() },
  { id: '7', symbol: 'QUANT-2026', name: 'Quantum Advantage', price: 0.12, change: -8.9, volume: 234567, marketCap: 12000000, lastUpdate: new Date() },
  { id: '8', symbol: 'MARS-2030', name: 'Mars Landing', price: 0.89, change: 2.1, volume: 3456789, marketCap: 234000000, lastUpdate: new Date() },
];

const columns: Column<MarketData>[] = [
  { key: 'symbol', header: 'Symbol', width: 100 },
  { key: 'name', header: 'Market Name', width: 200 },
  {
    key: 'price',
    header: 'Price',
    align: 'right',
    render: (value) => formatCurrency(value, 2),
  },
  {
    key: 'change',
    header: 'Change',
    align: 'right',
    sortable: true,
    render: (value) => formatPercent(value, 1),
  },
  {
    key: 'volume',
    header: 'Volume',
    align: 'right',
    sortable: true,
    render: (value) => formatNumber(value, 0),
  },
  {
    key: 'marketCap',
    header: 'Market Cap',
    align: 'right',
    sortable: true,
    render: (value) => formatCurrency(value / 1000000, 1) + 'M',
  },
  {
    key: 'lastUpdate',
    header: 'Updated',
    align: 'right',
    render: (value) => formatDate(value),
  },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Components/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bloomberg-style dense data table with sorting, pagination, and custom cell renderers. Part of Substance design language.',
      },
    },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// Default
export const Default: Story = {
  render: () => (
    <DataGrid
      data={sampleData}
      columns={columns}
      sortable
    />
  ),
};

// With Pagination
export const WithPagination: Story = {
  render: () => (
    <DataGrid
      data={sampleData}
      columns={columns}
      pageSize={4}
      sortable
    />
  ),
};

// Striped Rows
export const Striped: Story = {
  render: () => (
    <DataGrid
      data={sampleData}
      columns={columns}
      striped
      sortable
    />
  ),
};

// Compact Mode
export const Compact: Story = {
  render: () => (
    <DataGrid
      data={sampleData}
      columns={columns}
      compact
      sortable
    />
  ),
};

// With Sticky Header
export const StickyHeader: Story = {
  render: () => (
    <div className="h-64 overflow-auto">
      <DataGrid
        data={sampleData}
        columns={columns}
        stickyHeader
        sortable
      />
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  render: () => (
    <DataGrid
      data={[]}
      columns={columns}
      loading
    />
  ),
};

// Empty State
export const Empty: Story = {
  render: () => (
    <DataGrid
      data={[]}
      columns={columns}
      emptyMessage="No markets found. Try adjusting your filters."
    />
  ),
};

// Clickable Rows
export const ClickableRows: Story = {
  render: () => (
    <DataGrid
      data={sampleData}
      columns={columns}
      onRowClick={(row) => alert(`Clicked: ${row.name}`)}
    />
  ),
};

// Custom Cell Renderers
export const CustomRenderers: Story = {
  render: () => {
    const customColumns: Column<MarketData>[] = [
      {
        key: 'symbol',
        header: 'Symbol',
        render: (value) => (
          <span className="px-2 py-0.5 bg-spinoza-yellow/20 text-spinoza-yellow rounded text-xs font-mono">
            {value}
          </span>
        ),
      },
      { key: 'name', header: 'Market Name' },
      {
        key: 'change',
        header: 'Trend',
        align: 'center',
        render: (value) => (
          <div className="flex items-center justify-center gap-1">
            {value >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
              {Math.abs(value).toFixed(1)}%
            </span>
          </div>
        ),
      },
      {
        key: 'volume',
        header: 'Activity',
        align: 'right',
        render: (value) => {
          const level = value > 2000000 ? 'high' : value > 1000000 ? 'medium' : 'low';
          const colors = { high: 'text-green-400', medium: 'text-yellow-400', low: 'text-neutral-500' };
          return (
            <div className="flex items-center justify-end gap-2">
              <Activity className={`w-3 h-3 ${colors[level]}`} />
              <span>{formatNumber(value, 0)}</span>
            </div>
          );
        },
      },
    ];

    return (
      <DataGrid
        data={sampleData}
        columns={customColumns}
        sortable
      />
    );
  },
};

// Full Featured
export const FullFeatured: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">AGI Prediction Markets</h2>
        <span className="text-xs text-neutral-500">Updated: {new Date().toLocaleTimeString()}</span>
      </div>
      <DataGrid
        data={sampleData}
        columns={columns}
        pageSize={5}
        sortable
        striped
        stickyHeader
        onRowClick={(row) => console.log('Selected:', row)}
      />
    </div>
  ),
};
