import { useParams } from "react-router-dom";
import RoomForm from "./room-form";

const rooms = [
  {
    id: 1,
    name: "Room A",
    description: "Hall 4, Floor 2",
    capacity: 12,
    rating: 4.6,
    pricing: 2000,
    status: "Booked",
    amenities: ["Wi-Fi", "TV", "Air Conditioning"],
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
    amenities: ["Wi-Fi", "TV", "Air Conditioning"],
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
    amenities: ["Wi-Fi", "TV", "Air Conditioning"],
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
    amenities: ["Wi-Fi", "TV", "Air Conditioning"],
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
    amenities: ["Wi-Fi", "TV", "Air Conditioning"],
    image: "https://picsum.photos/200/100",
  },
];

function EditRoom() {
  const { id } = useParams();

  const room = rooms.find((room) => room.id === parseInt(id));

  if (!room) {
    return <div>Room not found!</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Update Room</h1>
      <RoomForm defaultValues={room} />
    </div>
  );
}

export default EditRoom;
