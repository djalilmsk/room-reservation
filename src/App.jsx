import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { home } from "./router/home";
import { auth } from "./router/auth";
import { dashboard } from "./router/dashboard";
import { useEffect } from "react";
import { socket } from "./utils";
import { useUser } from "./hooks/useUser";

const router = createBrowserRouter([home, auth, dashboard]);

function App() {
  const { data } = useUser();

  useEffect(() => {
    if (!data?.id) return;

    const handleConnect = () => {
      console.log("✅ Connected to backend as", socket.id);
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

  socket.on("notification", (notification) => {
    console.log("📨 Notification received:", notification);
  });

  return <RouterProvider router={router} />;
}

export default App;
