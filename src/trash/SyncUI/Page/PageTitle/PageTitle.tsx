'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

/**
 * Unified PageTitle Component
 *
 * Standard page title styling.
 * Used across all pages for consistent typography.
 *
 * Design System:
 * - Font size: text-2xl (24px)
 * - Font weight: font-bold (700)
 * - Color: text-neutral-900
 * - Margin bottom: mb-6 (24px)
 */

export interface PageTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Title text
   */
  children: React.ReactNode;
}

export const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className='mb-component-lg'>
        <h1
          ref={ref}
          className={cn('text-2xl font-bold text-neutral-900', className)}
          {...props}
        >
          {children}
        </h1>
      </div>
    );
  }
);
PageTitle.displayName = 'PageTitle';

