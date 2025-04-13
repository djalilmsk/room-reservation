import PageNotFound from "@/error/page-not-found";
import { useUser } from "@/hooks/useUser";

function RouteProtection({ permission = "logged-in::user", children }) {
  const { data, token } = useUser();
  const { state, role } = {
    state: permission.split("::")[0],
    role: permission.split("::")[1],
  };

  const currentState = data ? "logged-in" : "guest";

  if (state === "guest" && currentState === state) return <>{children}</>;
  if (state === "guest" && currentState !== state) return <PageNotFound />;

  const { role: currentRole } = data || { role: "none" };

  if (currentState === state && currentRole === role) return <>{children}</>;

  return <PageNotFound />;
}

export default RouteProtection;
