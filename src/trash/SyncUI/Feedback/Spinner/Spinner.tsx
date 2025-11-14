'use client';

import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Unified Spinner Component
 *
 * Synchronizes style according to design system, replaces all hardcoded spinner/loader styles.
 *
 * Common patterns in codebase:
 * - `Loader2 className='w-8 h-8 text-red-600 animate-spin'` - Icon spinner (most common)
 * - `border-t-[3px] border-r-[3px] border-t-viettel-red border-r-transparent animate-spin` - Custom border spinner (uses viettel-red from tailwind.config.js)
 * - `border-2 border-white border-t-transparent rounded-full animate-spin` - Small white spinner for buttons
 *
 * Design System:
 * - Color: text-viettel-red (default), text-white (for buttons), text-gray-400
 * - Animation: animate-spin
 * - Sizes: sm (16px), md (24px), lg (32px)
 */

const spinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      default: 'text-viettel-red', // Red spinner - most common
      white: 'text-white', // White spinner for buttons
      gray: 'text-gray-400', // Gray spinner
    },
    size: {
      sm: 'size-4', // 16px
      md: 'size-6', // 24px
      lg: 'size-8', // 32px - most common
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'lg',
  },
});

const borderSpinnerVariants = cva(
  'rounded-full inline-block box-border animate-spin',
  {
    variants: {
      variant: {
        default: 'border-t-viettel-red border-r-transparent',
        white: 'border-t-white border-r-transparent',
        gray: 'border-t-gray-400 border-r-transparent',
      },
      size: {
        sm: 'size-4 border-2 border-t-2 border-r-2',
        md: 'size-6 border-[2.5px] border-t-[2.5px] border-r-[2.5px]',
        lg: 'size-8 border-[3px] border-t-[3px] border-r-[3px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  type?: 'icon' | 'border'; // Icon spinner (Loader2) or border spinner
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, variant, size, type = 'icon', ...props }, ref) => {
    if (type === 'border') {
      return (
        <span
          ref={ref as React.RefObject<HTMLSpanElement>}
          className={cn(borderSpinnerVariants({ variant, size }), className)}
          {...props}
        />
      );
    }

    return (
      <Loader2
        ref={ref as React.RefObject<SVGSVGElement>}
        className={cn(spinnerVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants, borderSpinnerVariants };

