import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Tab Component
 *
 * Used for tab navigation in DetailedCompetencySection and other places.
 *
 * Variants:
 * - active: Currently selected tab (bg-red-50, border-red-600, text-red-600)
 * - inactive: Unselected tab (bg-gray-100, border-gray-300, text-gray-600)
 */
const tabVariants = cva(
  'flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all whitespace-nowrap font-semibold outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        /**
         * Active tab - Currently selected tab
         * Replaces: bg-red-50 text-red-600 border-red-600
         */
        active:
          'bg-viettel-rose text-viettel-red border-2 border-viettel-red hover:bg-viettel-rose-hover focus-visible:ring-viettel-red',
        /**
         * Inactive tab - Unselected tab
         * Replaces: bg-gray-100 text-gray-600 border-gray-300 hover:bg-white
         */
        inactive:
          'bg-neutral-100 text-neutral-600 border-neutral-300 hover:bg-white hover:border-neutral-400 focus-visible:ring-neutral-300',
      },
      size: {
        sm: 'px-3 py-2 text-xs gap-1.5',
        md: 'px-4 py-0.5 text-sm gap-2', // 13px - most common, fontWeight: 600 handled by font-semibold
        lg: 'px-6 py-3 text-base gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'inactive',
      size: 'md',
    },
  }
);

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabVariants> {
  /**
   * Icon component to display before the label
   */
  icon?: React.ComponentType<{ className?: string }>;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, variant, size, icon: Icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(tabVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && <Icon className='w-4 h-4 shrink-0' />}
        {children}
      </button>
    );
  }
);
Tab.displayName = 'Tab';

export { Tab, tabVariants };
