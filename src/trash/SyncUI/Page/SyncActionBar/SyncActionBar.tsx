'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { SyncInfo, SyncInfoProps } from '../SyncInfo';

/**
 * Unified SyncActionBar Component
 *
 * Common layout for sync info and action buttons row.
 * Used in EmployeePage, OrganizationPage, and other pages with sync functionality.
 *
 * Layout:
 * - Left: SyncInfo
 * - Right: Action buttons (custom children)
 */

export interface SyncActionBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Last sync time (passed to SyncInfo)
   */
  lastSyncTime: string | null | undefined;
  /**
   * SyncInfo label (optional)
   */
  syncLabel?: string;
  /**
   * SyncInfo noDataText (optional)
   */
  syncNoDataText?: string;
  /**
   * Action buttons (right side)
   */
  actions?: React.ReactNode;
  /**
   * Additional margin classes (default: 'mb-component-md')
   */
  marginClassName?: string;
}

export const SyncActionBar = React.forwardRef<
  HTMLDivElement,
  SyncActionBarProps
>(
  (
    {
      lastSyncTime,
      syncLabel,
      syncNoDataText,
      actions,
      marginClassName = 'mb-component-md',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-form-field-gap items-center justify-between',
          marginClassName,
          className
        )}
        {...props}
      >
        {/* Left side - Sync Info */}
        <SyncInfo
          lastSyncTime={lastSyncTime}
          label={syncLabel}
          noDataText={syncNoDataText}
        />

        {/* Right side - Action Buttons */}
        {actions && <div className='flex gap-form-field-gap items-center'>{actions}</div>}
      </div>
    );
  }
);
SyncActionBar.displayName = 'SyncActionBar';

