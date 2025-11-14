'use client';

import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { createPortal } from 'react-dom';

/**
 * Unified Tooltip Component
 *
 * Synchronizes style according to design system, supports both Radix UI and follow mouse cursor.
 *
 * Design System:
 * - Background: gray-800 (dark) or white (light)
 * - Text: white (dark) or gray-900 (light)
 * - Border radius: rounded-lg (8px)
 * - Shadow: shadow-lg
 * - Padding: px-3 py-2
 * - Font size: text-sm
 * - Max width: max-w-xs (300px)
 */

const tooltipContentVariants = cva(
  'z-50 overflow-hidden rounded-lg px-3 py-2 text-sm shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-gray-800 text-white', // Dark tooltip - most common
        light: 'bg-white text-gray-900 border border-gray-200', // Light tooltip
        info: 'bg-blue-600 text-white', // Info tooltip
        warning: 'bg-orange-600 text-white', // Warning tooltip
        error: 'bg-red-600 text-white', // Error tooltip
      },
      size: {
        sm: 'text-xs px-2 py-1 max-w-tooltip-sm',
        md: 'text-sm px-3 py-2 max-w-xs', // Default - 300px
        lg: 'text-base px-4 py-3 max-w-sm', // 384px
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TooltipProps
  extends Omit<React.ComponentProps<typeof TooltipPrimitive.Root>, 'children'>,
    VariantProps<typeof tooltipContentVariants> {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  delayDuration?: number;
  followMouse?: boolean; // Follow mouse cursor
  disabled?: boolean; // Disable tooltip
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Root>,
  TooltipProps
>(
  (
    {
      content,
      children,
      variant,
      size,
      side = 'top',
      sideOffset = 8,
      delayDuration = 0, // Show immediately
      followMouse = true, // Default to follow mouse for better compatibility
      disabled = false,
      ...props
    },
    ref
  ) => {
    // Follow mouse cursor implementation
    const [mousePosition, setMousePosition] = React.useState({
      x: 0,
      y: 0,
    });
    const [isVisible, setIsVisible] = React.useState(false);
    const targetRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (followMouse) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
      setIsVisible(true);
      if (followMouse) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Follow mouse cursor tooltip
    if (followMouse) {
      const tooltipContent = isVisible && (
        <div
          className='fixed z-[9999] pointer-events-none'
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translateY(-100%)',
          }}
        >
          <div className={cn(tooltipContentVariants({ variant, size }))}>
            {content}
          </div>
        </div>
      );

      return (
        <>
          <div
            ref={targetRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className='w-full'
          >
            {children}
          </div>
          {createPortal(tooltipContent, document.body)}
        </>
      );
    }

    // Radix UI tooltip (default)
    if (disabled) {
      return <>{children}</>;
    }

    return (
      <TooltipPrimitive.Provider
        delayDuration={delayDuration}
        skipDelayDuration={0}
      >
        <TooltipPrimitive.Root {...props}>
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              ref={ref}
              side={side}
              sideOffset={sideOffset}
              className={cn(
                tooltipContentVariants({ variant, size }),
                'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
              )}
            >
              {content}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);
Tooltip.displayName = TooltipPrimitive.Root.displayName;

// Export sub-components for advanced usage
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentProps<typeof TooltipPrimitive.Content> &
    VariantProps<typeof tooltipContentVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      className={cn(tooltipContentVariants({ variant, size }), className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipContent,
  tooltipContentVariants,
  TooltipProvider,
  TooltipTrigger,
};
