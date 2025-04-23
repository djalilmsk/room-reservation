import Footer from "@/components/auth/auth-footer";
import HomeFooter from "@/components/home/Footer";

import Header from "@/components/home/Header";
import { LayoutContainer } from "@/components/ui/layout-container";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <LayoutContainer>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </LayoutContainer>
  );
}

export default HomeLayout;
