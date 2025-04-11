import DashboardLayout from "../pages/DashboardLayout";
import Profile from "../pages/dashboard/Profile";

export const dashboard = {
  path: "/dashboard/profile",
  element: <DashboardLayout />,
  // errorElement: <Error />,
  children: [
    {
      index: true,
      element: <Profile />,
      // errorElement: <ErrorElement />,
    },
  ],
};
