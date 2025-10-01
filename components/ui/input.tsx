import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-ds-text-primary placeholder:text-ds-text-secondary selection:bg-ds-blue-700 selection:text-white dark:bg-ds-component-bg-default/30 border-ds-border-default h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ds-blue-600 focus-visible:ring-ds-blue-600/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-ds-red-700/20 dark:aria-invalid:ring-ds-red-700/40 aria-invalid:border-ds-red-700",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
