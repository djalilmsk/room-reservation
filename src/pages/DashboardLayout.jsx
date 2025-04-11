import Header from "@/components/dashboard/Header";
import Page from "@/components/dashboard/Page";

import { LayoutContainer } from "@/components/ui/layout-container";

function DashboardLayout() {
  return (
    <LayoutContainer>
      <Page />
      {/* <Main>
        <Outlet />
        </Main>
        <Footer /> */}
    </LayoutContainer>
  );
}

export default DashboardLayout;
