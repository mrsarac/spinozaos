import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Activity, TrendingUp } from 'lucide-react';
import { StatCard, StatGrid, QuickStats } from '../components/StatCard';

describe('StatCard', () => {
  describe('Rendering', () => {
    it('renders label and value', () => {
      render(<StatCard label="Total Users" value={1234} />);
      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('renders with string value', () => {
      render(<StatCard label="Status" value="Active" />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      render(<StatCard label="Activity" value={42} icon={Activity} />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<StatCard label="Test" value={0} className="custom-card" />);
      expect(document.querySelector('.custom-card')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<StatCard label="Test" value={0} variant="default" />);
      expect(document.querySelector('.bg-void')).toBeInTheDocument();
    });

    it('renders bordered variant', () => {
      render(<StatCard label="Test" value={0} variant="bordered" />);
      expect(document.querySelector('.border')).toBeInTheDocument();
    });

    it('renders elevated variant', () => {
      render(<StatCard label="Test" value={0} variant="elevated" />);
      expect(document.querySelector('.shadow-lg')).toBeInTheDocument();
    });

    it('renders gradient variant', () => {
      render(<StatCard label="Test" value={0} variant="gradient" />);
      expect(document.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<StatCard label="Test" value={0} size="sm" />);
      expect(document.querySelector('.p-3')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<StatCard label="Test" value={0} size="md" />);
      expect(document.querySelector('.p-4')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<StatCard label="Test" value={0} size="lg" />);
      expect(document.querySelector('.p-6')).toBeInTheDocument();
    });
  });

  describe('Value Colors', () => {
    it('renders default color', () => {
      render(<StatCard label="Test" value={0} valueColor="default" />);
      expect(document.querySelector('.text-white')).toBeInTheDocument();
    });

    it('renders yellow color', () => {
      render(<StatCard label="Test" value={0} valueColor="yellow" />);
      expect(document.querySelector('.text-spinoza-yellow')).toBeInTheDocument();
    });

    it('renders teal color', () => {
      render(<StatCard label="Test" value={0} valueColor="teal" />);
      expect(document.querySelector('.text-teal-400')).toBeInTheDocument();
    });

    it('renders purple color', () => {
      render(<StatCard label="Test" value={0} valueColor="purple" />);
      expect(document.querySelector('.text-purple-400')).toBeInTheDocument();
    });

    it('renders green color', () => {
      render(<StatCard label="Test" value={0} valueColor="green" />);
      expect(document.querySelector('.text-green-400')).toBeInTheDocument();
    });

    it('renders red color', () => {
      render(<StatCard label="Test" value={0} valueColor="red" />);
      expect(document.querySelector('.text-red-400')).toBeInTheDocument();
    });
  });

  describe('Trend Indicator', () => {
    it('renders up trend', () => {
      render(<StatCard label="Test" value={0} trend="up" trendValue="+12%" />);
      expect(screen.getByText('+12%')).toBeInTheDocument();
      expect(document.querySelector('.text-green-400')).toBeInTheDocument();
    });

    it('renders down trend', () => {
      render(<StatCard label="Test" value={0} trend="down" trendValue="-5%" />);
      expect(screen.getByText('-5%')).toBeInTheDocument();
      expect(document.querySelector('.text-red-400')).toBeInTheDocument();
    });

    it('renders neutral trend', () => {
      render(<StatCard label="Test" value={0} trend="neutral" trendValue="0%" />);
      expect(screen.getByText('0%')).toBeInTheDocument();
      expect(document.querySelector('.text-neutral-400')).toBeInTheDocument();
    });

    it('renders trend icon without value', () => {
      render(<StatCard label="Test" value={0} trend="up" />);
      // TrendingUp icon should be rendered even without trendValue
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Tooltip', () => {
    it('renders tooltip indicator', () => {
      render(<StatCard label="Test" value={0} tooltip="More info" />);
      const tooltipIcon = document.querySelector('[title="More info"]');
      expect(tooltipIcon).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('renders loading skeleton', () => {
      render(<StatCard label="Test" value={0} loading />);
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
      // Value should not be visible when loading
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('renders with animation when animated prop is true', () => {
      render(<StatCard label="Test" value={0} animated />);
      // Framer motion animates the value
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });
});

describe('StatGrid', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(
        <StatGrid>
          <StatCard label="Stat 1" value={1} />
          <StatCard label="Stat 2" value={2} />
        </StatGrid>
      );
      expect(screen.getByText('Stat 1')).toBeInTheDocument();
      expect(screen.getByText('Stat 2')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <StatGrid className="custom-grid">
          <StatCard label="Test" value={0} />
        </StatGrid>
      );
      expect(document.querySelector('.custom-grid')).toBeInTheDocument();
    });
  });

  describe('Columns', () => {
    it('renders with 2 columns', () => {
      render(
        <StatGrid columns={2}>
          <StatCard label="Test" value={0} />
        </StatGrid>
      );
      expect(document.querySelector('.grid-cols-2')).toBeInTheDocument();
    });

    it('renders with 4 columns (default)', () => {
      render(
        <StatGrid columns={4}>
          <StatCard label="Test" value={0} />
        </StatGrid>
      );
      expect(document.querySelector('.grid-cols-4')).toBeInTheDocument();
    });

    it('renders with 6 columns', () => {
      render(
        <StatGrid columns={6}>
          <StatCard label="Test" value={0} />
        </StatGrid>
      );
      expect(document.querySelector('.grid-cols-6')).toBeInTheDocument();
    });
  });

  describe('Gap', () => {
    it('renders with no gap (default)', () => {
      render(
        <StatGrid gap="none">
          <StatCard label="Test" value={0} />
        </StatGrid>
      );
      expect(document.querySelector('.gap-px')).toBeInTheDocument();
    });

    it('renders with small gap', () => {
      render(
        <StatGrid gap="sm">
          <StatCard label="Test" value={0} />
        </StatGrid>
      );
      expect(document.querySelector('.gap-2')).toBeInTheDocument();
    });

    it('renders with medium gap', () => {
      render(
        <StatGrid gap="md">
          <StatCard label="Test" value={0} />
        </StatGrid>
      );
      expect(document.querySelector('.gap-4')).toBeInTheDocument();
    });

    it('renders with large gap', () => {
      render(
        <StatGrid gap="lg">
          <StatCard label="Test" value={0} />
        </StatGrid>
      );
      expect(document.querySelector('.gap-6')).toBeInTheDocument();
    });
  });
});

describe('QuickStats', () => {
  const stats = [
    { label: 'Users', value: 100 },
    { label: 'Revenue', value: '$1000' },
    { label: 'Orders', value: 50 },
  ];

  it('renders all stats', () => {
    render(<QuickStats stats={stats} />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders stats with icons', () => {
    const statsWithIcons = [
      { label: 'Activity', value: 42, icon: Activity },
    ];
    render(<QuickStats stats={statsWithIcons} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('passes variant to StatCards', () => {
    render(<QuickStats stats={stats} variant="bordered" />);
    const cards = document.querySelectorAll('.border');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('passes size to StatCards', () => {
    render(<QuickStats stats={stats} size="sm" />);
    const cards = document.querySelectorAll('.p-3');
    expect(cards.length).toBeGreaterThan(0);
  });
});
