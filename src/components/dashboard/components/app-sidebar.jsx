"use client";

import * as React from "react";
import {
  AlignHorizontalSpaceAround,
  Bell,
  BookOpen,
  Calendar,
  History,
  Home,
  LayoutDashboard,
  LayoutGrid,
  Loader,
  Lock,
  MessageCircleMore,
  PieChart,
  Settings,
  Settings2,
  UserCircle2,
  Users2,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NavFooter } from "./nav-footer";

// This is sample data.
const data = {
  global: [
    {
      title: "Home Links",
      url: "/",
      icon: Home,
      isActive: false,
      items: [
        {
          title: "Home",
          url: "/",
          icon: Home,
        },
        {
          title: "Rooms",
          url: "/rooms",
          icon: LayoutGrid,
        },
        {
          title: "About",
          url: "/about",
          icon: BookOpen,
        },
        {
          title: "Contact",
          url: "/contact",
          icon: MessageCircleMore,
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
          icon: UserCircle2,
        },
        {
          title: "Security",
          url: "/dashboard/security",
          icon: Lock,
        },
        {
          title: "General",
          url: "/dashboard/general",
          icon: Settings2,
        },
      ],
    },
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: false,
      items: [{}],
    },
  ],
  roomsManagment: [
    {
      title: "Rooms",
      icon: AlignHorizontalSpaceAround,
      isActive: true,
      items: [
        {
          title: "Rooms List",
          url: "/dashboard/rooms",
          icon: LayoutGrid,
        },
      ],
    },
  ],
  bookingManager: [
    {
      title: "Bookings",
      icon: Calendar,
      isActive: true,
      items: [
        {
          title: "Pending Bookings",
          url: "/dashboard/booking",
          icon: Loader,
        },
        {
          title: "Notifications",
          url: "/dashboard/booking/notifications",
          icon: Bell,
        },
        {
          title: "Booking History",
          url: "/dashboard/booking/booking-history",
          icon: History,
        },
      ],
    },
  ],
  adminDashboard: [
    {
      title: "Settings",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/dashboard/users",
          icon: Users2,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarContent>
        {/* <SheetOverlay /> */}
        <NavMain label="General Settings" items={data.global} />
        <NavMain label="Rooms Management" items={data.roomsManagment} />
        <NavMain label="Booking Management" items={data.bookingManager} />
        <NavMain label="Admin Dashboard" items={data.adminDashboard} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
