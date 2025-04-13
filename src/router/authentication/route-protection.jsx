import PageNotFound from "@/error/page-not-found";
import { useUser } from "@/hooks/useUser";

function RouteProtection({ permission = "logged-in::user", children }) {
  const { data, token } = useUser();

  const currentState = data && token ? "logged-in" : "guest";
  const currentRole = data.role;

  const { state, role } = {
    state: permission.split("::")[0],
    role: permission.split("::")[1],
  };

  const isAllowed =
    (state === "guest" && currentState === state) ||
    (currentState === state && currentRole === role);

  if (isAllowed) return <PageNotFound />;

  return <>{children}</>;
}

export default RouteProtection;
