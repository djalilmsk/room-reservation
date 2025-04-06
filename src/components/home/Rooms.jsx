import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import SectionTitle from "../ui/section-title";

const rooms = [
  [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ],
  [
    {
      image: "",
    },
    {
      image: "",
    },
  ],
];

function Rooms() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <SectionTitle>Explore Our Meeting Rooms</SectionTitle>
        <Link to={"/rooms"}>
          <Button variant="link" className="text-base">
            More
          </Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {rooms[0].map((image, index) => (
          <div
            key={index}
            className="bg-secondary max-lg:aspect-square lg:h-64 rounded-xl opacity-40"
          >
            <img src={image.image} alt="image" className="object w-full" />
          </div>
        ))}
        {rooms[1].map((image, index) => (
          <div
            key={index}
            className="bg-secondary col-span-2 rounded-xl opacity-40"
          >
            <img src={image.image} alt="image" className="object h-64 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
