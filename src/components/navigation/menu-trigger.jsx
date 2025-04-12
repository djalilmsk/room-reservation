import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CustomTip } from "../ui/custom-tip";
import NavLinks from "./nav-links";

function Trigger() {
  return (
    <div className="hover:text-primary hover:bg-secondary rounded-md max-md:-ml-2 lg:hidden 2xl:ml-2 cursor-pointer">
      <Menu className="size-7" />
      <span className="sr-only">Toggle Sidebar</span>
    </div>
  );
}

export function MenuTrigger() {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <Trigger />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Home Menu</SheetTitle>
        </SheetHeader>
        <NavLinks
          className="flex flex-col gap-2 px-4"
          oneLinkClasses="px-5 py-2 rounded-lg hover:bg-secondary hover:cursor-pointer"
        />
      </SheetContent>
    </Sheet>
  );
}
