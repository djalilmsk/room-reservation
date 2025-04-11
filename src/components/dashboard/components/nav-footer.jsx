import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function NavFooter() {
  return (
    <Button variant="secondary">
      <LogOut />
      Logout
    </Button>
  );
}
