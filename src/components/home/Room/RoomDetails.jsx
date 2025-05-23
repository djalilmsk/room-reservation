import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format/formatPrice";
import { formatStatus } from "@/utils/format/formatStatus";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ImagesList({ images }) {
  return (
    <div className="relative">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className={"max-lg:h-90 max-md:h-70 lg:w-1/2"}
            >
              <img
                className="h-full w-full rounded-lg object-cover"
                src={image.image}
                alt={`image - ${index}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="ghost"
          className="text-primary left-0 h-full rounded-l-xl rounded-r-none px-5"
        />
        <CarouselNext
          variant="ghost"
          className="text-primary right-0 h-full rounded-l-none rounded-r-xl px-5"
        />
      </Carousel>
      {/* <div className="absolute right-4 z-10 bottom-4 rounded-lg bg-black/50 px-3 py-2 text-sm text-white">
        {images.length} pictures
      </div> */}
    </div>
  );
}

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
        <ImagesList images={images} />
        <div className="flex w-full flex-col justify-between gap-8">
          <div className="w-full space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-secondary-foreground">{description}</p>
              </div>
              <div className="flex items-center justify-between gap-1">
                <div className="flex h-5 w-5 items-center justify-center">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="#EAB308"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h2 className="mt-[3px] text-xl">{rating}</h2>
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
