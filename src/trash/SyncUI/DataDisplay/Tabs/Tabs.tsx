'use client';

import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { Tab, TabProps } from './Tab';

/**
 * Unified Tabs Component
 *
 * Complete tabs system with container, list, and panels.
 * Used for tab navigation in DetailedCompetencySection and other places.
 *
 * Design System:
 * - Horizontal tabs by default
 * - Vertical tabs support via orientation prop
 * - Consistent with Tab component styling
 */

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex gap-3 overflow-x-auto pb-2',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    Omit<TabProps, 'variant' | 'onClick'> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, value, children, icon, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger ref={ref} value={value} asChild {...props}>
      <Tab
        variant='inactive'
        icon={icon}
        className={cn(
          'data-[state=active]:bg-viettel-rose data-[state=active]:text-viettel-red data-[state=active]:border-viettel-red',
          className
        )}
      >
        {children}
      </Tab>
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export interface TabsProps
  extends React.ComponentProps<typeof TabsPrimitive.Root> {}

export { Tabs, TabsContent, TabsList, TabsTrigger };
