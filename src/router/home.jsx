import Notification from "@/pages/home/Notification";
import HomeLayout from "../pages/HomeLayout";
import Landing from "../pages/home/Landing";
import Rooms from "../pages/home/Rooms";
import SingleRoom from "@/pages/home/SingleRoom";
import About from "@/pages/home/About";
import RouteProtection from "./authentication/route-protection";
import SingleNotification from "@/pages/home/SingleNotification";
import CurrentBookings from "@/components/home/Bookings/BookingList";
import ContactUs from "@/components/home/about/ContactUs";
import ErrorBoundary from "@/error/error-boundary";

export const home = {
  path: "/",
  element: <HomeLayout />,
  errorElement: <ErrorBoundary />,
  children: [
    {
      index: true,
      element: <Landing />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/rooms",
      element: <Rooms />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/rooms/:id",
      element: <SingleRoom />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/about",
      element: <About />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/contact",
      element: <ContactUs />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/notifications",
      element: (
        <RouteProtection permission="client">
          <Notification />
        </RouteProtection>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/notifications/:id",
      element: (
        <RouteProtection permission="client">
          <SingleNotification />
        </RouteProtection>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "current-bookings",
      element: (
        <RouteProtection permission="client">
          <CurrentBookings />
        </RouteProtection>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/current-bookings/:id",
      element: (
        <RouteProtection permission="client">
          <SingleNotification />
        </RouteProtection>
      ),
      errorElement: <ErrorBoundary />,
    },
  ],
};
