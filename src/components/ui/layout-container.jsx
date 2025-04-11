import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const LayoutContainer = forwardRef(({ children, className }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-center overflow-x-hidden">
      <div
        className={cn(
          "relative flex min-h-screen flex-col justify-between max-xl:w-[90%] xl:w-6xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
});
