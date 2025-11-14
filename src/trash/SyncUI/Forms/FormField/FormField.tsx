import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Label } from '../Label';

/**
 * FormField Component
 *
 * Wrapper component for Label + Input/Select/Textarea with consistent spacing.
 * Automatically handles spacing between label and input to avoid manual className management.
 *
 * Usage:
 * ```tsx
 * <FormField>
 *   <Label htmlFor="category">Category</Label>
 *   <Select>...</Select>
 * </FormField>
 * 
 * // Or with label prop:
 * <FormField label="Category" required>
 *   <Select>...</Select>
 * </FormField>
 * ```
 */

const formFieldVariants = cva('flex flex-col', {
  variants: {
    spacing: {
      none: 'space-y-0 [&_label]:mb-0', // 0px - No spacing, override Label margin
      xs: 'space-y-0.5 [&_label]:mb-0', // 2px - Very compact forms
      sm: 'space-y-1 [&_label]:mb-0', // 4px - Compact forms
      md: 'space-y-1.5 [&_label]:mb-0', // 6px - Standard forms (default)
      lg: 'space-y-2 [&_label]:mb-0', // 8px - Spacious forms
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  /**
   * Label text (optional if using Label as child)
   */
  label?: React.ReactNode;
  /**
   * Label props (optional)
   */
  labelProps?: React.ComponentProps<typeof Label>;
  /**
   * Error message (optional)
   */
  error?: string;
  /**
   * Required indicator
   */
  required?: boolean;
  /**
   * Description/helper text (optional)
   */
  description?: React.ReactNode;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      spacing,
      label,
      labelProps,
      error,
      required,
      description,
      children,
      ...props
    },
    ref
  ) => {
    // If label is provided as prop, prepend it
    const content = label ? (
      <>
        <Label {...labelProps} required={required} variant='default' className={cn('mb-0', labelProps?.className)}>
          {label}
        </Label>
        {children}
      </>
    ) : (
      children
    );

    return (
      <div
        ref={ref}
        className={cn(formFieldVariants({ spacing }), className)}
        {...props}
      >
        {content}
        {error && (
          <p className='text-xs2 text-red-500 mt-1'>{error}</p>
        )}
        {description && !error && (
          <p className='text-xs2 text-gray-500 mt-1'>{description}</p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

export { FormField, formFieldVariants };

