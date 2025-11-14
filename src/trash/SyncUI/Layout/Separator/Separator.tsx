import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Separator Component
 *
 * Horizontal or vertical divider for separating content sections.
 *
 * Design System:
 * - Color: border-gray-200 (light gray)
 * - Can be horizontal (default) or vertical
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: gray-200 (default border color)
 */

const separatorVariants = cva('shrink-0 bg-gray-200', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
    spacing: {
      none: '',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    spacing: 'none',
  },
});

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  /**
   * Decorative variant (adds padding)
   */
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation, spacing, decorative = true, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={cn(
          separatorVariants({ orientation, spacing }),
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = 'Separator';

export { Separator, separatorVariants };

