import PageNotFound from "@/error/page-not-found";
import { useUser } from "@/hooks/useUser";

function RouteProtection({ permission = "admin", children }) {
  const { data } = useUser();

  const role = data?.role_name?.toLowerCase() || "guest";
  const requiredPermission = permission.toLowerCase();

  if (role === requiredPermission) return <>{children}</>;
  if (role === "admin" && requiredPermission !== "guest") return <>{children}</>;

  return <PageNotFound />;
}

export default RouteProtection;
