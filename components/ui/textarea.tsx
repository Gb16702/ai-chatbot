import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "leading-relaxed placeholder:text-ds-text-secondary border-ds-border-default focus-visible:border-ds-border-active focus-visible:ring-ds-border-active/40 aria-invalid:ring-ds-red-700/20 aria-invalid:border-ds-red-700 flex min-h-16 w-full resize-none rounded-sm border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow,border-color] focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
