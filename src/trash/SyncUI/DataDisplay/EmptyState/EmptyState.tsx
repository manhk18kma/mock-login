'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

/**
 * Unified EmptyState Component
 *
 * Displays empty state with icon, title, description, and optional action.
 * Used in tables and lists when there's no data to display.
 *
 * Design System:
 * - Icon: w-16 h-16 bg-neutral-100 rounded-full
 * - Title: text-lg font-medium text-neutral-900
 * - Description: text-neutral-500
 * - Padding: py-12
 */

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon component (from lucide-react)
   */
  icon?: LucideIcon;
  /**
   * Title text
   */
  title?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Optional action button/component
   */
  action?: React.ReactNode;
  /**
   * Custom icon size
   * @default 'lg'
   */
  iconSize?: 'sm' | 'md' | 'lg';
  /**
   * Show icon background circle
   * @default true
   */
  showIconBackground?: boolean;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon: Icon,
      title,
      description,
      action,
      iconSize = 'lg',
      showIconBackground = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const iconSizeClass = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    }[iconSize];

    const iconInnerSizeClass = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    }[iconSize];

    return (
      <div
        ref={ref}
        className={cn('py-12 text-center', className)}
        {...props}
      >
        <div className='flex flex-col items-center gap-4'>
          {/* Icon */}
          {Icon && (
            <div
              className={cn(
                'flex items-center justify-center',
                showIconBackground &&
                  'bg-neutral-100 rounded-full',
                iconSizeClass
              )}
            >
              <Icon className={cn('text-neutral-400', iconInnerSizeClass)} />
            </div>
          )}

          {/* Content */}
          {(title || description || children) && (
            <div>
              {title && (
                <h3 className='text-lg font-medium text-neutral-900 mb-2'>
                  {title}
                </h3>
              )}
              {description && (
                <p className='text-neutral-500'>{description}</p>
              )}
              {children}
            </div>
          )}

          {/* Action */}
          {action && <div className='mt-2'>{action}</div>}
        </div>
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

