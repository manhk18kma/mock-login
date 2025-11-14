import React from 'react';
import { Spinner } from '@/components/SyncUI/Feedback';

export interface TableColumn<T = any> {
  key: string;
  header: string | React.ReactNode;
  width?: string | number;
  minWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: T, index: number) => React.ReactNode;
  className?: string;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: string | ((record: T, index: number) => string | number);
  onRowClick?: (record: T, index: number) => void;
  className?: string;
  minWidth?: string | number;
  headerClassName?: string;
  rowClassName?: string | ((record: T, index: number) => string);
  emptyText?: React.ReactNode;
  loading?: boolean;
}

export function Table<T = any>({
  columns,
  data,
  rowKey,
  onRowClick,
  className = '',
  minWidth = '1400px',
  headerClassName = '',
  rowClassName = '',
  emptyText = 'Không có dữ liệu',
  loading = false,
}: TableProps<T>) {
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record, index);
    }
    if (typeof rowKey === 'string') {
      return (record as any)[rowKey] ?? index;
    }
    return index;
  };

  const getRowClassName = (record: T, index: number): string => {
    const baseClass = 'border-b transition-colors hover:bg-neutral-50';
    const customClass =
      typeof rowClassName === 'function'
        ? rowClassName(record, index)
        : rowClassName;
    return `${baseClass} ${customClass}`.trim();
  };

  return (
    <div className='border rounded-lg overflow-hidden bg-white'>
      <div
        className='overflow-x-auto'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(173, 181, 189) rgb(248, 249, 250)', // neutral-500 neutral-100
        }}
      >
        <table
          className={`w-full caption-bottom text-sm ${className}`}
          style={{ minWidth }}
        >
          <thead className={`bg-viettel-lavender ${headerClassName}`}>
            <tr className='border-b'>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-black text-xs ${
                    column.className || ''
                  }`}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    textAlign: column.align || 'left',
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-xs'>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='p-component-lg text-center text-neutral-500'
                >
                  <div className='flex items-center justify-center gap-2'>
                    <Spinner size='md' variant='default' />
                    <span>Đang tải...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='p-component-lg text-center text-neutral-500'
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((record, index) => (
                <tr
                  key={getRowKey(record, index)}
                  className={getRowClassName(record, index)}
                  onClick={() => onRowClick?.(record, index)}
                  style={{
                    cursor: onRowClick ? 'pointer' : 'default',
                  }}
                >
                  {columns.map((column) => {
                    const cellValue = (record as any)[column.key];
                    const content = column.render
                      ? column.render(cellValue, record, index)
                      : cellValue ?? '';

                    return (
                      <td
                        key={column.key}
                        className={`p-2 align-middle whitespace-nowrap text-xs ${
                          column.className || ''
                        }`}
                        style={{
                          textAlign: column.align || 'left',
                        }}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

