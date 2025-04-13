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
    </>
  );
}

function Landing() {
  const { data, token } = useUser();
  const isGuest = data === undefined || token === undefined ? true : false;

  return <Page>{isGuest ? <Guest /> : <UserActions />}</Page>;
}

export default Landing;
