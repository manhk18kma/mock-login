'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { PageSizeSelector, type PageSizeSelectorProps } from '../PageSizeSelector';

/**
 * Unified PaginationContainer Component
 *
 * Wrapper component that combines Pagination + PageSizeSelector with consistent styling.
 * Used in EmployeePage, OrganizationPage, and other pages with pagination.
 *
 * Design System:
 * - Background: bg-white
 * - Padding: p-4
 * - Border: border border-neutral-200
 * - Shadow: shadow-sm
 * - Border radius: rounded-lg
 * - Min height: min-h-0 (for flex layout)
 *
 * Usage:
 * ```tsx
 * <PaginationContainer
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   pageSize={pageSize}
 *   onPageChange={setCurrentPage}
 *   onPageSizeChange={setPageSize}
 * />
 * ```
 */

export interface PaginationContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current page number
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Page change handler
   */
  onPageChange: (page: number) => void;
  /**
   * Current page size
   */
  pageSize: number;
  /**
   * Page size change handler
   */
  onPageSizeChange: (pageSize: number) => void;
  /**
   * Available page size options
   */
  pageSizeOptions?: number[];
  /**
   * Label text before page size selector
   */
  pageSizeLabel?: string;
  /**
   * Label text after page size selector
   */
  pageSizeRecordsLabel?: string;
  /**
   * Show page info (Trang X / Y)
   */
  showPageInfo?: boolean;
  /**
   * Custom page info label
   */
  pageInfoLabel?: string;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Container className
   */
  containerClassName?: string;
  /**
   * Show page size selector
   */
  showPageSizeSelector?: boolean;
}

const PaginationContainer = React.forwardRef<
  HTMLDivElement,
  PaginationContainerProps
>(
  (
    {
      className,
      containerClassName,
      currentPage,
      totalPages,
      pageSize,
      onPageChange,
      onPageSizeChange,
      showPageSizeSelector = true,
      pageSizeOptions = [5, 10, 20, 50, 100],
      pageSizeLabel = 'Hiển thị:',
      pageSizeRecordsLabel = 'bản ghi/trang',
      showPageInfo = true,
      pageInfoLabel,
      size = 'md',
      ...paginationProps
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-0 flex flex-wrap items-center justify-between bg-white p-4 rounded-lg border border-neutral-200 shadow-sm',
          containerClassName
        )}
      >
        {/* Page Size Selector */}
        {showPageSizeSelector && (
          <PageSizeSelector
            value={pageSize}
            onChange={onPageSizeChange}
            options={pageSizeOptions}
            label={pageSizeLabel}
            recordsLabel={pageSizeRecordsLabel}
            size={size}
          />
        )}

        {/* Pagination - Extract only the navigation part */}
        <div className={cn('flex items-center gap-4', showPageSizeSelector && 'flex-1 justify-end')}>
          <nav
            role='navigation'
            aria-label='pagination'
            className='flex flex-row items-center gap-1'
          >
            {/* Previous Button */}
            <button
              onClick={() => currentPage > 1 && onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 gap-1 px-2.5 sm:pl-2.5',
                size === 'sm' ? 'size-8 text-xs' : size === 'lg' ? 'size-10 text-base' : 'h-9',
                currentPage <= 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer hover:bg-gray-100 transition-colors'
              )}
              aria-label='Go to previous page'
            >
              <span className='hidden sm:block'>Trước</span>
              <span className='sm:hidden'>‹</span>
            </button>

            {/* Page Numbers */}
            {totalPages > 0 ? (
              [...Array(totalPages)].map((_, i) => {
                const page = i + 1;
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
                      ...
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
              onClick={() => currentPage < totalPages && onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 gap-1 px-2.5 sm:pr-2.5',
                size === 'sm' ? 'size-8 text-xs' : size === 'lg' ? 'size-10 text-base' : 'h-9',
                currentPage >= totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer hover:bg-gray-100 transition-colors'
              )}
              aria-label='Go to next page'
            >
              <span className='hidden sm:block'>Sau</span>
              <span className='sm:hidden'>›</span>
            </button>
          </nav>

          {/* Page Info */}
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
PaginationContainer.displayName = 'PaginationContainer';

export { PaginationContainer };

