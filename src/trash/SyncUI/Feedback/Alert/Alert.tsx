import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';

/**
 * Unified Alert Component
 *
 * Alert banner for displaying important messages to users.
 *
 * Design System:
 * - Border: 1px solid (variant-specific)
 * - Background: variant-specific
 * - Icons: Lucide icons for each variant
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: viettel-red, viettel-green, viettel-blue, yellow-500
 */

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200 text-gray-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        error: 'bg-red-50 border-red-200 text-red-900',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        info: 'bg-blue-50 border-blue-200 text-blue-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const alertTitleVariants = cva('mb-1 font-medium leading-none tracking-tight', {
  variants: {
    variant: {
      default: 'text-gray-900',
      success: 'text-green-900',
      error: 'text-red-900',
      warning: 'text-yellow-900',
      info: 'text-blue-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const alertDescriptionVariants = cva('text-sm [&_p]:leading-relaxed', {
  variants: {
    variant: {
      default: 'text-gray-700',
      success: 'text-green-800',
      error: 'text-red-800',
      warning: 'text-yellow-800',
      info: 'text-blue-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * Alert title
   */
  title?: React.ReactNode;
  /**
   * Alert description/content
   */
  children?: React.ReactNode;
  /**
   * Show close button
   */
  showClose?: boolean;
  /**
   * Close handler
   */
  onClose?: () => void;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      title,
      children,
      showClose = false,
      onClose,
      icon,
      ...props
    },
    ref
  ) => {
    const defaultIcon = React.useMemo(() => {
      if (icon !== undefined) return icon;
      switch (variant) {
        case 'success':
          return <CheckCircle2 className='h-4 w-4' />;
        case 'error':
          return <XCircle className='h-4 w-4' />;
        case 'warning':
          return <AlertCircle className='h-4 w-4' />;
        case 'info':
          return <Info className='h-4 w-4' />;
        default:
          return <AlertCircle className='h-4 w-4' />;
      }
    }, [variant, icon]);

    return (
      <div
        ref={ref}
        role='alert'
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {defaultIcon}
        <div className='flex-1'>
          {title && (
            <h5 className={cn(alertTitleVariants({ variant }))}>{title}</h5>
          )}
          {children && (
            <div className={cn(alertDescriptionVariants({ variant }))}>
              {children}
            </div>
          )}
        </div>
        {showClose && onClose && (
          <button
            type='button'
            onClick={onClose}
            className='absolute right-4 top-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Close</span>
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(alertTitleVariants({ variant }), className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertDescriptionVariants({ variant }), className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };

