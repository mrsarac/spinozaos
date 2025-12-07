// SpinozaOS Design Tokens v2.0
// "More Geometrico" - Design tokens for the age of superintelligence

// ============================================
// COLOR TOKENS
// ============================================

export const colors = {
  // Background Family - Void
  void: '#020617',
  voidLight: '#0f172a',
  voidLighter: '#1e293b',

  // Neutral Scale
  neutral: {
    900: '#0f172a',
    800: '#1e293b',
    700: '#334155',
    600: '#475569',
    500: '#64748b',
    400: '#94a3b8',
    300: '#cbd5e1',
    200: '#e2e8f0',
    100: '#f1f5f9',
  },

  // Accent - Prophetic Gold
  spinoza: {
    yellow: '#fbbf24',
    yellowDim: '#b45309',
    gold: '#d97706',
    amber: '#f59e0b',
  },

  // Semantic
  success: '#22c55e',
  successDim: '#166534',
  error: '#ef4444',
  errorDim: '#991b1b',
  warning: '#f59e0b',
  info: '#3b82f6',

  // Oracle Premium
  oracle: {
    purple: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.3)',
  },

  // Clearance Levels (Security Badges)
  clearance: {
    cosmic: '#a855f7',      // Purple - Highest
    topSecret: '#ef4444',   // Red
    secret: '#f59e0b',      // Amber
    classified: '#eab308',  // Yellow
    standard: '#64748b',    // Gray - Default
  },

  // Confidence Indicators
  confidence: {
    high: '#22c55e',        // Green >= 70%
    medium: '#fbbf24',      // Gold 40-69%
    low: '#ef4444',         // Red < 40%
    neutral: '#64748b',     // Gray - Unknown
  },

  // Decorative
  teal: '#14b8a6',
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

export const typography = {
  fontFamily: {
    serif: "'Playfair Display', Georgia, serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
  },

  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },

  // Mobile sizes (0.875x scale)
  fontSizeMobile: {
    xs: '0.6875rem',   // 11px
    sm: '0.75rem',     // 12px
    base: '0.875rem',  // 14px
    lg: '1rem',        // 16px
    xl: '1.125rem',    // 18px
    '2xl': '1.25rem',  // 20px
    '3xl': '1.5rem',   // 24px
    '4xl': '1.875rem', // 30px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.015em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

// ============================================
// SPACING TOKENS
// ============================================

export const spacing = {
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
} as const;

// ============================================
// BREAKPOINTS (Mobile First)
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Media query helpers
export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  touch: '@media (hover: none) and (pointer: coarse)',
} as const;

// ============================================
// TOUCH TARGETS
// ============================================

export const touchTargets = {
  min: '44px',      // WCAG minimum
  optimal: '48px',  // Recommended for thumbs
  large: '56px',    // Primary CTAs
  // Desktop
  clickMin: '32px',
  clickOptimal: '40px',
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const radius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

// ============================================
// SHADOWS & EFFECTS
// ============================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  glow: {
    yellow: '0 0 20px rgba(251, 191, 36, 0.3)',
    yellowIntense: '0 0 40px rgba(251, 191, 36, 0.5)',
    oracle: '0 0 20px rgba(139, 92, 246, 0.3)',
    success: '0 0 20px rgba(34, 197, 94, 0.3)',
    // Clearance glows
    cosmic: '0 0 20px rgba(168, 85, 247, 0.4)',
    topSecret: '0 0 20px rgba(239, 68, 68, 0.4)',
    teal: '0 0 20px rgba(20, 184, 166, 0.3)',
  },
} as const;

// ============================================
// GLASSMORPHISM
// ============================================

export const glass = {
  standard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  elevated: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  interactive: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(251, 191, 36, 0.20)',
  },
} as const;

// ============================================
// GRADIENTS
// ============================================

export const gradients = {
  cardHover: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
  hero: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
  oracle: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)',
  progress: 'linear-gradient(90deg, #fbbf24 0%, #d97706 100%)',
  // Decorative Lines (Substance pattern)
  decorativeLine: 'linear-gradient(90deg, #fbbf24 0%, #14b8a6 50%, #8b5cf6 100%)',
  decorativeLineReverse: 'linear-gradient(90deg, #8b5cf6 0%, #14b8a6 50%, #fbbf24 100%)',
  // Clearance badge backgrounds
  clearanceCosmic: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
  clearanceTopSecret: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(153, 27, 27, 0.1) 100%)',
  // Confidence backgrounds
  confidenceHigh: 'linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, transparent 100%)',
  confidenceMedium: 'linear-gradient(90deg, rgba(251, 191, 36, 0.1) 0%, transparent 100%)',
  confidenceLow: 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)',
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
} as const;

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  duration: {
    instant: 100,   // ms
    fast: 200,
    normal: 300,
    slow: 500,
    glacial: 1000,
  },
  easing: {
    enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
    exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    ios: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
} as const;

// ============================================
// COMPOSITE TOKENS (Semantic)
// ============================================

export const semantic = {
  background: {
    primary: colors.void,
    secondary: colors.voidLight,
    elevated: colors.voidLighter,
    interactive: colors.neutral[800],
  },
  text: {
    primary: '#ffffff',
    secondary: colors.neutral[400],
    tertiary: colors.neutral[500],
    muted: colors.neutral[600],
    accent: colors.spinoza.yellow,
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.05)',
    default: 'rgba(255, 255, 255, 0.10)',
    hover: 'rgba(251, 191, 36, 0.30)',
    focus: colors.spinoza.yellow,
  },
} as const;

// ============================================
// COMPONENT TOKENS
// ============================================

export const components = {
  button: {
    padding: {
      sm: `${spacing[2]} ${spacing[3]}`,
      md: `${spacing[2.5]} ${spacing[4]}`,
      lg: `${spacing[3]} ${spacing[6]}`,
    },
    height: {
      sm: '36px',
      md: '40px',
      lg: '48px',
    },
  },
  card: {
    padding: spacing[6],
    borderRadius: radius.none,
  },
  modal: {
    padding: spacing[8],
    maxWidth: '480px',
    mobileMargin: spacing[4],
  },
  input: {
    height: '40px',
    paddingX: spacing[4],
    borderRadius: radius.md,
  },
} as const;

// ============================================
// EXPORT ALL
// ============================================

export const tokens = {
  colors,
  typography,
  spacing,
  breakpoints,
  media,
  touchTargets,
  radius,
  shadows,
  glass,
  gradients,
  zIndex,
  transitions,
  semantic,
  components,
} as const;

export default tokens;
