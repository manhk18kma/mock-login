'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

/**
 * Unified TableContainer Component
 *
 * Standard wrapper for table content with ref support for scroll calculations.
 * Used in EmployeePage, OrganizationPage, and other pages with tables.
 *
 * Design System:
 * - Layout: min-h-0 (for flex layout)
 * - Supports ref for dynamic scroll height calculations
 */

export interface TableContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Children content (usually a Table component)
   */
  children: React.ReactNode;
}

export const TableContainer = React.forwardRef<
  HTMLDivElement,
  TableContainerProps
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('min-h-0', className)} {...props}>
      {children}
    </div>
  );
});
TableContainer.displayName = 'TableContainer';

