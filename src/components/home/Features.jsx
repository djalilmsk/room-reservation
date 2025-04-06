import { CalendarCheck, CalendarClock, Rotate3D, Search } from "lucide-react";
import SectionTitle from "../ui/section-title";

const card = [
  {
    title: "Real-Time Room Availability Check",
    icon: CalendarCheck,
    image: "",
  },
  {
    title: "Effortless Room Search",
    icon: Search,
    image: "",
  },
  {
    title: "Seamless Booking Process",
    icon: Rotate3D,
    image: "",
  },
  {
    title: "Easy Booking Schedule Access",
    icon: CalendarClock,
    image: "",
  },
];

function Features() {
  return (
    <div className="space-y-10">
      <SectionTitle>We Provide</SectionTitle>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-1 lg:h-70 h-96">
        {card.map((item, index) => (
          <div key={index} className="bg-secondary p-8 flex flex-col justify-between">
            <item.icon className="text-2xl" />
            <h2 className="sm:text-base text-xs font-semibold lg:text-lg">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
