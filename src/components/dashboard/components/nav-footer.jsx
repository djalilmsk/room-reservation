import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
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
    setTimeout(() => dispatch(logout()), 1);
  };

  return (
    <SidebarMenuButton
      onClick={handleLogout}
      className="text-primary/70 px-3 bg-secondary/20 flex w-full cursor-pointer overflow-hidden rounded-md transition-all duration-300"
    >
      <LogOut />
      <span className="truncate">Logout</span>
    </SidebarMenuButton>
  );
}
