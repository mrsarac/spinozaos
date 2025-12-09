'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  BookOpen,
  History,
  Bell,
  Settings,
  Terminal,
  PieChart,
  Newspaper,
  HelpCircle,
} from 'lucide-react';

const menuItems = [
  { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', active: true },
  { icon: <TrendingUp className="w-4 h-4" />, label: 'Markets', badge: '8' },
  { icon: <BookOpen className="w-4 h-4" />, label: 'Order Book' },
  { icon: <History className="w-4 h-4" />, label: 'Trade History' },
  { icon: <PieChart className="w-4 h-4" />, label: 'Portfolio' },
  { icon: <Newspaper className="w-4 h-4" />, label: 'News Feed', badge: '3' },
  { icon: <Terminal className="w-4 h-4" />, label: 'Terminal' },
];

const bottomItems = [
  { icon: <Bell className="w-4 h-4" />, label: 'Alerts', badge: '2' },
  { icon: <Settings className="w-4 h-4" />, label: 'Settings' },
  { icon: <HelpCircle className="w-4 h-4" />, label: 'Help' },
];

export function Sidebar() {
  return (
    <aside className="w-48 bg-void-light/50 border-r border-white/5 flex flex-col">
      {/* Menu items */}
      <nav className="flex-1 py-3">
        <div className="px-3 mb-2">
          <span className="text-[9px] uppercase tracking-widest text-neutral-600">Navigation</span>
        </div>
        {menuItems.map((item, index) => (
          <MenuItem key={item.label} {...item} index={index} />
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Bottom items */}
      <div className="py-3">
        <div className="px-3 mb-2">
          <span className="text-[9px] uppercase tracking-widest text-neutral-600">System</span>
        </div>
        {bottomItems.map((item, index) => (
          <MenuItem key={item.label} {...item} index={index} />
        ))}
      </div>

      {/* User info */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-gradient-to-br from-spinoza-yellow/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-spinoza-yellow">MS</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-white truncate">oracle_trader</div>
            <div className="text-[9px] text-green-400">VERIFIED</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MenuItem({
  icon,
  label,
  active,
  badge,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        w-full flex items-center gap-2 px-3 py-2 text-left
        transition-all duration-200 relative group
        ${active
          ? 'text-spinoza-yellow bg-spinoza-yellow/10'
          : 'text-neutral-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-spinoza-yellow"
        />
      )}
      <span className={active ? 'text-spinoza-yellow' : 'group-hover:text-spinoza-yellow transition-colors'}>
        {icon}
      </span>
      <span className="text-[11px] flex-1">{label}</span>
      {badge && (
        <span className={`
          text-[9px] px-1.5 py-0.5 rounded-full
          ${active
            ? 'bg-spinoza-yellow/20 text-spinoza-yellow'
            : 'bg-white/10 text-neutral-400'
          }
        `}>
          {badge}
        </span>
      )}
    </motion.button>
  );
}
