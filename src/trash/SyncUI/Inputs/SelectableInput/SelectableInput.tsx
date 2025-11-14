'use client';

import { cn } from '@/lib/utils';
import { MoreHorizontal, X } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/SyncUI/Buttons';
import { Input, InputProps } from '@/components/SyncUI/Forms';

/**
 * Unified SelectableInput Component
 *
 * Read-only input with clear button and select button (MoreHorizontal icon).
 * Used for organization selection, parent organization selection, etc.
 *
 * Design System:
 * - Clear button: absolute right-8 (when value exists)
 * - Select button: absolute right-2 (MoreHorizontal icon)
 * - Input: readOnly, cursor-pointer, bg-neutral-50 (optional)
 * - Width: w-80 (fixed) or flex-1 (flexible)
 */

export interface SelectableInputProps
  extends Omit<InputProps, 'className' | 'readOnly' | 'onClick'> {
  /**
   * Input value
   */
  value: string;
  /**
   * Clear handler
   */
  onClear: () => void;
  /**
   * Select/Click handler (opens modal)
   */
  onSelect: () => void;
  /**
   * Custom className (applied to Input)
   */
  className?: string;
  /**
   * Wrapper className (optional)
   */
  wrapperClassName?: string;
  /**
   * Width variant: 'fixed' (w-80) or 'flexible' (flex-1)
   */
  width?: 'fixed' | 'flexible';
  /**
   * Show background color (bg-neutral-50)
   */
  showBackground?: boolean;
  /**
   * Clear button title/tooltip
   */
  clearTitle?: string;
  /**
   * Select button title/tooltip
   */
  selectTitle?: string;
}

export const SelectableInput = React.forwardRef<
  HTMLInputElement,
  SelectableInputProps
>(
  (
    {
      value,
      onClear,
      onSelect,
      className,
      wrapperClassName,
      width = 'fixed',
      showBackground = true,
      clearTitle,
      selectTitle,
      ...props
    },
    ref
  ) => {
    const widthClass = width === 'fixed' ? 'w-80' : 'flex-1';
    const hasValue = !!value;

    return (
      <div className={cn('relative', widthClass, wrapperClassName)}>
        <Input
          ref={ref}
          type='text'
          value={value}
          readOnly
          onClick={onSelect}
          onChange={() => {}} // Disable typing
          onKeyPress={() => {}} // Disable enter key
          className={cn(
            'pr-20 cursor-pointer',
            showBackground && 'bg-neutral-50',
            className
          )}
          {...props}
        />

        {/* Clear button */}
        {hasValue && (
          <Button
            variant='ghost'
            size='icon'
            onClick={e => {
              e.stopPropagation();
              onClear();
            }}
            className='absolute right-8 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600'
            title={clearTitle}
          >
            <X className='w-4 h-4' />
          </Button>
        )}

        {/* Select button */}
        <Button
          variant='ghost'
          size='icon'
          onClick={onSelect}
          className='absolute right-2 top-1/2 -translate-y-1/2 p-1'
          title={selectTitle}
        >
          <MoreHorizontal className='w-4 h-4 text-neutral-600' />
        </Button>
      </div>
    );
  }
);
SelectableInput.displayName = 'SelectableInput';

