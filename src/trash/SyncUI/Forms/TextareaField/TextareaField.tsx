'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { FormField, type FormFieldProps } from '../FormField';
import { Label } from '../Label';
import { Textarea, type TextareaProps } from '../Textarea';

/**
 * TextareaField Component
 *
 * Unified component for FormField + Label + Textarea pattern.
 * Reduces repetitive code and ensures consistent styling.
 *
 * Usage:
 * ```tsx
 * <TextareaField
 *   label="Description"
 *   value={description}
 *   onChange={e => setDescription(e.target.value)}
 *   placeholder="Enter description..."
 *   required
 *   error={errors.description}
 *   rows={4}
 * />
 * ```
 */

export interface TextareaFieldProps
  extends Omit<FormFieldProps, 'label' | 'children'>,
    Omit<TextareaProps, 'id'> {
  /**
   * Field label text
   */
  label: React.ReactNode;
  /**
   * Label props (optional)
   */
  labelProps?: React.ComponentProps<typeof Label>;
  /**
   * HTML id for the textarea
   * If not provided, will be auto-generated from label
   */
  id?: string;
  /**
   * Textarea size
   */
  textareaSize?: 'sm' | 'md' | 'lg';
  /**
   * Textarea className
   */
  textareaClassName?: string;
}

export const TextareaField = React.forwardRef<
  HTMLDivElement,
  TextareaFieldProps
>(
  (
    {
      label,
      labelProps,
      id,
      textareaSize = 'md',
      textareaClassName,
      error,
      required,
      spacing = 'md',
      className,
      ...textareaProps
    },
    ref
  ) => {
    // Auto-generate id from label if not provided
    const textareaId =
      id ||
      (typeof label === 'string'
        ? label.toLowerCase().replace(/\s+/g, '-')
        : `textarea-${Math.random().toString(36).substr(2, 9)}`);

    return (
      <FormField
        ref={ref}
        spacing={spacing}
        className={className}
        error={error}
        required={required}
      >
        <Label
          htmlFor={textareaId}
          size='sm'
          {...labelProps}
          required={required}
        >
          {label}
        </Label>
        <Textarea
          id={textareaId}
          size={textareaSize}
          error={!!error}
          className={textareaClassName}
          {...textareaProps}
        />
      </FormField>
    );
  }
);
TextareaField.displayName = 'TextareaField';

