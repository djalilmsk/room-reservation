import HomeFooter from "@/components/home/Footer";

import Header from "@/components/home/Header";
import { useRef } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative mx-auto max-xl:w-[90%] xl:w-6xl">
        <Header />
        <Outlet />
        <HomeFooter />

        {/* <Main>
        <Outlet />
        </Main>
        <Footer /> */}
      </div>
    </div>
  );
}

export default HomeLayout;
