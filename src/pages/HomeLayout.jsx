import Footer from "@/components/auth/auth-footer";
import HomeFooter from "@/components/home/Footer";

import Header from "@/components/home/Header";
import { LayoutContainer } from "@/components/ui/layout-container";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />

      <HomeFooter />
      {/* <Main>
        <Outlet />
        </Main>
        <Footer /> */}
    </LayoutContainer>
  );
}

export default HomeLayout;
