import { cn } from "@/lib/utils";

function ListLoader({ nbr = 6, height = 14 }) {
  return (
    <div>
      {[...Array(nbr)].map((_, i) => (
        <div
          key={i}
          className={cn(
            `mt-1 h-${height} w-full rounded-lg`,
            "bg-secondary-foreground/16 animate-pulse",
          )}
        />
      ))}
    </div>
  );
}

export default ListLoader;
