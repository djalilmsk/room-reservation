import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

function RoomCard({ data }) {
  if (!data) return;

  const {
    name,
    description,
    capacity,
    rating,
    pricing,
    status,
    amenities,
    image,
  } = data;

  const AmenityLabel = ({ amenity, label }) => (
    <div className="text-secondary-foreground text-sm">
      {amenity} {label}
    </div>
  );

  const formatPrice = (price) => (
    <div className="flex gap-1">
      <h1 className="text-2xl font-semibold md:text-3xl">{price} DZD</h1>
      <p className="text-secondary-foreground mt-auto pb-1 text-sm">
        /pre hour
      </p>
    </div>
  );

  const formatStatus = (status) => (
    <div
      className={cn(
        "rounded-lg px-3 py-1 text-sm",
        {
          Booked: "bg-destructive/25 text-destructive",
        }[status],
      )}
    >
      {status}
    </div>
  );

  return (
    <div className="bg-secondary/20 dark:bg-secondary/80 dark:hover:bg-secondary hover:bg-secondary/60 relative flex flex-col overflow-hidden rounded-xl transition-all duration-150">
      <Separator className="absolute top-49" />
      <img
        src={image}
        alt={`${name} - ${description}`}
        className="h-40 object-cover"
      />
      <div className="px-6 pb-4">
        <div className="flex gap-4 py-2">
          <AmenityLabel amenity={capacity} label={"People"} />
          {amenities.map((amenity, index) => (
            <AmenityLabel amenity={amenity} key={index} />
          ))}
        </div>
        <div className="flex items-start justify-between py-3">
          <div>
            <h1 className="text-2xl font-semibold">{name}</h1>
            <p className="text-secondary-foreground text-sm">{description}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <p className="font-light">{rating}</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          {formatPrice(pricing)}
          {formatStatus(status)}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
