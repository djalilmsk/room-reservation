import H1 from "./header1";
import { cn } from "@/lib/utils";

function Section({ children, className }) {
  return <div className={cn("xl:space-y-10 space-y-5", className)}>{children}</div>;
}

function SectionTitle({ children, className }) {
  return <H1 className={cn("", className)}>{children}</H1>;
}

export { Section, SectionTitle };
