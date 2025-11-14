'use client';

import * as React from 'react';

/**
 * Unified SyncInfo Component
 *
 * Displays last sync time information.
 * Used in EmployeePage, OrganizationPage, and other pages with sync functionality.
 *
 * Design System:
 * - Label: text-neutral-700
 * - Value: text-viettel-red
 * - Spacing: mx-2 between label and value
 */

export interface SyncInfoProps {
  /**
   * Last sync time string (ISO date string or formatted string)
   * If ISO string, will be formatted automatically
   */
  lastSyncTime: string | null | undefined;
  /**
   * Label text (optional, uses i18n by default)
   */
  label?: string;
  /**
   * No data text (optional, uses i18n by default)
   */
  noDataText?: string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Format date automatically (default: true)
   * If false, lastSyncTime is treated as already formatted string
   */
  autoFormat?: boolean;
}

/**
 * Format sync date to DD/MM/YYYY HH:mm:ss
 */
const formatSyncDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  } catch {
    return '';
  }
};

export const SyncInfo = React.forwardRef<HTMLDivElement, SyncInfoProps>(
  (
    { lastSyncTime, label, noDataText, className, autoFormat = true, ...props },
    ref
  ) => {
    const displayValue = autoFormat
      ? formatSyncDate(lastSyncTime)
      : lastSyncTime || '';

    return (
      <div
        ref={ref}
        className={`flex items-center ${className || ''}`}
        {...props}
      >
        <span className='text-neutral-700'>{label || 'Last Sync Time'}</span>
        <span className='text-viettel-red mx-2'>
          {displayValue || noDataText || 'No Data'}
        </span>
      </div>
    );
  }
);
SyncInfo.displayName = 'SyncInfo';

