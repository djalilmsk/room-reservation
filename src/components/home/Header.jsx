import Logo from "@/assets/Logo.svg";
import NavLinks from "../navigation/nav-links";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const navbar = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: navbar.current,
        start: "top+=100 top+=100",
        end: "bottom+=200",
        scrub: true,
        // markers: true,
        toggleActions: "play resume resume reverse",
      },
    });

    tl.to(navbar.current, {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 20,
      paddingBottom: 20,
      duration: 1,
    });
  }, []);

  return (
    <div
      ref={navbar}
      className="fixed flex w-full items-center justify-between px-20 py-10 transition-all"
    >
      <img src={Logo} alt="logo" className="h-10" />
      <NavLinks
        className={"flex items-center justify-between gap-15 font-medium"}
        oneLinkClasses="hover:text-primary duration-300"
      />
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
    </div>
  );
}

export default Header;
