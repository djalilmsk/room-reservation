import { cn } from "@/lib/utils";
import H1 from "./header1"

function SectionTitle({ children, className }) {
    return (
      <H1
        className={cn(
          "",
          className,
        )}
      >
        {children}
      </H1>
    );
  }

export default SectionTitle
