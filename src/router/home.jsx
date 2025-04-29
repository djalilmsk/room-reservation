import Notification from "@/pages/home/Notification";
import HomeLayout from "../pages/HomeLayout";
import Landing from "../pages/home/Landing";
import Rooms from "../pages/home/Rooms";
import SingleRoom from "@/pages/home/SingleRoom";
import About from "@/pages/home/About";
import RouteProtection from "./authentication/route-protection";
import SingleNotification from "@/pages/home/SingleNotification";
import BooingList from "@/pages/dashboard/booking/booing-list";
import CurrentBookings from "@/components/home/Bookings/BookingList";

export const home = {
  path: "/",
  element: <HomeLayout />,
  // errorElement: <Error />,
  children: [
    {
      index: true,
      element: <Landing />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/rooms",
      element: <Rooms />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/rooms/:id",
      element: <SingleRoom />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/about",
      element: <About />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/notifications",
      element: (
        <RouteProtection permission="client">
          <Notification />
        </RouteProtection>
      ),
      // errorElement: <ErrorElement />,
    },
    {
      path: "/notifications/:id",
      element: (
        <RouteProtection permission="client">
          <SingleNotification />
        </RouteProtection>
      ),
      // errorElement: <ErrorElement />,
    },
    {
      path: "current-bookings",
      element: (
        <RouteProtection permission="client">
          <CurrentBookings />
        </RouteProtection>
      ),
      // errorElement: <ErrorElement />,
    },
    {
      path: "/current-bookings/:id",
      element: (
        <RouteProtection permission="client">
          <SingleNotification />
        </RouteProtection>
      ),
      // errorElement: <ErrorElement />,
    },
  ],
};
