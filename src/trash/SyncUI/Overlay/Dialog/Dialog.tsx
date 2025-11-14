'use client';

import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { Spinner } from '@/components/SyncUI/Feedback';

/**
 * Unified Dialog Component
 *
 * Synchronizes style according to design system, replaces all hardcoded dialog/modal styles.
 *
 * Common patterns in codebase:
 * - `fixed top-[50%] left-[50%] z-[101] translate-x-[-50%] translate-y-[-50%]` - Centered positioning
 * - `bg-white rounded-lg border p-6` - Standard dialog
 * - `max-w-[500px]`, `max-w-[700px]` - Different sizes
 * - `max-h-[85vh] overflow-y-auto` - Scrollable content
 * - `bg-black/50` - Overlay
 *
 * Design System:
 * - Background: white
 * - Border: border-gray-200
 * - Border radius: rounded-lg (8px)
 * - Shadow: shadow-lg
 * - Z-index: overlay z-[100], content z-[101]
 * - Animation: fade-in/out, zoom-in/out
 */

const dialogContentVariants = cva(
  'bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-dialog-content grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-gray-200 shadow-lg transition-all duration-300 ease-out',
  {
    variants: {
      size: {
        xs: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-xs', // Very small modal (confirm, alert)
        sm: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-sm', // Small modal (simple notification)
        md: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-md', // Default - Standard modal
        lg: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-lg', // Large modal (complex form)
        xl: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-xl', // Very large modal (form with many fields)
        full: 'max-w-[calc(100%-2rem)] sm:max-w-dialog-full', // Modal full width
      },
      padding: {
        none: 'p-0',
        sm: 'p-component-sm', // 12px - Small component padding
        md: 'p-component-md', // 16px - Medium component padding (default)
        lg: 'p-component-lg', // 24px - Large component padding
      },
      scrollable: {
        true: 'max-h-dialog-scrollable overflow-y-auto overflow-x-hidden',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      padding: 'md',
      scrollable: false,
    },
  }
);

const dialogOverlayVariants = cva(
  'fixed inset-0 z-dialog-overlay bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-opacity duration-300 ease-out'
);

export interface DialogProps
  extends React.ComponentProps<typeof DialogPrimitive.Root> {}

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showCloseButton?: boolean;
}

export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(dialogOverlayVariants(), className)}
      {...props}
    />
  );
});
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size,
      padding,
      scrollable,
      showCloseButton = true,
      ...props
    },
    ref
  ) => {
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            dialogContentVariants({ size, padding, scrollable }),
            className
          )}
          style={{
            overflowX: 'hidden',
            maxWidth:
              size === 'full' ? 'min(calc(100% - 2rem), 95vw)' : undefined,
          }}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4'>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-form-field-gap text-center sm:text-left', className)}
    {...props}
  />
));
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-form-field-gap',
      className
    )}
    {...props}
  />
));
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg leading-none font-semibold', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-gray-600', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

/**
 * DialogContentState Component
 *
 * Handles loading and error states inside dialog content
 * All styling from config - no hardcoded values
 */
export interface DialogContentStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  error?: string | null;
  children: React.ReactNode;
  loadingSpinnerSize?: 'sm' | 'md' | 'lg';
  loadingSpinnerVariant?: 'default' | 'white' | 'gray';
  errorClassName?: string;
}

export const DialogContentState = React.forwardRef<
  HTMLDivElement,
  DialogContentStateProps
>(
  (
    {
      isLoading = false,
      error = null,
      children,
      loadingSpinnerSize = 'lg',
      loadingSpinnerVariant = 'default',
      errorClassName,
      className,
      ...props
    },
    ref
  ) => {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative flex min-h-dialog-loading items-center justify-center bg-white/50',
            className
          )}
          {...props}
        >
          <div className='translate-y-dialog-loading-offset'>
            <Spinner
              size={loadingSpinnerSize}
              variant={loadingSpinnerVariant}
            />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center py-dialog-error',
            className
          )}
          {...props}
        >
          <div className={cn('text-red-500 text-xs2', errorClassName)}>
            {error}
          </div>
        </div>
      );
    }

    return <>{children}</>;
  }
);
DialogContentState.displayName = 'DialogContentState';

export {
  Dialog,
  DialogClose,
  DialogContent,
  dialogContentVariants,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
