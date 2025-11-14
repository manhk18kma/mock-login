'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Spinner, SpinnerProps } from '../Spinner';

/**
 * Unified PageLoading Component
 *
 * Full-page loading overlay with spinner.
 * Used for page-level loading states.
 *
 * Design System:
 * - Background: bg-transparent backdrop-blur-sm
 * - Z-index: z-[9999] (above all content)
 * - Centered spinner
 */

export interface PageLoadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Spinner size
   * @default 'lg'
   */
  spinnerSize?: SpinnerProps['size'];
  /**
   * Spinner variant
   * @default 'default'
   */
  spinnerVariant?: SpinnerProps['variant'];
  /**
   * Spinner type
   * @default 'border'
   */
  spinnerType?: SpinnerProps['type'];
  /**
   * Custom loading message
   */
  message?: string;
}

export const PageLoading = React.forwardRef<HTMLDivElement, PageLoadingProps>(
  (
    {
      spinnerSize = 'lg',
      spinnerVariant = 'default',
      spinnerType = 'border',
      message,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col justify-center items-center h-screen bg-transparent backdrop-blur-sm z-[9999]',
          className
        )}
        {...props}
      >
        <Spinner size={spinnerSize} variant={spinnerVariant} type={spinnerType} />
        {message && (
          <p className='mt-4 text-neutral-600 text-sm'>{message}</p>
        )}
      </div>
    );
  }
);
PageLoading.displayName = 'PageLoading';

