import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Radio Component
 *
 * Synchronizes style according to design system, replaces all hardcoded radio styles.
 *
 * Design System:
 * - Border: 1px solid #2B3353 (navy) - SYNCHRONIZED FOR ALL RADIOS
 * - Checked: bg-viettel-red, border-viettel-red (from tailwind.config.js)
 * - Focus: border-color var(--brand), box-shadow 0 0 0 3px rgba(239,0,50,0.1)
 * - Hover: border-color #3d4a6e
 * - Size: w-4 h-4 (16px) - default
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: viettel-navy, viettel-blue (focus), viettel-navy-hover
 * - Shadows: shadow-input-focus
 */

const radioVariants = cva(
  // Base styles - Synchronized navy border for all
  'relative flex items-center justify-center border-2 border-viettel-navy bg-white rounded-full transition-all outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:border-viettel-navy-hover focus:border-viettel-blue focus:ring-0 focus:shadow-input-focus',
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
      sm: 'checked:bg-viettel-red checked:border-viettel-red',
      md: 'checked:bg-viettel-red checked:border-viettel-red',
      lg: 'checked:bg-viettel-red checked:border-viettel-red',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioVariants> {
  label?: React.ReactNode;
  error?: boolean;
  onValueChange?: (value: string | number) => void;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, error, label, id, name, value, checked, onValueChange, ...props }, ref) => {
    const radioId = id || React.useId();
    const [isChecked, setIsChecked] = React.useState(checked ?? false);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }
      if (onValueChange && value !== undefined) {
        // Convert value to match the type of value prop
        const convertedValue = typeof value === 'number' 
          ? Number(e.target.value) 
          : e.target.value;
        onValueChange(convertedValue);
      }
      props.onChange?.(e);
    };

    return (
      <div className='flex items-center gap-2'>
        <label className='cursor-pointer flex items-center'>
          <input
            ref={ref}
            type='radio'
            id={radioId}
            name={name}
            value={value !== undefined ? String(value) : undefined}
            checked={isChecked}
            onChange={handleChange}
            className='sr-only peer'
            {...props}
          />
          <div
            className={cn(
              radioVariants({ size, error }),
              checkedVariants({ size }),
              isChecked && 'bg-viettel-red border-viettel-red',
              !isChecked && 'bg-white',
              'relative',
              className
            )}
          >
            {isChecked && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div
                  className={cn(
                    'rounded-full border-2 border-white',
                    size === 'sm' && 'w-1.5 h-1.5',
                    size === 'md' && 'w-2 h-2',
                    size === 'lg' && 'w-2.5 h-2.5'
                  )}
                />
              </div>
            )}
          </div>
          {label && (
            <span className='ml-2 text-sm text-gray-700 select-none'>
              {label}
            </span>
          )}
        </label>
      </div>
    );
  }
);
Radio.displayName = 'Radio';

// RadioGroup component for grouping radios
export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  children: React.ReactNode;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, name, value, onValueChange, children, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onValueChange?.(newValue);
    };

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === Radio) {
            return React.cloneElement(child as React.ReactElement<RadioProps>, {
              name,
              checked: value !== undefined && child.props.value === value,
              onChange: handleChange,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export { Radio, RadioGroup, radioVariants };

