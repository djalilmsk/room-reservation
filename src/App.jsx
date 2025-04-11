import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { home } from "./router/home";
import { auth } from "./router/auth";
import { dashboard } from "./router/dashboard";

const router = createBrowserRouter([home, auth, dashboard]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
