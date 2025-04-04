import Header from "@/components/home/Header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <Header />

      <Outlet />

      {/* <Main>
        <Outlet />
      </Main>
      <Footer /> */}
    </div>
  );
}

export default HomeLayout;
