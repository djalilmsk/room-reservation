"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  LogOut,
  Map,
  MessageCircleMore,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  UserCircle2,
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
  navMain: [
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
      items: [],
    },
  ],
  // projects: [
  //   {
  //     name: "link",
  //     url: "#",
  //     icon: null,
  //   },
  // ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
