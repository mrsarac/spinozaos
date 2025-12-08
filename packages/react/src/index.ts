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

// Re-export tokens and motion for convenience
export * from '@spinozaos/tokens';
export * from '@spinozaos/motion';
