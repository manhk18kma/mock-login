import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Unified Switch Component
 *
 * Toggle switch component for settings and binary options.
 *
 * Design System:
 * - Border: 1px solid #2B3353 (navy) - SYNCHRONIZED FOR ALL SWITCHES
 * - Checked: bg-viettel-red, border-viettel-red (from tailwind.config.js)
 * - Focus: border-color viettel-blue, box-shadow shadow-input-focus
 * - Hover: border-color viettel-navy-hover
 *
 * Uses design tokens from tailwind.config.js:
 * - Colors: viettel-navy, viettel-red, viettel-blue (focus), viettel-navy-hover
 * - Shadows: shadow-input-focus
 */

const switchVariants = cva(
  'relative inline-flex items-center rounded-full border border-viettel-navy bg-white transition-all outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:border-viettel-navy-hover focus:border-viettel-blue focus:ring-0 focus:shadow-input-focus',
  {
    variants: {
      size: {
        sm: 'h-4 w-7', // 16px height, 28px width
        md: 'h-5 w-9', // 20px height, 36px width - Default
        lg: 'h-6 w-11', // 24px height, 44px width
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

const thumbVariants = cva(
  'pointer-events-none block rounded-full bg-white ring-0',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);


export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof switchVariants> {
  /**
   * Checked state
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Change handler
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Label text (optional)
   */
  label?: React.ReactNode;
  /**
   * Label position
   */
  labelPosition?: 'left' | 'right';
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size,
      error,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      labelPosition = 'right',
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] =
      React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleClick = () => {
      const newChecked = !checked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const switchElement = (
      <button
        ref={ref}
        type='button'
        role='switch'
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        className={cn(
          switchVariants({ size, error }),
          checked && 'bg-viettel-red border-viettel-red',
          'relative',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span
          className={cn(
            thumbVariants({ size }),
            'absolute top-1/2 -translate-y-1/2 transition-transform',
            size === 'sm' && (checked ? 'left-[calc(100%-0.75rem-2px)]' : 'left-0.5'),
            size === 'md' && (checked ? 'left-[calc(100%-1rem-2px)]' : 'left-0.5'),
            size === 'lg' && (checked ? 'left-[calc(100%-1.25rem-2px)]' : 'left-0.5')
          )}
          data-state={checked ? 'checked' : 'unchecked'}
        />
      </button>
    );

    if (label) {
      return (
        <div
          className={cn(
            'flex items-center gap-2',
            labelPosition === 'left' && 'flex-row-reverse'
          )}
        >
          {switchElement}
          {label && (
            <label
              className='text-sm text-gray-700 cursor-pointer select-none'
              onClick={handleClick}
            >
              {label}
            </label>
          )}
        </div>
      );
    }

    return switchElement;
  }
);
Switch.displayName = 'Switch';

export { Switch, switchVariants };

