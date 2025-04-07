import { CalendarCheck, CalendarClock, Rotate3D, Search } from "lucide-react";
import { Section, SectionTitle } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { useUpRevealAnimation } from "@/hooks/use-up-reveal-animation";

const cards = [
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

function CardContent({ item, className }) {
  const { title, image } = item;

  return (
    <div
      className={cn(
        "absolute top-0 left-0 flex h-full w-full flex-col justify-between p-5 text-white md:p-8",
        className,
      )}
    >
      <div className="bg-secondary absolute top-0 left-0 -z-1 h-full w-full" />
      <div className="absolute top-0 left-0 -z-4 h-full w-full bg-[#191919] opacity-70" />
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

function FeatureCard({ item }) {
  return (
    <div className="relative h-full overflow-hidden">
      <CardContent className="first-features" item={item} />
    </div>
  );
}

function Features() {
  const cardRef = useUpRevealAnimation(null);

  return (
    <Section className="flex flex-col justify-center">
      <SectionTitle>We Provide</SectionTitle>
      <div
        ref={cardRef}
        className="grid h-96 grid-cols-2 gap-1 overflow-hidden lg:h-70 lg:grid-cols-4"
      >
        {cards.map((item, index) => (
          <FeatureCard key={index} item={item} />
        ))}
      </div>
    </Section>
  );
}

export default Features;
