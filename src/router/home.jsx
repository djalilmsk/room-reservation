import HomeLayout from "../pages/HomeLayout";
import Landing from "../pages/home/Landing";
import Rooms from "../pages/home/Rooms";

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
  ],
};
