'use client';

import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import * as React from 'react';
import { DatePicker, DatePickerProps } from './DatePicker';

/**
 * Unified DateRangePicker Component
 *
 * Two date pickers for selecting date range.
 * Used for filtering by date range.
 *
 * Design System:
 * - Two DatePicker components side by side
 * - "Từ" and "Đến" labels
 * - Consistent spacing
 */

export interface DateRangePickerProps {
  /**
   * Start date value (YYYY-MM-DD)
   */
  startDate?: string;
  /**
   * End date value (YYYY-MM-DD)
   */
  endDate?: string;
  /**
   * Start date change handler
   */
  onStartDateChange?: (date: string) => void;
  /**
   * End date change handler
   */
  onEndDateChange?: (date: string) => void;
  /**
   * Minimum date for start picker
   */
  min?: string;
  /**
   * Maximum date for end picker
   */
  max?: string;
  /**
   * Start date label
   * @default 'Từ ngày'
   */
  startLabel?: string;
  /**
   * End date label
   * @default 'Đến ngày'
   */
  endLabel?: string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * DatePicker props to pass to both pickers
   */
  datePickerProps?: Omit<DatePickerProps, 'value' | 'onChange' | 'min' | 'max'>;
}

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(
  (
    {
      startDate,
      endDate,
      onStartDateChange,
      onEndDateChange,
      min,
      max,
      startLabel = 'Từ ngày',
      endLabel = 'Đến ngày',
      className,
      datePickerProps,
    },
    ref
  ) => {
    // Calculate max for start date (should not exceed end date)
    const startMax = endDate || max;
    // Calculate min for end date (should not be before start date)
    const endMin = startDate || min;

    return (
      <div ref={ref} className={cn('flex gap-4 items-end', className)}>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-neutral-700 mb-1'>
            {startLabel}
          </label>
          <DatePicker
            value={startDate}
            onChange={onStartDateChange}
            min={min}
            max={startMax}
            {...datePickerProps}
          />
        </div>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-neutral-700 mb-1'>
            {endLabel}
          </label>
          <DatePicker
            value={endDate}
            onChange={onEndDateChange}
            min={endMin}
            max={max}
            {...datePickerProps}
          />
        </div>
      </div>
    );
  }
);
DateRangePicker.displayName = 'DateRangePicker';

