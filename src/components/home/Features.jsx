import { CalendarCheck, CalendarClock, Rotate3D, Search } from "lucide-react";
import { Section, SectionTitle } from "../ui/section";

const card = [
  {
    title: "Real-Time Room Availability Check",
    icon: CalendarCheck,
    image: "https://picsum.photos/200/100",
  },
  {
    title: "Effortless Room Search",
    icon: Search,
    image: "https://picsum.photos/200/200",
  },
  {
    title: "Seamless Booking Process",
    icon: Rotate3D,
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Easy Booking Schedule Access",
    icon: CalendarClock,
    image: "https://picsum.photos/200/400",
  },
];

function FeatureCard({ item }) {
  const { title, image } = item;
  return (
    <div className="bg-secondary relative flex flex-col justify-between p-5 text-white md:p-8">
      <div className="absolute top-0 left-0 -z-2 h-full w-full bg-[#191919] opacity-70 dark:hidden" />
      <img
        src={image}
        className="absolute top-0 left-0 -z-2 h-full w-full text-center mix-blend-multiply"
        alt="image"
      />
      <item.icon className="text-2xl" />
      <h2 className="text-xs sm:text-base md:font-semibold lg:text-lg">
        {title}
      </h2>
    </div>
  );
}

function Features() {
  return (
    <Section>
      <SectionTitle>We Provide</SectionTitle>
      <div className="grid h-96 grid-cols-2 gap-1 lg:h-70 lg:grid-cols-4">
        {card.map((item, index) => (
          <FeatureCard key={index} item={item} />
        ))}
      </div>
    </Section>
  );
}

export default Features;
