import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

function RoomBookingLoader({ showAll = false }) {
  return (
    <Section
      className={cn("relative mt-10", !showAll ? "h-140 overflow-hidden" : "")}
    >
      <div
        className={cn(
          "w-80 rounded-lg py-5 font-semibold",
          "bg-secondary-foreground/16 animate-pulse",
        )}
      />
      <div
        className={cn(
          "space-y-4",
          !showAll
            ? "[mask-image:linear-gradient(to_bottom,black,transparent_95%)]"
            : "",
        )}
      >
        {[...Array(!showAll ? 3 : 7)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div
              className={cn(
                "bg-secondary-foreground/16 animate-pulse",
                "flex h-6 w-48 items-center justify-center rounded text-sm max-sm:w-full",
              )}
            ></div>
            <div className="mb-4 flex flex-wrap gap-2 max-sm:grid max-sm:grid-cols-4">
              {[...Array(23)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-secondary-foreground/16 animate-pulse",
                    "flex h-12 w-20 items-center justify-center rounded text-sm max-sm:w-full",
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showAll && (
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "bg-secondary-foreground/16 animate-pulse",
              "flex h-12 w-20 items-center justify-center rounded text-sm max-sm:w-full",
            )}
          />
          <div
            className={cn(
              "bg-secondary-foreground/16 animate-pulse",
              "flex h-6 w-40 items-center justify-center rounded text-sm max-sm:w-full",
            )}
          />
          <div
            className={cn(
              "bg-secondary-foreground/16 animate-pulse",
              "flex h-12 w-20 items-center justify-center rounded text-sm max-sm:w-full",
            )}
          />
        </div>
      )}
    </Section>
  );
}

export default RoomBookingLoader;
