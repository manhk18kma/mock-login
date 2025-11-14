'use client';

import { Button } from '@/components/SyncUI/Buttons';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, X, XCircle } from 'lucide-react';
import * as React from 'react';

/**
 * Unified Error Component
 *
 * Displays error, warning, or info messages with optional retry and close actions.
 * Replaces all hardcoded error display patterns in the codebase.
 *
 * Common patterns in codebase:
 * - Error display with icon, title, message, retry button, close button
 * - bg-red-50 border border-red-200 rounded-lg
 * - XCircle icon, text-red-800, text-red-700
 *
 * Design System:
 * - Uses design tokens from tailwind.config.js
 * - Variants: error (red), warning (orange), info (blue)
 * - Optional retry and close actions
 */

const errorVariants = cva('mb-4 p-4 rounded-lg border flex items-start', {
  variants: {
    variant: {
      error: 'bg-red-50 border-red-200',
      warning: 'bg-orange-50 border-orange-200',
      info: 'bg-blue-50 border-blue-200',
    },
  },
  defaultVariants: {
    variant: 'error',
  },
});

const iconVariants = cva('h-5 w-5 flex-shrink-0', {
  variants: {
    variant: {
      error: 'text-red-400',
      warning: 'text-orange-400',
      info: 'text-blue-400',
    },
  },
  defaultVariants: {
    variant: 'error',
  },
});

const titleVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      error: 'text-red-800',
      warning: 'text-orange-800',
      info: 'text-blue-800',
    },
  },
  defaultVariants: {
    variant: 'error',
  },
});

const messageVariants = cva('mt-1 text-sm', {
  variants: {
    variant: {
      error: 'text-red-700',
      warning: 'text-orange-700',
      info: 'text-blue-700',
    },
  },
  defaultVariants: {
    variant: 'error',
  },
});

export interface ErrorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorVariants> {
  /**
   * Error title (optional, defaults to "Error" or variant-specific text)
   */
  title?: string | undefined;
  /**
   * Error message (required)
   */
  message: React.ReactNode;
  /**
   * Retry handler (optional, shows retry button if provided)
   */
  onRetry?: () => void;
  /**
   * Close handler (optional, shows close button if provided)
   */
  onClose?: () => void;
  /**
   * Show retry button (default: true if onRetry is provided)
   */
  showRetry?: boolean;
  /**
   * Show close button (default: true if onClose is provided)
   */
  showClose?: boolean;
  /**
   * Retry button text (optional)
   */
  retryText?: string;
  /**
   * Retry button variant (default: "active")
   */
  retryVariant?:
    | 'primary'
    | 'secondary'
    | 'active'
    | 'outline'
    | 'ghost'
    | 'normal'
    | 'link';
  /**
   * Retry button size (default: "sm")
   */
  retrySize?: 'sm' | 'md' | 'lg' | 'icon';
}

const Error = React.forwardRef<HTMLDivElement, ErrorProps>(
  (
    {
      className,
      variant = 'error',
      title,
      message,
      onRetry,
      onClose,
      showRetry,
      showClose,
      retryText,
      retryVariant = 'active',
      retrySize = 'sm',
      ...props
    },
    ref
  ) => {
    const shouldShowRetry = showRetry !== false && onRetry !== undefined;
    const shouldShowClose = showClose !== false && onClose !== undefined;

    const getIcon = () => {
      switch (variant) {
        case 'warning':
          return <AlertCircle className={cn(iconVariants({ variant }))} />;
        case 'info':
          return <AlertCircle className={cn(iconVariants({ variant }))} />;
        case 'error':
        default:
          return <XCircle className={cn(iconVariants({ variant }))} />;
      }
    };

    const getDefaultTitle = () => {
      switch (variant) {
        case 'warning':
          return 'Warning';
        case 'info':
          return 'Information';
        case 'error':
        default:
          return 'Error';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(errorVariants({ variant }), className)}
        {...props}
      >
        <div className='flex-shrink-0'>{getIcon()}</div>
        <div className='ml-3 flex-1'>
          <h3 className={cn(titleVariants({ variant }))}>
            {title || getDefaultTitle()}
          </h3>
          <p className={cn(messageVariants({ variant }))}>{message}</p>
          {shouldShowRetry && (
            <div className='mt-3'>
              <Button variant={retryVariant} size={retrySize} onClick={onRetry}>
                {retryText || 'Retry'}
              </Button>
            </div>
          )}
        </div>
        {shouldShowClose && (
          <div className='ml-auto pl-3'>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              className={cn(
                variant === 'error' && 'text-red-400 hover:text-red-600',
                variant === 'warning' &&
                  'text-orange-400 hover:text-orange-600',
                variant === 'info' && 'text-blue-400 hover:text-blue-600'
              )}
            >
              <X className='h-5 w-5' />
            </Button>
          </div>
        )}
      </div>
    );
  }
);
Error.displayName = 'Error';

export { Error, errorVariants, iconVariants, messageVariants, titleVariants };
