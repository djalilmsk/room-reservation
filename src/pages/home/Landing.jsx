import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Reviews from "@/components/home/Reviews";
import Rooms from "@/components/home/Rooms";

function Landing() {
  return (
    <div className="space-y-32">
      <Hero />
      <Features />
      <Rooms />
      <Reviews />
      <div></div>
    </div>
  );
}

export default Landing;
