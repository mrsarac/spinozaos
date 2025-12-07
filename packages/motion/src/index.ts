// SpinozaOS Motion System v2.0
// "More Geometrico" - Award-winning animation standards

// ============================================
// SPRING CONFIGURATIONS
// ============================================

export const SPRING = {
  tight: { type: "spring", stiffness: 500, damping: 30 } as const,   // Buttons, toggles
  soft: { type: "spring", stiffness: 300, damping: 30 } as const,    // Cards, panels
  bouncy: { type: "spring", stiffness: 400, damping: 20 } as const,  // Badges, achievements
  slow: { type: "spring", stiffness: 200, damping: 30 } as const,    // Page transitions
  mobile: { type: "spring", stiffness: 400, damping: 35 } as const,  // Mobile optimized
  snappy: { type: "spring", stiffness: 600, damping: 35 } as const,  // Quick UI feedback
};

// ============================================
// EASING FUNCTIONS
// ============================================

export const EASE = {
  enter: [0.22, 1, 0.36, 1] as const,        // Page load, modal open
  exit: [0.4, 0, 0.2, 1] as const,           // Page exit, modal close
  smooth: [0.4, 0, 0.2, 1] as const,         // General smooth transition
  bounce: [0.68, -0.55, 0.27, 1.55] as const, // Playful bounce
  ios: [0.25, 0.1, 0.25, 1] as const,        // iOS-like natural curve
};

// ============================================
// ANIMATION VARIANTS
// ============================================

export const VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  // Mobile-specific: Full screen slide from right
  slideInRightFull: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
  },
  // Mobile-specific: Slide up from bottom (modals, sheets)
  slideInUp: {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' },
  },
  // Slide down (dropdowns, notifications)
  slideInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  // Stagger container with delay
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  // Child item for stagger
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
} as const;

// ============================================
// MICRO-INTERACTIONS
// ============================================

export const MICRO = {
  hover: {
    lift: { y: -4, scale: 1.01 },
    glow: { boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' },
    glowIntense: { boxShadow: '0 0 40px rgba(251, 191, 36, 0.5)' },
    scale: { scale: 1.02 },
  },
  tap: {
    press: { scale: 0.98 },
    click: { scale: 0.95 },
  },
  // Mobile-specific: Larger touch feedback
  touch: {
    press: { scale: 0.96 },
    highlight: { backgroundColor: 'rgba(251, 191, 36, 0.1)' },
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 2 },
  },
  // Oracle premium glow
  oracleGlow: {
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
} as const;

// ============================================
// DURATION PRESETS
// ============================================

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  glacial: 1.0,
} as const;

// ============================================
// STAGGER DELAYS
// ============================================

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// ============================================
// HELPERS
// ============================================

/**
 * Check if the current device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.md;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get appropriate spring based on device and motion preference
 */
export const getSpring = (type: keyof typeof SPRING = 'soft') => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 }; // Nearly instant for reduced motion
  }
  if (isMobile()) {
    return SPRING.mobile;
  }
  return SPRING[type];
};

/**
 * Get appropriate duration based on motion preference
 */
export const getDuration = (type: keyof typeof DURATION = 'normal'): number => {
  if (prefersReducedMotion()) {
    return 0.01;
  }
  return DURATION[type];
};

// ============================================
// EXPORT ALL
// ============================================

export const motion = {
  SPRING,
  EASE,
  VARIANTS,
  MICRO,
  DURATION,
  STAGGER,
  BREAKPOINTS,
  isMobile,
  prefersReducedMotion,
  getSpring,
  getDuration,
} as const;

export default motion;
