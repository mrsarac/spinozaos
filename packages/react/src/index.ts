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

// Components - Feedback
export { Badge, badgeVariants, type BadgeProps } from './components/Badge';
export { Toast, ToastContainer, toastVariants, type ToastProps, type ToastContainerProps } from './components/Toast';
export { Modal, ModalHeader, ModalBody, ModalFooter, modalContentVariants, type ModalProps } from './components/Modal';
export { Tooltip, tooltipVariants, type TooltipProps } from './components/Tooltip';

// Re-export tokens and motion for convenience
export * from '@spinozaos/tokens';
export * from '@spinozaos/motion';
