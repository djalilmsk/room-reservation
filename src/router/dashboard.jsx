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

export const dashboard = {
  path: "/dashboard",
  element: (
    <RouteProtection permission="client">
      <DashboardLayout />
    </RouteProtection>
  ),
  // errorElement: <Error />,
  children: [
    {
      path: "/dashboard/profile",
      element: <Profile />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/dashboard/security",
      element: <Security />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/dashboard/general",
      element: <General />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/dashboard/rooms",
      element: (
        <RouteProtection permission={"room manager" /* admin + room manager */}>
          <RoomsManagement />
        </RouteProtection>
      ),
      // errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <RoomsList />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/dashboard/rooms/:id",
          element: <SingleRoom />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/dashboard/rooms/edit-room/:id",
          element: <EditRoom />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/dashboard/rooms/new-room",
          element: <CreateRoom />,
          // errorElement: <ErrorElement />,
        },
      ],
    },
    {
      path: "/dashboard/booking",
      element: (
        <RouteProtection
          permission={"booking manager" /* admin + booking manager */}
        >
          <BookingManagement />
        </RouteProtection>
      ),
      // errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <BookingList />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/dashboard/booking/:id",
          element: <>not implemented</>, // TODO: implement booking details page
          // errorElement: <ErrorElement />,
        },
        {
          path: "/dashboard/booking/edit-booking/:id",
          element: <EditBooking />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/dashboard/booking/notifications",
          element: <>not implemented</>, // TODO: implement booking notifications page
          // errorElement: <ErrorElement />,
        },
        {
          path: "/dashboard/booking/booking-history",
          element: <>not implemented</>, // TODO: implement booking history page
          // errorElement: <ErrorElement />,
        },
        // {
        //   path: "/dashboard/rooms/new-booking",
        //   element: <></>,
        //   // errorElement: <ErrorElement />,
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
      // errorElement: <ErrorElement />,
      children: [
        {
          path: "/dashboard/users",
          element: <UsersList />,
          // errorElement: <ErrorElement />,
        },
      ],
    },
  ],
};
