import Logo from "@/assets/Logo.svg";
import NavLinks from "../navigation/nav-links";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

function Header() {
  const navbar = useRef(null);
  // useGSAP(() => {
  //   gsap.set(navbar.current, {
  //     backgroundColor: "#000",
  //     opacity: 0,
  //   });

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       start: "top+=200",
  //       end: "+=1",
  //       toggleActions: "play none none reverse",
  //       scrub: true,
  //     },
  //   });

  //   tl.to(navbar.current, {
  //     opacity: 1,
  //   });
  // });
  return (
    <div
      ref={navbar}
      className="fixed flex w-full items-center justify-between px-20 py-10"
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
