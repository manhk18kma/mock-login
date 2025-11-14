'use client';

import { cn } from '@/lib/utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, Trash2 } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/SyncUI/Buttons';

/**
 * Unified ConfirmDialog Component
 *
 * Alert dialog for confirming critical actions (delete, etc.).
 * Based on Radix UI AlertDialog with consistent styling.
 *
 * Design System:
 * - Sizes: xs, sm, md, lg
 * - Variants: destructive, warning, info
 * - Consistent with Dialog component styling
 */

const confirmDialogContentVariants = cva(
  'bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-dialog-content grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-gray-200 shadow-lg transition-all duration-300 ease-out',
  {
    variants: {
      size: {
        xs: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-xs',
        sm: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-sm',
        md: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-md',
        lg: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const confirmDialogOverlayVariants = cva(
  'fixed inset-0 z-dialog-overlay bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-opacity duration-300 ease-out'
);

export interface ConfirmDialogProps
  extends React.ComponentProps<typeof AlertDialogPrimitive.Root>,
    VariantProps<typeof confirmDialogContentVariants> {
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Dialog description
   */
  description?: string;
  /**
   * Confirm button text
   * @default 'Xác nhận'
   */
  confirmText?: string;
  /**
   * Cancel button text
   * @default 'Hủy'
   */
  cancelText?: string;
  /**
   * Variant for confirm button
   * @default 'destructive'
   */
  variant?: 'destructive' | 'warning' | 'info';
  /**
   * Confirm handler
   */
  onConfirm?: () => void;
  /**
   * Cancel handler
   */
  onCancel?: () => void;
  /**
   * Show icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
}

const ConfirmDialogRoot = AlertDialogPrimitive.Root;

const ConfirmDialogTrigger = AlertDialogPrimitive.Trigger;

const ConfirmDialogPortal = AlertDialogPrimitive.Portal;

const ConfirmDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(confirmDialogOverlayVariants(), className)}
    {...props}
  />
));
ConfirmDialogOverlay.displayName = 'ConfirmDialogOverlay';

const ConfirmDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> &
    VariantProps<typeof confirmDialogContentVariants>
>(({ className, size, children, ...props }, ref) => (
  <ConfirmDialogPortal>
    <ConfirmDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(confirmDialogContentVariants({ size }), className)}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </ConfirmDialogPortal>
));
ConfirmDialogContent.displayName = 'ConfirmDialogContent';

const ConfirmDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
    {...props}
  />
));
ConfirmDialogHeader.displayName = 'ConfirmDialogHeader';

const ConfirmDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg leading-none font-semibold', className)}
    {...props}
  />
));
ConfirmDialogTitle.displayName = 'ConfirmDialogTitle';

const ConfirmDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-gray-600', className)}
    {...props}
  />
));
ConfirmDialogDescription.displayName = 'ConfirmDialogDescription';

const ConfirmDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
));
ConfirmDialogFooter.displayName = 'ConfirmDialogFooter';

const ConfirmDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    asChild
    {...props}
  >
    <Button variant='outline' className={className}>
      {props.children}
    </Button>
  </AlertDialogPrimitive.Cancel>
));
ConfirmDialogCancel.displayName = 'ConfirmDialogCancel';

const ConfirmDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} asChild {...props}>
    <Button variant='primary' className={className}>
      {props.children}
    </Button>
  </AlertDialogPrimitive.Action>
));
ConfirmDialogAction.displayName = 'ConfirmDialogAction';

/**
 * Pre-configured ConfirmDialog with common props
 */
export const ConfirmDialog = React.forwardRef<
  HTMLDivElement,
  ConfirmDialogProps
>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      confirmText = 'Xác nhận',
      cancelText = 'Hủy',
      variant = 'destructive',
      onConfirm,
      onCancel,
      showIcon = true,
      icon,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const getIcon = () => {
      if (icon) return icon;
      if (!showIcon) return null;

      switch (variant) {
        case 'destructive':
          return <Trash2 className='w-6 h-6 text-viettel-red' />;
        case 'warning':
          return <AlertTriangle className='w-6 h-6 text-yellow-600' />;
        case 'info':
          return <AlertTriangle className='w-6 h-6 text-blue-600' />;
        default:
          return null;
      }
    };

    const getConfirmVariant = () => {
      switch (variant) {
        case 'destructive':
          return 'primary'; // Red button
        case 'warning':
          return 'active'; // Orange/yellow button
        case 'info':
          return 'secondary';
        default:
          return 'primary';
      }
    };

    return (
      <ConfirmDialogRoot open={open} onOpenChange={onOpenChange}>
        <ConfirmDialogPortal>
          <ConfirmDialogOverlay />
          <ConfirmDialogContent size={size} {...props}>
            <ConfirmDialogHeader>
              {getIcon() && (
                <div className='flex justify-center sm:justify-start mb-2'>
                  {getIcon()}
                </div>
              )}
              {title && <ConfirmDialogTitle>{title}</ConfirmDialogTitle>}
              {description && (
                <ConfirmDialogDescription>{description}</ConfirmDialogDescription>
              )}
            </ConfirmDialogHeader>
            <ConfirmDialogFooter>
              <ConfirmDialogCancel onClick={onCancel}>
                {cancelText}
              </ConfirmDialogCancel>
              <ConfirmDialogAction onClick={onConfirm}>
                {confirmText}
              </ConfirmDialogAction>
            </ConfirmDialogFooter>
          </ConfirmDialogContent>
        </ConfirmDialogPortal>
      </ConfirmDialogRoot>
    );
  }
);
ConfirmDialog.displayName = 'ConfirmDialog';

export {
  ConfirmDialogAction,
  ConfirmDialogCancel,
  ConfirmDialogContent,
  ConfirmDialogDescription,
  ConfirmDialogFooter,
  ConfirmDialogHeader,
  ConfirmDialogOverlay,
  ConfirmDialogPortal,
  ConfirmDialogTitle,
  ConfirmDialogTrigger,
};

