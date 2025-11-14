'use client';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import * as React from 'react';
import { Input, InputProps } from '@/components/SyncUI/Forms';

/**
 * Unified SearchInput Component
 *
 * Input field with search icon on the left.
 * Used in EmployeeFilters, OrganizationFilters, and other filter sections.
 *
 * Design System:
 * - Search icon: absolute left-3, text-neutral-400
 * - Input padding: pl-10 (to accommodate icon)
 */

export interface SearchInputProps extends Omit<InputProps, 'className'> {
  /**
   * Custom className (applied to Input, not wrapper)
   */
  className?: string;
  /**
   * Wrapper className (optional)
   */
  wrapperClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn('flex-1 relative', wrapperClassName)}>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10' />
        <Input
          ref={ref}
          type='text'
          className={cn('pl-10', className)}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

