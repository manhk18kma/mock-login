'use client';

import { Spinner } from '@/components/SyncUI/Feedback';
import { Search, X } from 'lucide-react';
import * as React from 'react';
import { Button } from './Button';

/**
 * Unified FilterActionButtons Component
 *
 * Common pattern for filter action buttons (Clear Filters + Search).
 * Used in EmployeePage, OrganizationPage, and other filter sections.
 *
 * Features:
 * - Clear Filters button (shown only when hasActiveFilters is true)
 * - Search button with loading state
 * - Consistent styling and behavior
 */

export interface FilterActionButtonsProps {
  /**
   * Clear filters handler
   */
  onClearFilters?: () => void;
  /**
   * Search handler
   */
  onSearch?: () => void;
  /**
   * Loading state for search button
   */
  searching?: boolean;
  /**
   * Whether filters are active (shows clear button)
   */
  hasActiveFilters?: boolean;
  /**
   * Clear button text (optional, uses i18n by default)
   */
  clearText?: string;
  /**
   * Search button text (optional, uses i18n by default)
   */
  searchText?: string;
  /**
   * Searching button text (optional, uses i18n by default)
   */
  searchingText?: string;
  /**
   * Alignment of buttons (default: 'end')
   */
  align?: 'start' | 'end' | 'center';
  /**
   * Custom className
   */
  className?: string;
}

export const FilterActionButtons = React.forwardRef<
  HTMLDivElement,
  FilterActionButtonsProps
>(
  (
    {
      onClearFilters,
      onSearch,
      searching = false,
      hasActiveFilters = false,
      clearText,
      searchText,
      searchingText,
      align = 'end',
      className,
      ...props
    },
    ref
  ) => {
    const alignClass =
      align === 'start'
        ? 'justify-start'
        : align === 'center'
          ? 'justify-center'
          : 'justify-end';

    return (
      <div
        ref={ref}
        className={`mb-4 flex gap-2 items-center ${alignClass} ${className || ''}`}
        {...props}
      >
        {/* Clear Filters Button */}
        {hasActiveFilters && onClearFilters && (
          <Button variant='outline' onClick={onClearFilters} className='w-32'>
            <X className='w-4 h-4' />
            {clearText || 'Clear Filters'}
          </Button>
        )}

        {/* Search Button */}
        {onSearch && (
          <Button variant='secondary' onClick={onSearch} disabled={searching}>
            {searching ? (
              <Spinner size='sm' variant='white' type='border' />
            ) : (
              <Search className='w-4 h-4' />
            )}
            {searching
              ? searchingText || 'Searching...'
              : searchText || 'Search'}
          </Button>
        )}
      </div>
    );
  }
);
FilterActionButtons.displayName = 'FilterActionButtons';
