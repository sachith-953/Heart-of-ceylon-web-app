"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

// this component has trigger for seller dashboard vertical tabs
// 

const TabsTriggerForSellerDashboard = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-start h-12 whitespace-nowrap rounded-md px-3 py-1 text-lg bg-gray-400 text-white font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-sky-500 data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTriggerForSellerDashboard.displayName = TabsPrimitive.Trigger.displayName



export { TabsTriggerForSellerDashboard }

