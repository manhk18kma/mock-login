import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Textarea Component
 *
 * Synchronizes border style with Input component according to Figma design system:
 *
 * From Figma (Input_Text specs - applied to textarea):
 * - Border: 1px solid #2B3353 (navy) - SYNCHRONIZED FOR ALL TEXTAREAS
 * - Focus: border-color var(--brand), box-shadow 0 0 0 3px rgba(239,0,50,0.1)
 * - Hover: border-color #3d4a6e
 * - Placeholder: text-gray-400
 * - Resize: none (default)
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: viettel-navy, viettel-blue (focus), viettel-navy-hover
 * - Shadows: shadow-input-focus
 * - Font sizes: text-xs2 (13px) for md/lg sizes
 * - Min heights: min-h-textarea-sm/md/lg
 */
const textareaVariants = cva(
  // Base styles - Synchronized navy border for all
  'w-full border border-viettel-navy bg-white text-black transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 hover:border-viettel-navy-hover focus:border-viettel-blue focus:ring-0 focus:shadow-input-focus resize-none',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-xs rounded-md min-h-textarea-sm', // 12px - Small textareas
        md: 'px-3 py-2 text-xs2 rounded-md min-h-textarea-md', // 13px - Standard size (from Figma Input_Text)
        lg: 'px-3 py-2 text-xs2 leading-[1.5] rounded-lg min-h-textarea-lg', // 13px - Large textareas (from Figma Input_Text)
      },
      error: {
        true: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, error }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };

