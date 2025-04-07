import { forwardRef } from "react";
import H1 from "./header1";
import { cn } from "@/lib/utils";

const Section = forwardRef(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-5 xl:space-y-10", className)}>{children}</div>
  );
});

function SectionTitle({ children, className }) {
  return <H1 className={cn("", className)}>{children}</H1>;
}

export { Section, SectionTitle };
