import Logo from "@/assets/Logo.svg";
import NavLinks from "../navigation/nav-links";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useUser } from "@/hooks/useUser";
import UserAvatar from "../user/UserAvatar";

gsap.registerPlugin(ScrollTrigger);

function AuthLinks() {
  return (
    <div className="space-x-3">
      <Link to={"auth/login"}>
        <Button className="text-primary" variant="link">
          Log In
        </Button>
      </Link>
      <Link to={"auth/signup"}>
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
}

function Header() {
  const { data } = useUser();
  const navbar = useRef(null);

  console.log(data);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: navbar.current,
        start: "top+=100 top+=100",
        end: "bottom+=100",
        scrub: true,
        // markers: true,
        toggleActions: "play resume resume reverse",
      },
    });

    tl.to(navbar.current, {
      paddingTop: 20,
      paddingBottom: 20,
      borderBottom: 1,
      duration: 1,
    });
  }, []);

  return (
    <div
      ref={navbar}
      className="bg-background fixed left-0 z-10 flex w-dvw justify-center py-5 md:py-10"
    >
      <div className="flex items-center justify-between transition-all max-xl:w-[90%] xl:w-6xl">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-10" />
        </Link>
        <NavLinks
          className={
            "flex items-center justify-between gap-15 font-medium max-lg:hidden"
          }
          oneLinkClasses="hover:text-primary duration-300"
        />
        {data ? <UserAvatar /> : <AuthLinks />}
      </div>
    </div>
  );
}

export default Header;
