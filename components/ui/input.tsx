import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "file:text-ds-text-primary placeholder:text-ds-text-secondary selection:bg-ds-blue-700 selection:text-white border-ds-border-default hover:border-ds-border-hover w-full min-w-0 rounded-sm border px-3 text-base transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ds-border-active focus-visible:ring-ds-border-active/40 focus-visible:ring-[2px] aria-invalid:ring-ds-red-700/20 dark:aria-invalid:ring-ds-red-700/40 aria-invalid:border-ds-red-700",
  {
    variants: {
      variant: {
        primary: "bg-ds-background-primary",
        secondary: "bg-ds-background-secondary",
        transparent: "bg-transparent dark:bg-ds-component-bg-default/30",
      },
      size: {
        sm: "h-9 py-1",
        md: "h-10 py-2",
      },
    },
    defaultVariants: {
      variant: "transparent",
      size: "sm",
    },
  },
);

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
