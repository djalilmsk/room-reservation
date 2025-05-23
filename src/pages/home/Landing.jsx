import HomeFooter from "@/components/home/Footer";
import Features from "@/components/home/Landing/Features";
import Hero from "@/components/home/Landing/Hero";
import Reviews from "@/components/home/Landing/Reviews";
import Rooms from "@/components/home/Landing/Rooms";
import UserActions from "@/components/home/Landing/UserActions";
import { Page } from "@/components/ui/page";
import { useUser } from "@/hooks/useUser";

function Guest() {
  return (
    <>
      <Hero />
      <Features />
      <Rooms />
      <Reviews />
      <HomeFooter />
    </>
  );
}

function Landing() {
  const { data } = useUser();
  const isGuest = data === undefined ? true : false;

  return (
    <Page
      className={
        isGuest ||
        "space-y-12 max-sm:pt-12 sm:space-y-24"
      }
    >
      {isGuest ? <Guest /> : <UserActions />}
    </Page>
  );
}

export default Landing;
