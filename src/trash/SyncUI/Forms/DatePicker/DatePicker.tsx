'use client';

import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import * as React from 'react';
import { Input, InputProps } from '../Input';

/**
 * Unified DatePicker Component
 *
 * Date input field with calendar icon.
 * Simple implementation - can be extended with date picker library if needed.
 *
 * Design System:
 * - Uses Input component as base
 * - Calendar icon on the right
 * - Supports date format (DD/MM/YYYY)
 */

export interface DatePickerProps extends Omit<InputProps, 'type'> {
  /**
   * Date value (YYYY-MM-DD format for input)
   */
  value?: string;
  /**
   * Date change handler
   */
  onChange?: (date: string) => void;
  /**
   * Minimum date (YYYY-MM-DD)
   */
  min?: string;
  /**
   * Maximum date (YYYY-MM-DD)
   */
  max?: string;
  /**
   * Show calendar icon
   * @default true
   */
  showIcon?: boolean;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      min,
      max,
      showIcon = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className='relative'>
        <Input
          ref={ref}
          type='date'
          value={value}
          onChange={e => onChange?.(e.target.value)}
          min={min}
          max={max}
          className={cn(showIcon && 'pr-10', className)}
          {...props}
        />
        {showIcon && (
          <Calendar className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none' />
        )}
      </div>
    );
  }
);
DatePicker.displayName = 'DatePicker';

