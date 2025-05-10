import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { home } from "./router/home";
import { auth } from "./router/auth";
import { dashboard } from "./router/dashboard";
import { useEffect } from "react";
import { socket } from "./utils";
import { useUser } from "./hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";

const router = createBrowserRouter([home, auth, dashboard]);

function App() {
  const queryClient = useQueryClient();

  const { data } = useUser();

  useEffect(() => {
    if (!data?.id) return;

    const handleConnect = () => {
      socket.emit("register", { user_id: data.id });
    };

    socket.on("connect", handleConnect);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [data?.id]);

  useEffect(() => {
    const handleNotification = (notification) => {
      queryClient.setQueryData(["notifications"], (old) => {
        return [notification, ...(old || [])];
      });
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [queryClient]);

  return <RouterProvider router={router} />;
}

export default App;
