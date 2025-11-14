'use client';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';

/**
 * Unified Breadcrumb Component
 *
 * Navigation breadcrumb for showing current page location.
 * Used across the application for consistent navigation.
 *
 * Design System:
 * - Separator: ChevronRight icon
 * - Link color: text-neutral-600 hover:text-viettel-red
 * - Current page: text-viettel-red font-semibold
 * - Background: bg-neutral-50 (optional)
 * - Border: border-b border-neutral-200 (optional)
 */

export interface BreadcrumbItem {
  /**
   * Label text for the breadcrumb item
   */
  label: string;
  /**
   * Optional href/link for the breadcrumb item
   * If not provided, item is rendered as plain text (current page)
   */
  href?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItem[];
  /**
   * Show background and border
   * @default false
   */
  showBackground?: boolean;
  /**
   * Custom separator component (default: ChevronRight icon)
   */
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    {
      items,
      showBackground = false,
      separator,
      className,
      ...props
    },
    ref
  ) => {
    const defaultSeparator = <ChevronRight className='w-4 h-4 text-neutral-400' />;
    const separatorElement = separator || defaultSeparator;

    return (
      <div
        ref={ref}
        className={cn(
          showBackground && 'bg-neutral-50 border-b border-neutral-200',
          className
        )}
        {...props}
      >
        <div className='max-w-[1400px] mx-auto px-6 py-3'>
          <nav
            className='flex items-center gap-2 text-xs2'
            aria-label='Breadcrumb'
          >
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              if (isLast || (!item.href && !item.onClick)) {
                // Current page - no link
                return (
                  <React.Fragment key={index}>
                    <span className='text-viettel-red font-semibold'>
                      {item.label}
                    </span>
                  </React.Fragment>
                );
              }

              // Link item
              return (
                <React.Fragment key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className='text-neutral-600 hover:text-viettel-red transition-colors'
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className='text-neutral-600 hover:text-viettel-red transition-colors bg-transparent border-none p-0 cursor-pointer'
                    >
                      {item.label}
                    </button>
                  )}
                  {!isLast && separatorElement}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';

