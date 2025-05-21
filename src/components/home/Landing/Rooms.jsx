import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";

import { useExpendAnimation } from "@/hooks/use-expand-animation";

import room1 from "@/assets/rooms/room1.jfif";
import room2 from "@/assets/rooms/room2.jfif";
import room3 from "@/assets/rooms/room3.jfif";
import room4 from "@/assets/rooms/room4.jfif";
import room5 from "@/assets/rooms/room5.jfif";
import room6 from "@/assets/rooms/room6.jfif";

const rooms = [
  { image: room1 },
  { image: room2 },
  { image: room3 },
  { image: room4 },
  { image: room5 },
  { image: room6 },
];

const getGridClass = (index) => {
  if (index < 4) {
    return "bg-secondary rounded-xl max-lg:aspect-square lg:h-64 overflow-hidden";
  }
  return "bg-secondary col-span-2 rounded-xl overflow-hidden";
};

const getImageClass = (index) => {
  if (index < 4) {
    return "w-full h-full object-cover text-center";
  }
  return "max-h-64 w-full object-cover text-center";
};

function RoomCard({ room, index }) {
  const { image } = room;
  return (
    <Link to='/auth/signup' className={getGridClass(index)}>
      <img
        src={image}
        alt={`Meeting room ${index + 1}`}
        className={getImageClass(index)}
      />
      <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-lg font-semibold text-white opacity-0 transition-all duration-300 hover:opacity-100">
        Meeting Room {index + 1}
      </div>
    </Link>
  );
}

function Rooms() {
  const roomsRef = useExpendAnimation(null);

  return (
    <Section>
      <div className="flex items-center justify-between">
        <SectionTitle>Explore Our Meeting Rooms</SectionTitle>
        <Link to="/rooms">
          <Button variant="link" className="sm:text-base">
            More
          </Button>
        </Link>
      </div>

      <div ref={roomsRef} className="grid gap-2 md:grid-cols-4 lg:gap-3">
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room} index={index} />
        ))}
      </div>
    </Section>
  );
}

export default Rooms;
