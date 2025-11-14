import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Check } from 'lucide-react';

/**
 * Unified Checkbox Component
 *
 * Synchronizes style according to design system, replaces all hardcoded checkbox styles.
 *
 * Design System:
 * - Border: 1px solid #2B3353 (navy) - SYNCHRONIZED FOR ALL CHECKBOXES
 * - Checked: bg-viettel-red, border-viettel-red (from tailwind.config.js)
 * - Focus: border-color var(--brand), box-shadow 0 0 0 3px rgba(239,0,50,0.1)
 * - Hover: border-color #3d4a6e
 * - Size: w-4 h-4 (16px) - default
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: viettel-navy, viettel-blue (focus), viettel-navy-hover
 * - Shadows: shadow-input-focus
 */

const checkboxVariants = cva(
  // Base styles - Synchronized navy border for all
  'relative flex items-center justify-center border border-viettel-navy bg-white rounded transition-all outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:border-viettel-navy-hover focus:border-viettel-blue focus:ring-0 focus:shadow-input-focus',
  {
    variants: {
      size: {
        sm: 'w-3.5 h-3.5', // 14px
        md: 'w-4 h-4', // 16px - Default - most common
        lg: 'w-5 h-5', // 20px
      },
      error: {
        true: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);

const checkedVariants = cva('', {
  variants: {
    size: {
      sm: 'data-[state=checked]:bg-viettel-red data-[state=checked]:border-viettel-red',
      md: 'data-[state=checked]:bg-viettel-red data-[state=checked]:border-viettel-red',
      lg: 'data-[state=checked]:bg-viettel-red data-[state=checked]:border-viettel-red',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode;
  error?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, error, label, id, ...props }, ref) => {
    const checkboxId = id || React.useId();
    const [checked, setChecked] = React.useState(props.checked ?? false);

    React.useEffect(() => {
      if (props.checked !== undefined) {
        setChecked(props.checked);
      }
    }, [props.checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.checked === undefined) {
        setChecked(e.target.checked);
      }
      props.onChange?.(e);
    };

    return (
      <div className='flex items-center gap-2'>
        <div className='relative inline-flex'>
          <input
            ref={ref}
            type='checkbox'
            id={checkboxId}
            checked={checked}
            onChange={handleChange}
            className='sr-only peer'
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className={cn(
              checkboxVariants({ size, error }),
              checkedVariants({ size }),
              checked && 'bg-viettel-red border-viettel-red',
              className
            )}
            data-state={checked ? 'checked' : 'unchecked'}
          >
            {checked && (
              <Check
                className={cn(
                  'text-white',
                  size === 'sm' && 'w-2.5 h-2.5',
                  size === 'md' && 'w-3 h-3',
                  size === 'lg' && 'w-4 h-4'
                )}
              />
            )}
          </label>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className='text-sm text-gray-700 cursor-pointer select-none'
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };

