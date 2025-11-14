'use client';

import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Unified Toast Component
 *
 * Synchronizes style according to design system, replaces all hardcoded toast/alert styles.
 *
 * Common patterns in codebase:
 * - `fixed top-4 right-4 z-50` - Position
 * - `bg-green-50 border border-green-200 text-green-800` - Success variant
 * - `bg-red-50 border border-red-200 text-red-800` - Error variant
 * - `bg-blue-50 border border-blue-200 text-blue-800` - Info variant
 * - Auto-dismiss after 3-5 seconds
 * - Close button with X icon
 *
 * Design System:
 * - Position: fixed top-4 right-4 (default)
 * - Z-index: z-50 (default), can be customized
 * - Border radius: rounded-lg (8px)
 * - Shadow: shadow-lg
 * - Animation: fade-in, slide-in-from-top
 * - Min width: min-w-80 (320px)
 */

const toastVariants = cva(
  'fixed p-4 rounded-lg shadow-lg flex items-center gap-3 min-w-80 animate-in fade-in slide-in-from-top-2 duration-300',
  {
    variants: {
      variant: {
        success: 'bg-green-50 border border-green-200 text-green-800',
        error: 'bg-red-50 border border-red-200 text-red-800',
        info: 'bg-blue-50 border border-blue-200 text-blue-800',
        warning: 'bg-orange-50 border border-orange-200 text-orange-800',
      },
      position: {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      },
    },
    defaultVariants: {
      variant: 'info',
      position: 'top-right',
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  message: string;
  onClose?: () => void;
  duration?: number; // Auto-dismiss duration in ms (0 = no auto-dismiss)
  showCloseButton?: boolean;
  zIndex?: number;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
};

const iconColorMap = {
  success: 'text-green-600',
  error: 'text-red-600',
  info: 'text-blue-600',
  warning: 'text-orange-600',
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      position,
      message,
      onClose,
      duration = 4000, // Default 4 seconds
      showCloseButton = true,
      zIndex = 50,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Auto-dismiss
    React.useEffect(() => {
      if (duration > 0 && isVisible) {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          // Wait for animation to complete before calling onClose
          setTimeout(() => {
            onClose?.();
          }, 300); // Match animation duration
        }, duration);
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [duration, isVisible, onClose]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    };

    if (!isVisible) return null;

    const Icon = variant ? iconMap[variant] : Info;
    const iconColor = variant ? iconColorMap[variant] : iconColorMap.info;

    const toastContent = (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, position }), className)}
        style={{ zIndex }}
        {...props}
      >
        <Icon className={cn('w-5 h-5 flex-shrink-0', iconColor)} />
        <span className='font-medium flex-1'>{message}</span>
        {showCloseButton && (
          <button
            onClick={handleClose}
            className='ml-auto text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors'
            aria-label='Close notification'
          >
            <X className='w-4 h-4' />
          </button>
        )}
      </div>
    );

    // Render to portal for proper z-index stacking
    return createPortal(toastContent, document.body);
  }
);
Toast.displayName = 'Toast';

// Toast Container for managing multiple toasts
export interface ToastContainerProps {
  toasts: Array<{
    id: string;
    variant?: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
  }>;
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  zIndex?: number;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  position = 'top-right',
  zIndex = 50,
}) => {
  return (
    <>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          message={toast.message}
          duration={toast.duration}
          onClose={() => onRemove(toast.id)}
          position={position}
          zIndex={zIndex + index} // Stack toasts with increasing z-index
          style={{
            transform: `translateY(${index * 80}px)`, // Offset for stacking
          }}
        />
      ))}
    </>
  );
};

export { Toast, toastVariants };

