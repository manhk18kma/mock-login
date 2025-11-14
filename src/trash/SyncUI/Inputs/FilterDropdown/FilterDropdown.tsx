'use client';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/SyncUI/Buttons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/SyncUI/Overlay';

/**
 * Unified FilterDropdown Component
 *
 * Dropdown menu for filter selection with consistent styling.
 * Used in EmployeeFilters, OrganizationFilters, and other filter sections.
 *
 * Design System:
 * - Trigger: Button variant="outline" with ChevronDown icon
 * - Content: align='start', width='w-56' (or custom)
 * - Consistent styling across all filter dropdowns
 */

export interface FilterDropdownOption {
  value: string | number | null | undefined;
  label: string;
}

export interface FilterDropdownProps {
  /**
   * Current selected value
   */
  value: string | number | null | undefined;
  /**
   * Options list
   */
  options: FilterDropdownOption[];
  /**
   * Change handler
   */
  onValueChange: (value: string | number | null | undefined) => void;
  /**
   * Placeholder text (shown when no value selected)
   */
  placeholder: string;
  /**
   * Width variant: 'fixed' (w-56) or 'flexible' (w-full)
   */
  width?: 'fixed' | 'flexible';
  /**
   * Custom className for trigger button
   */
  triggerClassName?: string;
  /**
   * Custom className for dropdown content
   */
  contentClassName?: string;
  /**
   * Empty state message (optional)
   */
  emptyMessage?: string;
}

export const FilterDropdown = React.forwardRef<
  HTMLButtonElement,
  FilterDropdownProps
>(
  (
    {
      value,
      options,
      onValueChange,
      placeholder,
      width = 'fixed',
      triggerClassName,
      contentClassName,
      emptyMessage,
    },
    ref
  ) => {
    const selectedOption = options.find(opt => opt.value === value);
    const displayText = selectedOption?.label || placeholder;

    const widthClass =
      width === 'fixed'
        ? 'w-56'
        : 'flex-1 min-w-dropdown-md max-w-dropdown-lg';

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant='outline'
            className={cn(widthClass, 'justify-between', triggerClassName)}
          >
            <span className='text-neutral-700 truncate'>{displayText}</span>
            <ChevronDown className='w-4 h-4 text-neutral-400' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          className={cn(widthClass, contentClassName)}
        >
          <DropdownMenuItem onClick={() => onValueChange(undefined)}>
            {placeholder}
          </DropdownMenuItem>
          {options && options.length > 0 ? (
            options.map(option => (
              <DropdownMenuItem
                key={option.value ?? 'null'}
                onClick={() => onValueChange(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))
          ) : (
            emptyMessage && (
              <div className='px-4 py-2 text-neutral-500 text-xs'>
                {emptyMessage}
              </div>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
FilterDropdown.displayName = 'FilterDropdown';

