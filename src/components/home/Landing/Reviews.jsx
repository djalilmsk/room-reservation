import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Section, SectionTitle } from "@/components/ui/section";
import { useExpendAnimation } from "@/hooks/use-expand-animation";

const reviews = [
  {
    stars: 4,
    text: "ROOM made scheduling meetings across departments effortless. A great tool for collaboration.",
    name: "Michael Lee",
    job: "Team Lead",
    image: "https://picsum.photos/seed/2/200/200",
    spanClass: "col-span-2",
  },
  {
    stars: 5,
    text: "Our team productivity has increased significantly since we started using ROOM.",
    name: "Sarah Kim",
    job: "Operations Coordinator",
    image: "https://picsum.photos/seed/3/200/200",
    spanClass: "col-span-1",
  },
  {
    stars: 5,
    text: "The calendar integration feature saves us so much time every week. It’s a game-changer.",
    name: "Daniel Smith",
    job: "HR Representative",
    image: "https://picsum.photos/seed/4/200/200",
    spanClass: "col-span-2",
  },
  {
    stars: 4,
    text: "ROOM helps us keep track of bookings and avoid conflicts. It's been a huge time saver.",
    name: "Emma Wilson",
    job: "Facilities Manager",
    image: "https://picsum.photos/seed/5/200/200",
    spanClass: "col-span-1",
  },
];

const getResponsiveClass = (baseClass) => {
  return cn(baseClass, "max-xl:col-span-2", "max-md:col-span-4");
};

function ReviewCard({ review }) {
  const responsiveClass = getResponsiveClass(review.spanClass);
  const { stars, text, image, name, job } = review;

  const Stars = () => (
    <div className="flex items-center space-x-1">
      {Array(5)
        .fill()
        .map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 rounded-full ${stars > i ? "text-yellow-500" : "text-secondary-foreground"}`}
          />
        ))}
    </div>
  );

  const Text = () => (
    <div>
      <em className="text-secondary-foreground font-light max-sm:text-sm">
        "{text}"
      </em>
    </div>
  );

  const User = () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-secondary-foreground text-sm"> {job}</p>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "bg-card flex flex-col justify-between space-y-5 rounded-xl p-5 shadow-sm sm:p-8",
        responsiveClass,
      )}
    >
      <Stars />
      <Text />
      <User />
    </div>
  );
}

function Reviews() {
  const reviewRef = useExpendAnimation(null);

  return (
    <Section className="relative py-8 md:-mt-10 md:py-16">
      <div className="bg-secondary absolute top-0 left-1/2 -z-10 h-full w-dvw -translate-x-1/2" />
      <SectionTitle>Some customer reviews</SectionTitle>
      <div ref={reviewRef} className="grid grid-cols-4 gap-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </Section>
  );
}

export default Reviews;
