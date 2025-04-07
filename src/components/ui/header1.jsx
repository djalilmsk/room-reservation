import { cn } from "@/lib/utils";

function H1({ children, className }) {
  return (
    <h1
      className={cn(
        "text-2xl font-semibold md:text-3xl lg:text-4xl xl:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export default H1;
