'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { FormField, type FormFieldProps } from '../FormField';
import { Input, type InputProps } from '../Input';
import { Label } from '../Label';

/**
 * InputField Component
 *
 * Unified component for FormField + Label + Input pattern.
 * Reduces repetitive code and ensures consistent styling.
 *
 * Usage:
 * ```tsx
 * <InputField
 *   label="Name"
 *   value={name}
 *   onChange={e => setName(e.target.value)}
 *   placeholder="Enter name..."
 *   required
 *   error={errors.name}
 * />
 * ```
 */

export interface InputFieldProps
  extends Omit<FormFieldProps, 'label' | 'children'>,
    Omit<InputProps, 'id'> {
  /**
   * Field label text
   */
  label: React.ReactNode;
  /**
   * Label props (optional)
   */
  labelProps?: React.ComponentProps<typeof Label>;
  /**
   * HTML id for the input
   * If not provided, will be auto-generated from label
   */
  id?: string;
  /**
   * Input size
   */
  inputSize?: 'sm' | 'md' | 'lg';
  /**
   * Input width variant
   */
  inputWidth?: 'full' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Input className
   */
  inputClassName?: string;
}

export const InputField = React.forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      label,
      labelProps,
      id,
      inputSize = 'md',
      inputWidth = 'full',
      inputClassName,
      error,
      required,
      spacing = 'md',
      className,
      ...inputProps
    },
    ref
  ) => {
    // Auto-generate id from label if not provided
    const inputId =
      id ||
      (typeof label === 'string'
        ? label.toLowerCase().replace(/\s+/g, '-')
        : `input-${Math.random().toString(36).substr(2, 9)}`);

    return (
      <FormField
        ref={ref}
        spacing={spacing}
        className={className}
        error={error}
        required={required}
      >
        <Label htmlFor={inputId} size='sm' {...labelProps} required={required}>
          {label}
        </Label>
        <Input
          id={inputId}
          size={inputSize}
          width={inputWidth}
          error={!!error}
          className={inputClassName}
          {...inputProps}
        />
      </FormField>
    );
  }
);
InputField.displayName = 'InputField';

