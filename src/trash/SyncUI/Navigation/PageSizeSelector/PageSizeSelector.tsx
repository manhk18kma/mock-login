'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * PageSizeSelector Component
 *
 * Standalone component for selecting page size (items per page).
 * Can be used independently or combined with Pagination.
 *
 * Design System:
 * - Border: border-gray-300 (from Tailwind default)
 * - Focus: focus:ring-viettel-red (from tailwind.config.js)
 * - Hover: hover:border-gray-400
 */

const pageSizeSelectorVariants = cva(
  'flex items-center gap-3',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm', // Default
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const selectVariants = cva(
  'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-viettel-red focus:border-transparent bg-white hover:border-gray-400 transition-colors',
  {
    variants: {
      size: {
        sm: 'text-xs h-8',
        md: 'text-sm h-9', // Default
        lg: 'text-base h-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface PageSizeSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof pageSizeSelectorVariants> {
  /**
   * Current page size value
   */
  value: number;
  /**
   * Change handler
   */
  onChange: (pageSize: number) => void;
  /**
   * Available page size options
   */
  options?: number[];
  /**
   * Label text before selector
   */
  label?: string;
  /**
   * Label text after selector
   */
  recordsLabel?: string;
  /**
   * Select className
   */
  selectClassName?: string;
}

const PageSizeSelector = React.forwardRef<HTMLDivElement, PageSizeSelectorProps>(
  (
    {
      className,
      size,
      value,
      onChange,
      options = [5, 10, 20, 50, 100],
      label = 'Hiển thị:',
      recordsLabel = 'bản ghi/trang',
      selectClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(pageSizeSelectorVariants({ size }), className)}
        {...props}
      >
        {label && (
          <span className='font-medium text-gray-700'>{label}</span>
        )}
        <select
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className={cn(selectVariants({ size }), selectClassName)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {recordsLabel && (
          <span className='text-gray-600'>{recordsLabel}</span>
        )}
      </div>
    );
  }
);
PageSizeSelector.displayName = 'PageSizeSelector';

export { PageSizeSelector, pageSizeSelectorVariants };

