import Security from "@/pages/dashboard/Security";
import DashboardLayout from "../pages/DashboardLayout";
import Profile from "../pages/dashboard/Profile";
import General from "@/pages/dashboard/General";
import RouteProtection from "./authentication/route-protection";
import RoomsManagement from "@/pages/dashboard/RoomsManagement";
import RoomsList from "@/pages/dashboard/rooms/rooms-list";
import CreateRoom from "@/pages/dashboard/rooms/create-room";
import SingleRoom from "@/pages/dashboard/rooms/single-room";
import EditRoom from "@/pages/dashboard/rooms/edit-room";
import BookingManagement from "@/pages/dashboard/BookingManagment";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import UsersList from "@/pages/dashboard/admin/users-list";
import BookingList from "@/pages/dashboard/booking/booing-list";
import EditBooking from "@/pages/dashboard/booking/edit-booking";
import SingleBooking from "@/pages/dashboard/booking/single-booking";
import FeedBackList from "@/pages/dashboard/FeedBackList";
import ErrorBoundary from "@/error/error-boundary";

export const dashboard = {
  path: "/dashboard",
  element: (
    <RouteProtection permission="client">
      <DashboardLayout />
    </RouteProtection>
  ),
  errorElement: <ErrorBoundary />,
  children: [
    {
      path: "/dashboard/profile",
      element: <Profile />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/dashboard/security",
      element: <Security />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/dashboard/general",
      element: <General />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/dashboard/rooms",
      element: (
        <RouteProtection permission={"room manager" /* admin + room manager */}>
          <RoomsManagement />
        </RouteProtection>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <RoomsList />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/dashboard/rooms/:id",
          element: <SingleRoom />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/dashboard/rooms/edit-room/:id",
          element: <EditRoom />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/dashboard/rooms/new-room",
          element: <CreateRoom />,
          errorElement: <ErrorBoundary />,
        },
      ],
    },
    {
      path: "/dashboard/bookings",
      element: (
        <RouteProtection
          permission={"booking manager" /* admin + booking manager */}
        >
          <BookingManagement />
        </RouteProtection>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <BookingList title="Pending Booking" />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/dashboard/bookings/:id",
          element: <SingleBooking />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/dashboard/bookings/edit-booking/:id",
          element: <EditBooking />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/dashboard/bookings/booking-history",
          element: <BookingList status="other" title="Booking History" />,
          errorElement: <ErrorBoundary />,
        },
        // {
        //   path: "/dashboard/rooms/new-booking",
        //   element: <></>,
        // errorElement: <ErrorBoundary />,
        // },
      ],
    },
    {
      path: "/dashboard/",
      element: (
        <RouteProtection /* admin */>
          <AdminDashboard />
        </RouteProtection>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/dashboard/users",
          element: <UsersList />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/dashboard/feedback",
          element: <FeedBackList />,
          errorElement: <ErrorBoundary />,
        },
      ],
    },
  ],
};
