import { CalendarClock } from "lucide-react";
import { Button } from "../ui/button";
import image from "@/assets/hero.png";

function Hero() {
  return (
    <>
      <div className="flex 2xl:h-[60px] flex-col items-center justify-center"></div>
      <div className="grid h-dvh grid-cols-2 pt-32">
        <div className="mt-10 flex flex-col items-start justify-start xl:gap-8 gap-4">
          <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl text-[1px]">
            Modern Workflows <br />
            with <span className="text-primary">Seamless Booking</span>
            <br /> for Productive Days
          </h1>
          <p className="text-secondary-text w-[90%] xl:text-xl 2xl:w-xl lg:text-sm md:text-xs text-[1px]">
            Transform your workplace experience with our intelligent meeting
            room management system. Book, manage, and optimize your spaces
            effortlessly.
          </p>
          <Button >
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
