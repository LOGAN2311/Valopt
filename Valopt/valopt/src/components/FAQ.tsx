"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext"; // Import the useTheme hook

// Type for AccordionItem props
interface AccordionItemProps {
  className?: string;
  value: string;
  children: React.ReactNode;
}

// Type for AccordionTrigger props
interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
}

// Type for AccordionContent props
interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
}

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { theme } = useTheme(); // Get the current theme

    return (
      <AccordionPrimitive.Item
        ref={ref}
        className={cn(
          "border-b",
          theme === "dark" ? "border-gray-700" : "border-gray-200", // Theme-based border color
          className
        )}
        value={value}
        {...props}
      >
        {children}
      </AccordionPrimitive.Item>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          theme === "dark" ? "text-white" : "text-gray-900", // Theme-based text color
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            theme === "dark" ? "text-white" : "text-gray-900" // Theme-based icon color
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        theme === "dark" ? "text-gray-300" : "text-gray-700" // Theme-based text color
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };