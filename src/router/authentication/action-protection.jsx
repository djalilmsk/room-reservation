import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";

function ActionProtection({ children, guest, className }) {
  const { data } = useUser();

  const role = (data && "logged-in") || "guest";
  const permission =
    role === "guest" ? false : role === "logged-in" ? true : false;

  if (permission) return <>{children}</>;

  return <Link to="/auth/signup" className={className}>{guest}</Link>;
}

export default ActionProtection;
