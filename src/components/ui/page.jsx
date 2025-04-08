import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Page = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "space-y-12 max-sm:pt-22 md:pt-10 sm:space-y-24 lg:space-y-32",
        className,
      )}
    >
      <div></div>
      {children}
      <div></div>
    </div>
  );
});
