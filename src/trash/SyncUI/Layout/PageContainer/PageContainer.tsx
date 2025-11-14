'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

/**
 * Unified PageContainer Component
 *
 * Standard wrapper for page content with consistent layout.
 * Used in EmployeePage, OrganizationPage, and other pages.
 *
 * Design System:
 * - Layout: flex flex-col min-h-0
 * - Provides consistent page structure
 */

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Children content
   */
  children: React.ReactNode;
}

export const PageContainer = React.forwardRef<
  HTMLDivElement,
  PageContainerProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col min-h-0', className)}
      {...props}
    >
      {children}
    </div>
  );
});
PageContainer.displayName = 'PageContainer';

