import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Bell, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

function IconLabel({ className, to, children }) {
  return (
    <Link
      to={to}
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-1 text-sm hover:bg-muted",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function UserAvatar({ className, moreLinks = true }) {
  const { data } = useUser();
  const { image, firstName, lastName } = data;
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <div className="flex items-center justify-between gap-2">
      {moreLinks && (
        <>
          <IconLabel to={"/dashboard/saved"}>
            <Bookmark className="p-1" />
          </IconLabel>
          <IconLabel to={"/dashboard/notification"}>
            <Bell className="p-1" />
          </IconLabel>
        </>
      )}

      <Link to={"/dashboard/profile"}>
        <Avatar className={className}>
          <AvatarImage src={image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}

export default UserAvatar;
