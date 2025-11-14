'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Unified Pagination Component
 *
 * Synchronizes style according to design system, replaces all hardcoded pagination styles.
 *
 * Common patterns in codebase:
 * - Page size selector with select dropdown
 * - Previous/Next buttons
 * - Page numbers with ellipsis logic (first, last, current ± 1)
 * - Page info (Page X / Y)
 * - Active page: bg-viettel-red text-white (from tailwind.config.js)
 *
 * Design System:
 * - Active page: bg-viettel-red text-white
 * - Hover: hover:bg-gray-100
 * - Disabled: opacity-50 pointer-events-none
 * - Border radius: rounded-md
 * - Size: size-9 (36px) for icon buttons
 */

const paginationLinkVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-gray-100',
        active: 'bg-viettel-red text-white hover:bg-viettel-red',
      },
      size: {
        sm: 'size-8 text-xs',
        md: 'size-9 text-sm', // Default
        lg: 'size-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationLinkVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageSizeSelector?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  showPageInfo?: boolean;
  pageInfoLabel?: string;
  pageSizeLabel?: string;
  pageSizeRecordsLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      showPageSizeSelector = false,
      pageSize,
      pageSizeOptions = [5, 10, 20, 50, 100],
      onPageSizeChange,
      showPageInfo = true,
      pageInfoLabel,
      pageSizeLabel = 'Hiển thị:',
      pageSizeRecordsLabel = 'bản ghi/trang',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    const handlePrevious = () => {
      if (canPrev) {
        onPageChange(Math.max(1, currentPage - 1));
      }
    };

    const handleNext = () => {
      if (canNext) {
        onPageChange(Math.min(totalPages, currentPage + 1));
      }
    };

    return (
      <div className={cn('flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm', className)}>
        {/* Page Size Selector */}
        {showPageSizeSelector && pageSize && onPageSizeChange && (
          <div className='flex items-center gap-3'>
            <span className='text-sm font-medium text-gray-700'>{pageSizeLabel}</span>
            <select
              value={pageSize}
              onChange={e => onPageSizeChange(Number(e.target.value))}
              className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-viettel-red focus:border-transparent bg-white hover:border-gray-400 transition-colors'
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className='text-sm text-gray-600'>{pageSizeRecordsLabel}</span>
          </div>
        )}

        {/* Pagination */}
        <div className='flex items-center gap-4'>
          <nav
            ref={ref as React.RefObject<HTMLElement>}
            role='navigation'
            aria-label='pagination'
            className='flex flex-row items-center gap-1'
            {...props}
          >
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={!canPrev}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 gap-1 px-2.5 sm:pl-2.5',
                size === 'sm' ? 'size-8 text-xs' : size === 'lg' ? 'size-10 text-base' : 'h-9',
                !canPrev
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer hover:bg-gray-100 transition-colors'
              )}
              aria-label='Go to previous page'
            >
              <ChevronLeft className='size-4' />
              <span className='hidden sm:block'>Previous</span>
            </button>

            {/* Page Numbers */}
            {totalPages > 0 ? (
              [...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => onPageChange(page)}
                      className={cn(
                        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer transition-colors',
                        size === 'sm' ? 'size-8 text-xs' : size === 'lg' ? 'size-10 text-base' : 'size-9',
                        isActive
                          ? 'bg-viettel-red !text-white hover:bg-viettel-red'
                          : 'hover:bg-gray-100'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span
                      key={page}
                      aria-hidden
                      className={cn(
                        'flex items-center justify-center text-gray-500',
                        size === 'sm' ? 'size-8' : size === 'lg' ? 'size-10' : 'size-9'
                      )}
                    >
                      <MoreHorizontal className='size-4' />
                      <span className='sr-only'>More pages</span>
                    </span>
                  );
                }
                return null;
              })
            ) : (
              <button
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-viettel-red !text-white',
                  size === 'sm' ? 'size-8 text-xs' : size === 'lg' ? 'size-10 text-base' : 'size-9'
                )}
                aria-current='page'
              >
                1
              </button>
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!canNext}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 gap-1 px-2.5 sm:pr-2.5',
                size === 'sm' ? 'size-8 text-xs' : size === 'lg' ? 'size-10 text-base' : 'h-9',
                !canNext
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer hover:bg-gray-100 transition-colors'
              )}
              aria-label='Go to next page'
            >
              <span className='hidden sm:block'>Next</span>
              <ChevronRight className='size-4' />
            </button>
          </nav>

          {/* Page Info - inline with pagination */}
          {showPageInfo && (
            <span className='text-sm text-gray-600 whitespace-nowrap'>
              {pageInfoLabel || `Trang ${currentPage} / ${Math.max(1, totalPages)}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination, paginationLinkVariants };

