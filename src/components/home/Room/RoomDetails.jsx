import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format/formatPrice";
import { formatStatus } from "@/utils/format/formatStatus";

function RoomDetails({
  name,
  description,
  capacity,
  rating,
  pricing,
  status,
  amenities,
  images,
  children,
}) {
  const amenitiesArray = amenities.split(",").map((item) => item.trim());

  const AmenityLabel = ({ amenity, label }) => (
    <div className="text-secondary-foreground text-sm">
      {amenity} {label}
    </div>
  );

  return (
    <>
      <div className="flex gap-5 max-lg:flex-col">
        <img
          src={images[0].image}
          alt={`${name} - ${description}`}
          className="rounded-lg object-cover max-lg:h-60 lg:w-1/2"
        />
        <div className="flex w-full flex-col justify-between gap-8">
          <div className="w-full space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-secondary-foreground">{description}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Star className="text-yellow-500" />
                <h2 className="text-xl">{rating}</h2>
              </div>
            </div>
            <div className="w-full space-y-3">
              <h2 className="flex justify-between text-lg">
                {" "}
                <span className="font-bold"> Capacity:</span> {capacity} People
              </h2>
              <Separator />
              <h2 className="flex items-end justify-between text-lg">
                {" "}
                <span className="font-bold">Pricing:</span>{" "}
                {formatPrice(pricing)}
              </h2>
              <Separator />
              <h2 className="flex justify-between text-lg">
                {" "}
                <span className="font-bold">Status:</span>{" "}
                {formatStatus(status)}
              </h2>
              <Separator />
              <h2 className="flex items-center justify-between text-lg">
                {" "}
                <span className="font-bold">Amenities:</span>
                {amenitiesArray.map((amenity, index) => (
                  <AmenityLabel key={index} amenity={amenity} />
                ))}
              </h2>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default RoomDetails;
