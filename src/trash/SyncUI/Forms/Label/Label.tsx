import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Label Component
 *
 * Synchronizes style according to design system, replaces all hardcoded label styles:
 *
 * Common patterns in codebase:
 * - `block text-sm font-medium text-gray-700 mb-2` - Form labels (most common)
 * - `whitespace-nowrap text-[13px]` - Inline labels in advanced search
 * - `justify-center flex items-center gap-2 font-medium select-none text-sm` - Grid layout labels
 *
 * Design System:
 * - Font size: text-sm (14px) - default
 * - Font weight: font-medium
 * - Color: text-gray-700
 * - Display: block (default) or inline-flex (for grid layouts)
 */

const labelVariants = cva('font-medium select-none text-gray-700', {
  variants: {
    variant: {
      default: 'block mb-2', // Form labels - most common
      inline: 'inline-block', // Inline labels
      grid: 'flex items-center gap-2', // Grid layout labels
    },
    size: {
      sm: 'text-xs2', // 13px - For advanced search, compact forms
      md: 'text-sm', // 14px - Default, most common (form labels)
      lg: 'text-base', // 16px - Large labels
    },
    required: {
      true: 'after:content-["*"] after:text-red-500 after:ml-1',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    required: false,
  },
});

export interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, required, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant, size, required }), className)}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
