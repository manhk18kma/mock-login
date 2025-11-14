import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Progress Component
 *
 * Progress bar for showing loading states and completion percentages.
 *
 * Design System:
 * - Background: bg-gray-200 (light gray)
 * - Fill: bg-viettel-red (from tailwind.config.js)
 * - Can be determinate (with value) or indeterminate (animated)
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: viettel-red, gray-200
 */

const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-gray-200',
  {
    variants: {
      size: {
        sm: 'h-1', // 4px
        md: 'h-2', // 8px - Default
        lg: 'h-3', // 12px
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressBarVariants = cva(
  'h-full transition-all duration-300 ease-in-out bg-viettel-red',
  {
    variants: {
      variant: {
        default: 'bg-viettel-red',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /**
   * Progress value (0-100)
   * If not provided, shows indeterminate (animated) progress
   */
  value?: number;
  /**
   * Maximum value (default: 100)
   */
  max?: number;
  /**
   * Progress bar variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /**
   * Show percentage label
   */
  showLabel?: boolean;
  /**
   * Label position
   */
  labelPosition?: 'inside' | 'outside';
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      value,
      max = 100,
      variant,
      showLabel = false,
      labelPosition = 'outside',
      ...props
    },
    ref
  ) => {
    const percentage = value !== undefined ? (value / max) * 100 : undefined;
    const isIndeterminate = value === undefined;

    const label = percentage !== undefined ? `${Math.round(percentage)}%` : null;

    return (
      <div className={cn('w-full', labelPosition === 'outside' && 'space-y-1')}>
        <div
          ref={ref}
          className={cn(progressVariants({ size }), className)}
          role='progressbar'
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          {...props}
        >
          {isIndeterminate ? (
            <div
              className={cn(
                progressBarVariants({ variant }),
                'w-1/3 animate-[progress_1.5s_ease-in-out_infinite]'
              )}
              style={{
                animation: 'progress 1.5s ease-in-out infinite',
              }}
            />
          ) : (
            <div
              className={cn(progressBarVariants({ variant }))}
              style={{ width: `${Math.min(100, Math.max(0, percentage ?? 0))}%` }}
            >
              {showLabel && labelPosition === 'inside' && label && (
                <span className='absolute inset-0 flex items-center justify-center text-xs font-medium text-white'>
                  {label}
                </span>
              )}
            </div>
          )}
        </div>
        {showLabel && labelPosition === 'outside' && label && (
          <div className='text-xs text-gray-600 text-right'>{label}</div>
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress, progressVariants };

