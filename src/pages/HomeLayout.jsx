import Header from "@/components/home/Header";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div >
      <Header />
      {/* 
      <Main>
        <Outlet />
      </Main>
      <Footer /> */}
    </div>
  );
}

export default HomeLayout;
