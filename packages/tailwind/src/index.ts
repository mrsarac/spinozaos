// SpinozaOS Tailwind CSS Preset v0.1.0
// "More Geometrico" - Tailwind preset for the age of superintelligence

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const spinozaPreset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Void (Background)
        void: {
          DEFAULT: '#020617',
          light: '#0f172a',
          lighter: '#1e293b',
        },
        // Prophetic Gold
        spinoza: {
          yellow: '#fbbf24',
          gold: '#d97706',
          amber: '#f59e0b',
          dim: '#b45309',
        },
        // Oracle Premium
        oracle: {
          purple: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.3)',
        },
        // Semantic
        success: {
          DEFAULT: '#22c55e',
          dim: '#166534',
        },
        error: {
          DEFAULT: '#ef4444',
          dim: '#991b1b',
        },
        warning: '#f59e0b',
        info: '#3b82f6',
      },
      fontFamily: {
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ["'Inter'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", "'SF Mono'", 'Consolas', 'monospace'],
      },
      fontSize: {
        // Desktop
        display: ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'heading-1': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'heading-2': ['1.5rem', { lineHeight: '1.375' }],
        data: ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        // Touch targets
        'touch-min': '44px',
        'touch-optimal': '48px',
        'touch-large': '56px',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'glow-yellow': '0 0 20px rgba(251, 191, 36, 0.3)',
        'glow-yellow-intense': '0 0 40px rgba(251, 191, 36, 0.5)',
        'glow-oracle': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.3)',
      },
      backdropBlur: {
        glass: '12px',
        'glass-elevated': '16px',
      },
      transitionDuration: {
        instant: '100ms',
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
        glacial: '1000ms',
      },
      transitionTimingFunction: {
        enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
        exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        ios: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      zIndex: {
        dropdown: '10',
        sticky: '20',
        fixed: '30',
        'modal-backdrop': '40',
        modal: '50',
        popover: '60',
        tooltip: '70',
        toast: '80',
      },
      backgroundImage: {
        'gradient-card-hover': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
        'gradient-oracle': 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)',
        'gradient-progress': 'linear-gradient(90deg, #fbbf24 0%, #d97706 100%)',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, addComponents }) {
      // Glass utilities
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
        '.glass-elevated': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        '.glass-interactive': {
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(251, 191, 36, 0.20)',
        },
      });

      // Typography components
      addComponents({
        '.text-display': {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '3.75rem',
          fontWeight: '600',
          lineHeight: '1',
          letterSpacing: '-0.02em',
          color: '#ffffff',
        },
        '.text-heading-1': {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '2.25rem',
          fontWeight: '600',
          lineHeight: '1.25',
          letterSpacing: '-0.015em',
          color: '#ffffff',
        },
        '.text-heading-2': {
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '1.5rem',
          fontWeight: '600',
          lineHeight: '1.375',
          color: '#ffffff',
        },
        '.text-label': {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.625rem',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#64748b',
        },
        '.text-data': {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '3rem',
          fontWeight: '400',
          lineHeight: '1',
          color: '#fbbf24',
        },
      });
    }),
  ],
};

export default spinozaPreset;
export { spinozaPreset };
