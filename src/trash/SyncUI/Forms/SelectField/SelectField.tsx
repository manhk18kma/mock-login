'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { FormField, type FormFieldProps } from '../FormField';
import { Label } from '../Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { Tooltip } from '@/components/SyncUI/Overlay';

/**
 * SelectField Component
 *
 * Unified component for FormField + Label + Select + Tooltip pattern.
 * Reduces repetitive code and ensures consistent styling.
 *
 * Usage:
 * ```tsx
 * <SelectField
 *   label="Category"
 *   value={categoryId}
 *   options={categoryOptions}
 *   onValueChange={setCategoryId}
 *   placeholder="Select category"
 *   tooltipContent="Selected category"
 * />
 * ```
 */

export interface SelectFieldOption {
  id: string | number;
  name: string;
  [key: string]: any; // Allow additional properties
}

export interface SelectFieldProps
  extends Omit<FormFieldProps, 'label' | 'children'> {
  /**
   * Field label text
   */
  label: React.ReactNode;
  /**
   * Label props (optional)
   */
  labelProps?: React.ComponentProps<typeof Label>;
  /**
   * Current selected value
   */
  value?: string;
  /**
   * Options array
   */
  options: SelectFieldOption[];
  /**
   * Value change handler
   */
  onValueChange?: (value: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Tooltip content (optional)
   * If not provided, uses selected option name or placeholder
   */
  tooltipContent?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Select size
   */
  selectSize?: 'sm' | 'md' | 'lg';
  /**
   * Select trigger className
   */
  selectClassName?: string;
  /**
   * SelectItem className
   */
  itemClassName?: string;
  /**
   * Get display value from option (optional)
   * Default: option.name
   */
  getDisplayValue?: (option: SelectFieldOption) => string;
  /**
   * Get option value (optional)
   * Default: option.id.toString()
   */
  getOptionValue?: (option: SelectFieldOption) => string;
  /**
   * Get option display text (optional)
   * Default: option.name
   */
  getOptionText?: (option: SelectFieldOption) => string;
  /**
   * HTML id for the select trigger
   */
  id?: string;
}

export const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    {
      label,
      labelProps,
      value,
      options,
      onValueChange,
      placeholder,
      tooltipContent,
      disabled = false,
      selectSize = 'md',
      selectClassName,
      itemClassName,
      getDisplayValue,
      getOptionValue,
      getOptionText,
      id,
      spacing = 'md',
      className,
      ...formFieldProps
    },
    ref
  ) => {
    // Find selected option
    const selectedOption = options.find(
      option =>
        (getOptionValue ? getOptionValue(option) : option.id.toString()) ===
        value
    );

    // Get display value
    const displayValue = selectedOption
      ? getDisplayValue
        ? getDisplayValue(selectedOption)
        : selectedOption.name
      : undefined;

    // Default tooltip content
    const defaultTooltipContent = displayValue || placeholder || '';

    return (
      <FormField ref={ref} spacing={spacing} className={className} {...formFieldProps}>
        <Label htmlFor={id} size='sm' {...labelProps}>
          {label}
        </Label>
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <Tooltip content={tooltipContent ?? defaultTooltipContent}>
            <SelectTrigger id={id} size={selectSize} className={selectClassName}>
              <SelectValue placeholder={placeholder}>
                {displayValue || placeholder}
              </SelectValue>
            </SelectTrigger>
          </Tooltip>
          <SelectContent>
            {options.map(option => {
              const optionValue = getOptionValue
                ? getOptionValue(option)
                : option.id.toString();
              const optionText = getOptionText
                ? getOptionText(option)
                : option.name;

              return (
                <SelectItem
                  key={optionValue}
                  value={optionValue}
                  className={cn('hover:bg-gray-100 focus:bg-gray-100', itemClassName)}
                >
                  {optionText}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </FormField>
    );
  }
);
SelectField.displayName = 'SelectField';

