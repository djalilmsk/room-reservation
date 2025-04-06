import { Star } from "lucide-react";
import SectionTitle from "../ui/section-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const reviews = [
  [
    {
      stars: 5,
      text: "The calendar integration feature saves us so much time. Our team productivity has increased significantly since we started using ROOM.",
      name: "John Doe",
      job: "HR Representative",
      image: "https://picsum.photos/200/300",
    },
    {
      stars: 4,
      text: "The calendar integration feature saves us so much time. Our team productivity has increased significantly since we started using ROOM.",
      name: "John Doe",
      job: "HR Representative",
      image: "https://picsum.photos/200/300",
    },
  ],
  [
    {
      stars: 5,
      text: "Our team productivity has increased significantly since we started using ROOM.",
      name: "John Doe",
      job: "HR Representative",
      image: "https://picsum.photos/200/300",
    },
    {
      stars: 5,
      text: "The calendar integration feature saves us so much time. Our team productivity has increased significantly since we started using ROOM.",
      name: "John Doe",
      job: "HR Representative",
      image: "https://picsum.photos/200/300",
    },
    {
      stars: 4,
      text: "Our team productivity has increased significantly since we started using ROOM.",
      name: "John Doe",
      job: "HR Representative",
      image: "https://picsum.photos/200/300",
    },
  ],
];

function ReviewCard({ review, className }) {
  return (
    <div
      className={cn(
        "bg-card col-span-2 flex flex-col justify-between space-y-5 rounded-xl p-8 shadow-sm max-xl:col-span-2 max-md:col-span-4",
        className,
      )}
    >
      <div className="flex items-center space-x-1">
        {Array(5)
          .fill()
          .map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 rounded-full ${review.stars > i ? "text-yellow-500" : "text-secondary-foreground"}`}
            />
          ))}
      </div>
      <div>
        <em className="text-secondary-foreground font-light">
          "{review.text}"
        </em>
      </div>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={review.image} alt={review.name} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-semibold">{review.name}</h3>
          <p className="text-secondary-foreground text-sm"> {review.job}</p>
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <div className="relative -mt-10 space-y-10 py-16">
      <div className="bg-secondary absolute top-0 left-1/2 -z-10 h-full w-dvw -translate-x-1/2" />
      <SectionTitle>Some customer reviews</SectionTitle>
      <div className="grid grid-cols-4 gap-4">
        {reviews[0].map((review, index) => (
          <ReviewCard key={index} review={review}></ReviewCard>
        ))}
        {reviews[1].map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            className={`${index % 2 === 0 ? "col-span-1" : "col-span-2"} ${index === reviews.length ? "max-xl:col-span-4" : ""}`}
          ></ReviewCard>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
