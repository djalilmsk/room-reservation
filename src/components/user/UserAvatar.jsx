import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Bell, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function IconLabel({ className, to, children, content }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            to={to}
            className={cn(
              "hover:bg-muted relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-1 text-sm",
              className,
            )}
          >
            {children}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
          <IconLabel to={"/saved"} content="Wish list">
            <Bookmark className="p-1" />
          </IconLabel>
          <IconLabel to={"/notifications"} content="Notification">
            <Bell className="p-1" />
          </IconLabel>
        </>
      )}

      <Link to={"/dashboard/profile"}>
        <Avatar className={cn('flex justify-center items-center',className)}>
          <AvatarImage src={image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}

export default UserAvatar;
