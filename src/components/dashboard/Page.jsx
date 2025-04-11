import { AppSidebar } from "./components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Header />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 pt-25 pb-15 md:pl-10 xl:pl-15">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
