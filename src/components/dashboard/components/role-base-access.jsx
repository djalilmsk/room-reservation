import { useUser } from "@/hooks/useUser";

function RoleBaseAccess({ permission = "admin", children }) {
  const { data } = useUser();

  const role = data?.role_name?.toLowerCase() || "guest";
  const requiredPermission = permission.toLowerCase();

  if (role === requiredPermission) return <>{children}</>;
  if (role === "admin" && requiredPermission !== "guest")
    return <>{children}</>;

  return <></>;
}

export default RoleBaseAccess;
