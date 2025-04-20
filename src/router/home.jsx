import Notification from "@/pages/home/Notification";
import HomeLayout from "../pages/HomeLayout";
import Landing from "../pages/home/Landing";
import Rooms from "../pages/home/Rooms";
import SingleRoom from "@/pages/home/SingleRoom";
import About from "@/pages/home/About";

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
      element: <Notification />,
      // errorElement: <ErrorElement />,
    },
  ],
};
