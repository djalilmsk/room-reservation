import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/format/formatPrice";
import { formatStatus } from "@/utils/format/formatStatus";
import { Star } from "lucide-react";

function RoomCard({ data }) {
  if (!data) return;

  const { role_name } = useUser()?.data || { role_name: "guest" };

  const showStatus =
    role_name?.toLowerCase() === "admin" ||
    role_name?.toLowerCase() === "room manager";

  const {
    name,
    description,
    capacity,
    rating,
    pricing,
    status,
    amenities,
    images,
  } = data;

  const amenitiesArray = amenities.split(",").map((item) => item.trim());

  const AmenityLabel = ({ amenity, label }) => (
    <div className="text-secondary-foreground text-sm">
      {amenity} {label}
    </div>
  );

  return (
    <div className="hover:bg-primary/10 dark:bg-card dark:hover:bg-primary/10 relative flex flex-col overflow-hidden rounded-xl shadow-sm transition-all duration-200 hover:shadow-sm">
      <Separator className="absolute top-49" />
      <img
        src={images[0].image}
        alt={`${name} - ${description}`}
        className="h-40 object-cover"
      />
      <div className="px-6 pb-4">
        <div className="flex gap-4 py-2">
          {/* <AmenityLabel amenity={capacity} label={"People"} /> */}
          {amenitiesArray.map((amenity, index) => (
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
          {showStatus && formatStatus(status)}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
