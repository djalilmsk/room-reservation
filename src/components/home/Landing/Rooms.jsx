import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";

import { useExpendAnimation } from "@/hooks/use-expand-animation";


const rooms = [
  { image: "https://picsum.photos/200/600" },
  { image: "https://picsum.photos/200/700" },
  { image: "https://picsum.photos/200/800" },
  { image: "https://picsum.photos/200/900" },
  { image: "https://picsum.photos/200/1000" },
  { image: "https://picsum.photos/200/1100" },
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
    <div className={getGridClass(index)}>
      <img
        src={image}
        alt={`Meeting room ${index + 1}`}
        className={getImageClass(index)}
      />
    </div>
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
