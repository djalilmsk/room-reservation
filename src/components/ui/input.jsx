import * as React from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Input = forwardRef(({ className, type, ...props }, ref) => {

  const isPassword = { password: true }[type] || false;

  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-accent-foreground selection:bg-primary selection:text-primary-foreground border-input relative flex h-11 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
});

export { Input };
