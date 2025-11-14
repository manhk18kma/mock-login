import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Button Component
 *
 * Combines styles from Figma and current basecode:
 *
 * From Figma:
 * - Button_active: Light background with brand border
 * - Button_Normal: Navy outline with purple-light background
 * - button_deactive: Gray outline
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: viettel-red, viettel-navy, viettel-rose, viettel-purple-light, neutral-*
 * - Font sizes: text-xs2 (13px) for md size
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        /**
         * Primary - Brand red filled button
         * Uses: bg-viettel-red (from tailwind.config.js)
         * Used for: Submit, Confirm, Save
         * ⚠️ RULE: Buttons with red background MUST have white text
         */
        primary:
          'bg-viettel-red !text-white hover:bg-viettel-red focus-visible:ring-viettel-red',

        /**
         * Secondary - Brand red outline button
         * Uses: border-viettel-red text-viettel-red (from tailwind.config.js)
         * Used for: Search, Add New, Import, Export
         *
         * ⚠️ STANDARD RULE: "Tìm kiếm" button ALWAYS uses variant="secondary"
         * DO NOT use variant="primary" for "Tìm kiếm" button
         */
        secondary:
          'bg-white border-2 border-viettel-red text-viettel-red hover:bg-viettel-red hover:text-white focus-visible:ring-viettel-red',

        /**
         * Active - Light background with brand border (from Figma Button_active)
         * Replaces: .Button_active class
         * Used for: Submit for Approval, Active state
         */
        active:
          'bg-viettel-rose border-2 border-viettel-red text-viettel-red hover:bg-viettel-rose-hover focus-visible:ring-viettel-red',

        /**
         * Normal - Navy outline with purple-light background (from Figma Button_Normal)
         * Replaces: .Button_Normal class
         * Used for: Exit, Normal actions
         */
        normal:
          'bg-viettel-purple-light border-2 border-viettel-navy text-viettel-navy hover:bg-neutral-200 focus-visible:ring-viettel-navy',

        /**
         * Outline - Gray outline button (from Figma button_deactive)
         * Replaces: .button_deactive, .btn-secondary
         * Used for: Cancel, Deactive
         */
        outline:
          'bg-white border border-gray-300 text-neutral-700 hover:bg-neutral-50 hover:border-gray-400 focus-visible:ring-gray-300',

        /**
         * Ghost - Transparent button
         * Used for: Subtle actions
         */
        ghost:
          'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-50 focus-visible:ring-gray-300',

        /**
         * Link - Text only button
         * Uses: text-viettel-red (from tailwind.config.js)
         * Used for: View Details, Links
         */
        link: 'bg-transparent border-transparent text-viettel-red hover:underline hover:text-viettel-red focus-visible:ring-viettel-red',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5', // 12px - Small buttons
        // md: 'h-7 px-4 text-xs2 gap-2', // h-9 → h-7 (giảm từ 36px → 28px)
        md: 'h-9 px-4 text-xs2 gap-2', // 13px - Most common in Figma (Buttons, Inputs)
        lg: 'h-10 px-6 text-sm gap-2', // 14px - Large buttons
        icon: 'size-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
