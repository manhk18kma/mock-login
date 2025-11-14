import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Skeleton Component
 *
 * Synchronizes style according to design system, replaces all hardcoded skeleton/loading styles.
 *
 * Design System:
 * - Background: bg-gray-200 (light gray)
 * - Animation: animate-pulse
 * - Border radius: rounded-md (default), can be customized
 * - Sizes: sm, md, lg
 * - Variants: text, circular, rectangular
 */

const skeletonVariants = cva(
  'animate-pulse bg-gray-200',
  {
    variants: {
      variant: {
        text: 'rounded-md', // Default - for text lines
        circular: 'rounded-full', // For avatars, circles
        rectangular: 'rounded-md', // For cards, boxes
      },
      size: {
        sm: 'h-3', // Small - 12px
        md: 'h-4', // Medium - 16px - Default
        lg: 'h-6', // Large - 24px
      },
    },
    defaultVariants: {
      variant: 'text',
      size: 'md',
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size }), className)}
        style={{
          width: width || style?.width,
          height: height || style?.height,
          ...style,
        }}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants };

