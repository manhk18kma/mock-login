import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Card Component
 *
 * Synchronizes style according to design system, replaces all hardcoded card styles:
 *
 * Common patterns in codebase:
 * - `bg-white rounded-lg border shadow-sm p-6` - Standard card
 * - `border-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]` - Interactive card with hover
 *
 * Design System:
 * - Background: white
 * - Border: 1px solid gray-200 (default) or 2px (interactive)
 * - Border radius: rounded-lg (8px)
 * - Shadow: shadow-sm (default) or custom shadow (interactive)
 * - Padding: p-6 (24px) - can be overridden
 */

const cardVariants = cva(
  'bg-white rounded-lg border border-gray-200 shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200 shadow-sm',
        interactive:
          'border-2 border-gray-200 shadow-card-interactive hover:shadow-card-interactive-hover transition-shadow',
        outlined: 'bg-white border-gray-200 shadow-none',
        elevated: 'bg-white border-gray-200 shadow-md',
      },
      padding: {
        none: 'p-0',
        sm: 'p-component-sm', // 12px - Small component padding
        md: 'p-component-md', // 16px - Medium component padding (default)
        lg: 'p-component-lg', // 24px - Large component padding
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-form-field-gap mb-component-md', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-sm2 font-semibold leading-none tracking-tight text-gray-800',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-xs2 text-gray-600', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
