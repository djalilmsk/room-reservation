import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import image from "@/assets/hero.png";
import H1 from "@/components/ui/header1";
import { useExpendAnimation } from "@/hooks/use-expand-animation";
import { Link } from "react-router-dom";

function Text() {
  const Br = () => <br className="hidden md:block" />;
  const Primary = ({ children }) => (
    <span className="text-primary">{children}</span>
  );
  const Description = ({ children }) => (
    <p className="text-secondary-foreground w-full text-xs lg:w-[90%] lg:text-sm xl:text-xl 2xl:w-xl">
      {children}
    </p>
  );

  return (
    <div className="flex flex-col items-start justify-start gap-4 md:mt-5 xl:mt-10 xl:gap-8">
      <H1>
        Modern Workflows
        <Br /> with <Primary>Seamless Booking</Primary>
        <Br /> for Productive Days
      </H1>

      <Description>
        Transform your workplace experience with our intelligent meeting room
        management system. Book, manage, and optimize your spaces effortlessly.
      </Description>

      <Link className="max-md:w-full" to="/auth/signup">
        <Button className="max-md:w-full">
          <CalendarClock />
          Start Booking Your Space for Free
        </Button>
      </Link>
    </div>
  );
}

function Image() {
  return (
    <div className="flex items-start justify-start">
      <img src={image} className="object-contain" />
    </div>
  );
}

function Hero() {
  return (
    <div className="grid max-md:space-y-5 md:grid-cols-2">
      <Text />
      <Image />
    </div>
  );
}

export default Hero;
