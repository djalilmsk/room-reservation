import Features from "@/components/home/Landing/Features";
import Hero from "@/components/home/Landing/Hero";
import Reviews from "@/components/home/Landing/Reviews";
import Rooms from "@/components/home/Landing/Rooms";

function Landing() {
  return (
    <div className="space-y-12 max-sm:pt-12 sm:space-y-24 lg:space-y-32">
      <div></div>
      <Hero />
      <Features />
      <Rooms />
      <Reviews />
      <div></div>
    </div>
  );
}

export default Landing;
