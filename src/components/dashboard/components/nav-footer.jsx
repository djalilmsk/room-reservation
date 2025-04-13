import { Button } from "@/components/ui/button";
import { logout } from "@/utils/redux/user";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function NavFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    navigate("/");
    dispatch(logout());
  };

  return (
    <Button onClick={handleLogout} variant="secondary">
      <LogOut />
      <span className="data-[state=open]:hidden">Logout</span>
    </Button>
  );
}
