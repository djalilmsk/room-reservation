import Hero from "@/components/home/about/Hero";
import MissionVision from "@/components/home/about/MissionVision";
import HomeFooter from "@/components/home/Footer";
import { Page } from "@/components/ui/page";

function About() {
  return (
    <Page>
      <Hero />
      <MissionVision />
      <HomeFooter />
    </Page>
  );
}

export default About;
