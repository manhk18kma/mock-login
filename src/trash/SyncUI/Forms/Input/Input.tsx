import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Input Component
 *
 * Synchronizes border style according to Figma design system:
 *
 * From Figma (Input_Text specs):
 * - Border: 1px solid #2B3353 (navy) - SYNCHRONIZED FOR ALL INPUTS
 * - Focus: border-color var(--brand), box-shadow 0 0 0 3px rgba(239,0,50,0.1)
 * - Hover: border-color #3d4a6e
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: viettel-navy, viettel-blue (focus), viettel-navy-hover
 * - Shadows: shadow-input-focus
 * - Font sizes: text-xs2 (13px) for md/lg sizes
 */
const inputVariants = cva(
  // Base styles - Synchronized navy border for all
  // Default: w-full (100% width) - can be overridden with className or width variant
  'w-full border border-viettel-navy bg-white text-black transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 hover:border-viettel-navy-hover focus:border-viettel-blue focus:ring-0 focus:shadow-input-focus',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-xs rounded-md', // 12px - Small inputs
        md: 'h-9 px-3 py-1 text-xs2 rounded-md', // 13px - Most common in Figma (Input_Text standard)
        lg: 'h-10 px-3 py-2 text-xs2 leading-[1.5] rounded-lg', // 13px - Large inputs (from Figma Input_Text: height 2.5rem, font 13px)
      },
      width: {
        full: 'w-full', // 100% - Default
        xs: 'w-input-xs', // 128px - Extra small
        sm: 'w-input-sm', // 192px - Small
        md: 'w-input-md', // 256px - Medium
        lg: 'w-input-lg', // 320px - Large
        xl: 'w-input-xl', // 384px - Extra large
      },
      error: {
        true: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      width: 'full',
      error: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, width, error, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ size, width, error }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
