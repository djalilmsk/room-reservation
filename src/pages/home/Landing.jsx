import Features from "@/components/home/Landing/Features";
import Hero from "@/components/home/Landing/Hero";
import Reviews from "@/components/home/Landing/Reviews";
import Rooms from "@/components/home/Landing/Rooms";
import { Page } from "@/components/ui/page";

function Landing() {
  return (
    <Page>
      <Hero />
      <Features />
      <Rooms />
      <Reviews />
    </Page>
  );
}

export default Landing;
