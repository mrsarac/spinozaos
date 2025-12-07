// SpinozaOS React Components v0.1.0
// "More Geometrico" - React components for the age of superintelligence

// Utils
export { cn } from './utils';

// Components - Actions
export { Button, buttonVariants, type ButtonProps } from './components/Button';

// Components - Typography
export { Text, textVariants, type TextProps } from './components/Text';

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

// Re-export tokens and motion for convenience
export * from '@spinozaos/tokens';
export * from '@spinozaos/motion';
