import PageNotFound from "@/error/page-not-found";
import { useUser } from "@/hooks/useUser";

function RouteProtection({ permission = "logged-in::client", children }) {
  const { data } = useUser();
  const { state, role } = {
    state: permission.split("::")[0],
    role: permission.split("::")[1],
  };

  const currentState = data ? "logged-in" : "guest";

  if (state === "guest" && currentState === state) return <>{children}</>;
  if (state === "guest" && currentState !== state) return <PageNotFound />;

  const { role_name: currentRole } = data || { role_name: "none" };

  if (currentRole === "Admin") return <>{children}</>;
  if (currentState === state && currentRole?.toLowerCase() === role)
    return <>{children}</>;

  return <PageNotFound />;
}

export default RouteProtection;
