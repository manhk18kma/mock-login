import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Badge Component
 *
 * Synchronizes style according to design system, replaces all hardcoded badge styles:
 *
 * Common patterns in codebase:
 * - `Status_Active`: `px-3 py-1 rounded-full bg-green-50 text-green-600`
 * - `Status_Editing`: `px-3 py-1 rounded-full bg-orange-50 text-orange-600`
 * - Inline styles: `backgroundColor: '#D4EDDA', color: '#155724'`
 * - CSS classes: `Status_Active`, `Status_Editing`, `Status_Pass`, etc.
 *
 * Design System:
 * - Padding: px-3 py-1 (most common)
 * - Border radius: rounded-full (pill shape)
 * - Font size: text-xs (12px)
 * - Font weight: font-medium
 */

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        // Success/Pass/Active states
        success: 'bg-green-50 text-green-600',
        active: 'bg-green-50 text-green-600',
        pass: 'bg-green-50 text-green-600',
        // Error/Not Pass/Not Active states
        error: 'bg-red-50 text-red-600',
        'not-pass': 'bg-red-50 text-red-600',
        'not-active': 'bg-red-50 text-red-600',
        // Warning/Editing states
        warning: 'bg-orange-50 text-orange-600',
        editing: 'bg-orange-50 text-orange-600',
        // Info states
        info: 'bg-blue-50 text-blue-600',
        approval: 'bg-blue-50 text-blue-600',
        // Neutral states
        neutral: 'bg-gray-50 text-gray-600',
        inactive: 'bg-gray-50 text-gray-600',
        // Custom status colors
        'wait-for-approval': 'bg-rose-200 text-viettel-red',
        'sent-to-approval': 'bg-orange-200 text-orange-800',
        completed: 'bg-teal-100 text-teal-800',
        'in-progress': 'bg-purple-200 text-purple-800',
        // Default/Outline
        default: 'bg-gray-100 text-gray-800',
        outline: 'border border-gray-300 bg-transparent text-gray-700',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs3', // 10px - Tiny badges
        md: 'px-3 py-1 text-xs', // 12px - Default, most common
        lg: 'px-4 py-1.5 text-xs2', // 13px - Large badges
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-md', // Increased from rounded-sm
        md: 'rounded-lg', // Increased from rounded-md
        lg: 'rounded-xl', // Increased from rounded-lg
        full: 'rounded-full', // Default - pill shape
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'full',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, rounded }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };

