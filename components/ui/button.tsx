import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ds-blue-600 focus-visible:ring-ds-blue-600/50 focus-visible:ring-[3px] aria-invalid:ring-ds-red-700/20 aria-invalid:border-ds-red-700",
  {
    variants: {
      variant: {
        default:
          "bg-ds-text-primary text-ds-background-primary hover:bg-ds-text-primary/90",
        blue: "bg-ds-blue-700 text-white hover:bg-ds-blue-800",
        destructive:
          "bg-ds-red-700 text-white hover:bg-ds-red-800 focus-visible:ring-ds-red-700/20",
        outline:
          "border border-ds-border-default bg-ds-background-secondary hover:bg-ds-component-bg-hover hover:text-ds-text-primary",
        secondary:
          "bg-ds-component-bg-default text-ds-text-primary hover:bg-ds-component-bg-default/80",
        ghost: "hover:bg-ds-component-bg-hover hover:text-ds-text-primary",
        link: "text-ds-text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-sm px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
