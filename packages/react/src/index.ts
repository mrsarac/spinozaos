// SpinozaOS React Components v0.2.0
// "More Geometrico" - React components for the age of superintelligence
// Updated with Substance UI patterns

// Utils
export { cn } from './utils';

// Components - Actions
export { Button, buttonVariants, type ButtonProps } from './components/Button';

// Components - Typography
export { Text, textVariants, type TextProps } from './components/Text';

// Components - Effects (Substance)
export { GlitchText, glitchVariants, type GlitchTextProps } from './components/GlitchText';

// Components - Layout
export { Card, cardVariants, type CardProps } from './components/Card';

// Components - Forms
export { Input, inputVariants, type InputProps } from './components/Input';
export { Textarea, textareaVariants, type TextareaProps } from './components/Textarea';
export { Select, selectTriggerVariants, type SelectProps, type SelectOption } from './components/Select';
export { Checkbox, checkboxVariants, type CheckboxProps } from './components/Checkbox';
export { Toggle, toggleTrackVariants, type ToggleProps } from './components/Toggle';

// Components - Feedback
export { Badge, badgeVariants, type BadgeProps } from './components/Badge';
export { Toast, ToastContainer, toastVariants, type ToastProps, type ToastContainerProps } from './components/Toast';
export { Modal, ModalHeader, ModalBody, ModalFooter, modalContentVariants, type ModalProps } from './components/Modal';
export { Tooltip, tooltipVariants, type TooltipProps } from './components/Tooltip';

// Components - Loading/Progress
export {
  Progress,
  progressTrackVariants,
  progressBarVariants,
  Spinner,
  spinnerVariants,
  LoadingDots,
  Skeleton,
  type ProgressProps,
  type SpinnerProps,
  type LoadingDotsProps,
  type SkeletonProps,
} from './components/Progress';

// Components - Data Display (Substance patterns)
export {
  ClearanceBadge,
  clearanceBadgeVariants,
  type ClearanceBadgeProps,
} from './components/ClearanceBadge';

export {
  ConfidenceIndicator,
  ConfidenceSlider,
  confidenceIndicatorVariants,
  type ConfidenceIndicatorProps,
  type ConfidenceSliderProps,
} from './components/ConfidenceIndicator';

export {
  DecorativeLine,
  GradientDivider,
  CardTopLine,
  SectionDivider,
  decorativeLineVariants,
  type DecorativeLineProps,
} from './components/DecorativeLine';

// Components - Navigation & Disclosure
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type FAQItem,
  type FAQAccordionProps,
} from './components/Accordion';

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PeriodTabs,
  tabsListVariants,
  tabTriggerVariants,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type PeriodTabsProps,
} from './components/Tabs';

// Components - User Display
export {
  Avatar,
  AvatarGroup,
  avatarVariants,
  type AvatarProps,
  type AvatarGroupProps,
} from './components/Avatar';

// Components - Data Display (Stats & State)
export {
  StatCard,
  StatGrid,
  QuickStats,
  statCardVariants,
  valueVariants,
  labelVariants,
  type StatCardProps,
  type StatGridProps,
  type QuickStatsProps,
} from './components/StatCard';

export {
  EmptyState,
  NoResults,
  NoData,
  ErrorState,
  NotFound,
  emptyStateVariants,
  iconContainerVariants,
  type EmptyStateProps,
  type NoResultsProps,
  type NoDataProps,
  type ErrorStateProps,
  type NotFoundProps,
} from './components/EmptyState';

// Components - Data Display (DataGrid)
export {
  DataGrid,
  dataGridVariants,
  headerCellVariants,
  cellVariants,
  rowVariants,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatDate,
  type Column,
  type DataGridProps,
} from './components/DataGrid';

// Components - Interactive (Terminal)
export {
  Terminal,
  terminalVariants,
  lineTypeVariants,
  type TerminalLine,
  type TerminalProps,
} from './components/Terminal';

// Components - Data Display (LiveTicker)
export {
  LiveTicker,
  liveTickerVariants,
  tickerItemVariants,
  type TickerItem,
  type LiveTickerProps,
} from './components/LiveTicker';

// Components - Data Visualization (GaugeCluster)
export {
  Gauge,
  GaugeCluster,
  gaugeVariants,
  gaugeClusterVariants,
  type GaugeConfig,
  type GaugeProps,
  type GaugeClusterProps,
} from './components/GaugeCluster';

// Note: For design tokens, import from '@spinozaos/tokens'
// For motion presets, import from '@spinozaos/motion'
// Example:
//   import { COLORS, TYPOGRAPHY } from '@spinozaos/tokens';
//   import { SPRING, EASE } from '@spinozaos/motion';
