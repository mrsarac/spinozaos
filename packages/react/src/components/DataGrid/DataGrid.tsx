// DataGrid - Bloomberg-style dense data table
// Substance aesthetic with sorting, pagination, and animations

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { SPRING } from '@spinozaos/motion';
import { cn } from '../../utils';

// ============================================================================
// Types
// ============================================================================

export interface Column<T> {
  /** Key to access data from row object */
  key: keyof T | string;
  /** Column header text */
  header: string;
  /** Column width (CSS value) */
  width?: string | number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Custom cell renderer */
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface DataGridProps<T extends Record<string, any>> {
  /** Data array to display */
  data: T[];
  /** Column definitions */
  columns: Column<T>[];
  /** Number of rows per page */
  pageSize?: number;
  /** Enable sorting globally */
  sortable?: boolean;
  /** Alternate row backgrounds */
  striped?: boolean;
  /** Compact row height */
  compact?: boolean;
  /** Sticky header on scroll */
  stickyHeader?: boolean;
  /** Show loading skeletons */
  loading?: boolean;
  /** Message when data is empty */
  emptyMessage?: string;
  /** Callback when row is clicked */
  onRowClick?: (row: T, index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  key: string | null;
  direction: SortDirection;
}

// ============================================================================
// Variants
// ============================================================================

const dataGridVariants = cva(
  [
    'w-full overflow-hidden',
    'border border-white/5 rounded-sm',
    'bg-void-lighter/50',
  ],
  {
    variants: {
      compact: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      compact: false,
    },
  }
);

const headerCellVariants = cva(
  [
    'font-mono text-[10px] uppercase tracking-wider',
    'text-neutral-500 select-none',
    'transition-colors duration-150',
  ],
  {
    variants: {
      sortable: {
        true: 'cursor-pointer hover:text-neutral-300',
        false: '',
      },
      sorted: {
        true: 'text-spinoza-yellow',
        false: '',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      compact: {
        true: 'px-2 py-2',
        false: 'px-3 py-3',
      },
    },
    defaultVariants: {
      sortable: false,
      sorted: false,
      align: 'left',
      compact: false,
    },
  }
);

const cellVariants = cva(
  [
    'text-neutral-300 font-mono text-sm',
    'transition-colors duration-150',
  ],
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      compact: {
        true: 'px-2 py-1.5',
        false: 'px-3 py-2.5',
      },
    },
    defaultVariants: {
      align: 'left',
      compact: false,
    },
  }
);

const rowVariants = cva(
  [
    'border-b border-white/5 last:border-b-0',
    'transition-colors duration-150',
  ],
  {
    variants: {
      clickable: {
        true: 'cursor-pointer',
        false: '',
      },
      striped: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      clickable: false,
      striped: false,
    },
  }
);

// ============================================================================
// Formatters
// ============================================================================

/**
 * Format number with commas and optional decimals
 */
export function formatNumber(value: number | string, decimals = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format value as currency (USD)
 */
export function formatCurrency(value: number | string, decimals = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);
  return '$' + formatNumber(num, decimals);
}

/**
 * Format value as percentage with color indicator
 */
export function formatPercent(value: number | string, decimals = 2): React.ReactNode {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);

  const formatted = num.toFixed(decimals) + '%';
  const colorClass = num > 0 ? 'text-green-400' : num < 0 ? 'text-red-400' : 'text-neutral-400';
  const prefix = num > 0 ? '+' : '';

  return (
    <span className={colorClass}>
      {prefix}{formatted}
    </span>
  );
}

/**
 * Format date to short format
 */
export function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  });
}

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const rowAnimationVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING.soft,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 },
  },
};

// ============================================================================
// Component
// ============================================================================

function DataGridInner<T extends Record<string, any>>(
  {
    data,
    columns,
    pageSize = 10,
    sortable = false,
    striped = false,
    compact = false,
    stickyHeader = false,
    loading = false,
    emptyMessage = 'No data available',
    onRowClick,
    className,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  // State
  const [sortState, setSortState] = React.useState<SortState>({
    key: null,
    direction: null,
  });
  const [currentPage, setCurrentPage] = React.useState(0);

  // Reset page when data changes
  React.useEffect(() => {
    setCurrentPage(0);
  }, [data.length]);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortState.key || !sortState.direction) return data;

    return [...data].sort((a, b) => {
      const aVal = getNestedValue(a, sortState.key!);
      const bVal = getNestedValue(b, sortState.key!);

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    const start = currentPage * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handlers
  const handleSort = (key: string) => {
    setSortState((prev) => {
      if (prev.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key: null, direction: null };
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // Render loading skeleton
  if (loading) {
    return (
      <div ref={ref} className={cn(dataGridVariants({ compact }), className)}>
        <table className="w-full table-fixed">
          <thead className="bg-void">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={headerCellVariants({ align: col.align, compact })}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: pageSize }).map((_, rowIndex) => (
              <tr key={rowIndex} className={rowVariants({ striped })}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={cellVariants({ align: col.align, compact })}
                  >
                    <div className="h-4 bg-white/10 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Render empty state
  if (data.length === 0) {
    return (
      <div ref={ref} className={cn(dataGridVariants({ compact }), className)}>
        <table className="w-full table-fixed">
          <thead className="bg-void">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={headerCellVariants({ align: col.align, compact })}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="py-12 text-center">
          <p className="text-neutral-500 font-mono text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(dataGridVariants({ compact }), className)}>
      <div className={stickyHeader ? 'overflow-auto max-h-[600px]' : ''}>
        <table className="w-full table-fixed">
          <thead className={cn('bg-void', stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {columns.map((col, i) => {
                const isSortable = sortable || col.sortable;
                const isSorted = sortState.key === String(col.key);
                const colKey = String(col.key);

                return (
                  <th
                    key={i}
                    className={headerCellVariants({
                      sortable: isSortable,
                      sorted: isSorted,
                      align: col.align,
                      compact,
                    })}
                    style={{ width: col.width }}
                    onClick={isSortable ? () => handleSort(colKey) : undefined}
                  >
                    <div className="flex items-center gap-1">
                      {col.align === 'right' && <span className="flex-1" />}
                      <span>{col.header}</span>
                      {isSortable && (
                        <span className="inline-flex flex-col ml-1">
                          <ChevronUp
                            size={10}
                            className={cn(
                              'transition-opacity',
                              isSorted && sortState.direction === 'asc'
                                ? 'opacity-100 text-spinoza-yellow'
                                : 'opacity-30'
                            )}
                          />
                          <ChevronDown
                            size={10}
                            className={cn(
                              '-mt-1 transition-opacity',
                              isSorted && sortState.direction === 'desc'
                                ? 'opacity-100 text-spinoza-yellow'
                                : 'opacity-30'
                            )}
                          />
                        </span>
                      )}
                      {col.align !== 'right' && col.align === 'center' && <span className="flex-1" />}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <AnimatePresence mode="wait">
            <motion.tbody
              key={`${currentPage}-${sortState.key}-${sortState.direction}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {paginatedData.map((row, rowIndex) => {
                const actualIndex = currentPage * pageSize + rowIndex;
                const isEven = rowIndex % 2 === 0;

                return (
                  <motion.tr
                    key={actualIndex}
                    variants={rowAnimationVariants}
                    className={cn(
                      rowVariants({
                        clickable: !!onRowClick,
                        striped,
                      }),
                      striped && !isEven && 'bg-white/[0.02]',
                      'hover:bg-white/5'
                    )}
                    onClick={onRowClick ? () => onRowClick(row, actualIndex) : undefined}
                  >
                    {columns.map((col, colIndex) => {
                      const value = getNestedValue(row, String(col.key));
                      const rendered = col.render
                        ? col.render(value, row, actualIndex)
                        : value;

                      return (
                        <td
                          key={colIndex}
                          className={cellVariants({ align: col.align, compact })}
                        >
                          {rendered}
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-white/5 bg-void">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
            Page {currentPage + 1} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={cn(
                'p-1.5 rounded transition-colors',
                currentPage === 0
                  ? 'text-neutral-600 cursor-not-allowed'
                  : 'text-neutral-400 hover:text-spinoza-yellow hover:bg-white/5'
              )}
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className={cn(
                'p-1.5 rounded transition-colors',
                currentPage >= totalPages - 1
                  ? 'text-neutral-600 cursor-not-allowed'
                  : 'text-neutral-400 hover:text-spinoza-yellow hover:bg-white/5'
              )}
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to get nested object values (e.g., "user.name")
function getNestedValue(obj: Record<string, any>, key: string): any {
  return key.split('.').reduce((acc, part) => acc?.[part], obj);
}

// ForwardRef wrapper with generic support
export const DataGrid = React.forwardRef(DataGridInner) as <T extends Record<string, any>>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

// Display name
(DataGrid as any).displayName = 'DataGrid';

// Export variants for customization
export { dataGridVariants, headerCellVariants, cellVariants, rowVariants };
