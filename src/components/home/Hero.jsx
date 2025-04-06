import { CalendarClock } from "lucide-react";
import { Button } from "../ui/button";
import image from "@/assets/hero.png";
import H1 from "../ui/header1";

function Hero() {
  return (
    <>
      <div className="flex flex-col items-center justify-center 2xl:h-[60px]"></div>
      <div className="grid grid-cols-2 ">
        <div className="lg:mt-10 md:mt-5 flex flex-col items-start justify-start gap-4 xl:gap-8">
          <H1>
            Modern Workflows <br />
            with <span className="text-primary">Seamless Booking</span>
            <br /> for Productive Days
          </H1>
          <p className="text-secondary-foreground w-[90%] text-[1px] md:text-xs lg:text-sm xl:text-xl 2xl:w-xl">
            Transform your workplace experience with our intelligent meeting
            room management system. Book, manage, and optimize your spaces
            effortlessly.
          </p>
          <Button>
            <CalendarClock />
            Start Booking Your Space for Free
          </Button>
        </div>
        <div className="flex items-start justify-start">
          <img src={image} className="object-contain" />
        </div>
      </div>
    </>
  );
}

export default Hero;
