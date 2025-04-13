import { Link, useParams } from "react-router-dom";
import RoomCard from "./room-card";
import { Edit, LucideOutdent, Star, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format/formatPrice";
import { formatStatus } from "@/utils/format/formatStatus";
import { Button } from "@/components/ui/button";

const rooms = [
  {
    id: 1,
    name: "Room A",
    description: "Hall 4, Floor 2",
    capacity: 12,
    rating: 4.6,
    pricing: 2000,
    status: "Booked",
    amenities: "Wi-Fi, TV, Air Conditioning",
    image: "https://picsum.photos/200/100",
  },
  {
    id: 2,
    name: "Room A",
    description: "Hall 4, Floor 2",
    capacity: 12,
    rating: 4.6,
    pricing: 2000,
    status: "Booked",
    amenities: "Wi-Fi, TV, Air Conditioning",
    image: "https://picsum.photos/200/100",
  },
  {
    id: 3,
    name: "Room A",
    description: "Hall 4, Floor 2",
    capacity: 12,
    rating: 4.6,
    pricing: 2000,
    status: "Booked",
    amenities: "Wi-Fi, TV, Air Conditioning",
    image: "https://picsum.photos/200/100",
  },
  {
    id: 4,
    name: "Room A",
    description: "Hall 4, Floor 2",
    capacity: 12,
    rating: 4.6,
    pricing: 2000,
    status: "Booked",
    amenities: "Wi-Fi, TV, Air Conditioning",
    image: "https://picsum.photos/200/100",
  },
  {
    id: 5,
    name: "Room A",
    description: "Hall 4, Floor 2",
    capacity: 12,
    rating: 4.6,
    pricing: 2000,
    status: "Booked",
    amenities: "Wi-Fi, TV, Air Conditioning",
    image: "https://picsum.photos/200/100",
  },
];

function SingleRoom() {
  const { id } = useParams();

  const room = rooms.find((room) => room.id === parseInt(id));

  if (!room) {
    return <div>Room not found!</div>;
  }

  const {
    name,
    description,
    capacity,
    rating,
    pricing,
    status,
    amenities,
    image,
  } = room;

  const amenitiesArray = amenities.split(",").map((item) => item.trim());

  const AmenityLabel = ({ amenity, label }) => (
    <div className="text-secondary-foreground text-sm">
      {amenity} {label}
    </div>
  );

  return (
    <div className="space-y-5">
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
      <div className="flex gap-5 max-lg:flex-col">
        <img
          src={image}
          alt={`${name} - ${description}`}
          className="h-60 rounded-lg object-cover lg:w-1/2"
        />
        <div className="w-full space-y-3">
          <h2 className="flex justify-between text-lg">
            {" "}
            <span className="font-bold"> Capacity:</span> {capacity} People
          </h2>
          <Separator />
          <h2 className="flex items-end justify-between text-lg">
            {" "}
            <span className="font-bold">Pricing:</span> {formatPrice(pricing)}
          </h2>
          <Separator />
          <h2 className="flex justify-between text-lg">
            {" "}
            <span className="font-bold">Status:</span> {formatStatus(status)}
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
      <div className="w-full justify-between space-y-3 lg:flex">
        <Link to="/dashboard/rooms">
          <Button className="mb-3 max-lg:w-full">
            <LucideOutdent className="h-4 w-4" />
            Back to Rooms
          </Button>
        </Link>
        <div className="space-y-2 space-x-2">
          <Link to={`/dashboard/rooms/edit-room/${id}`}>
            <Button className="mb-3 max-lg:w-full">
              <Edit className="h-4 w-4" />
              Edit Room
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="hover:text-destructive text-destructive hover:bg-destructive/20 max-lg:w-full"
            onClick={() => console.log("delete: " + id)}
          >
            <X className="h-4 w-4" />
            Delete Room
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleRoom;
