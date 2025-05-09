import Logo from "@/assets/Logo.svg";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import UserAvatar from "../user/UserAvatar";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const navbar = useRef(null);

  useGSAP(() => {
    gsap.timeline().from(navbar.current, {
      paddingTop: 40,
      paddingBottom: 40,
    });
  });

  return (
    <div
      ref={navbar}
      className="bg-background fixed left-0 z-10 flex w-dvw justify-center border-b-1 py-5"
    >
      <div className="flex items-center justify-between transition-all max-xl:w-[90%] xl:w-6xl">
        <div className="flex h-full items-center justify-between gap-2">
          <SidebarTrigger className="max-md:-ml-2 2xl:ml-2" />
          <Separator orientation="vertical" className="h-full" />
          <Link to="/">
            <img src={Logo} alt="logo" className="ml-2 h-7" />
          </Link>
        </div>
        <UserAvatar />
      </div>
    </div>
  );
}

export default Header;
