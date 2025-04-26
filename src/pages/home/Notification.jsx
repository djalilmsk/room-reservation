import { Page } from "@/components/ui/page";
import { Section, SectionTitle } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { customFetch, socket } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, MessageCircle, Pin } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationItem = ({ notification }) => {
  const title =
    {
      booking: "Booking Validation",
    }[notification?.type?.toLowerCase()] || "Notification";

  const icon = {
    booking: { icon: Pin },
  }[notification?.type?.toLowerCase()] || { icon: MessageCircle };

  const isRead = notification?.status === "Read" ? true : false;

  return (
    <div className="hover:bg-muted-foreground/20 flex flex-col gap-1 border-b py-4 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex items-center gap-3",
            isRead && "text-secondary-foreground",
          )}
        >
          <div className="flex items-center justify-center rounded-full">
            {<icon.icon className="h-4 w-4" />}
          </div>
          <h2 className="font-semibold">{title}</h2>
        </div>
        <div
          className={cn(
            "bg-primary h-2 w-2 rounded-full",
            isRead && "bg-transparent",
          )}
        ></div>
      </div>

      <div className="ml-7 flex gap-1 max-sm:flex-col sm:items-center sm:justify-between">
        <p
          className={cn(
            "text-accent-foreground text-sm font-medium",
            isRead && "text-muted-foreground",
          )}
        >
          {notification.message}
        </p>
        <p
          className={cn(
            "text-accent-foreground text-sm font-medium",
            isRead && "text-muted-foreground",
          )}
        >
          {new Date(notification.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

function Notification() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await customFetch.get("/notifications");
      return res.data.notifications;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (notificationId) => {
      const res = await customFetch.patch(`/notifications/${notificationId}`, {
        status: "Read",
      });
      return res.data.notification;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notifications"]);
      queryClient.setQueryData(["notifications"], (old) => {
        return old.map((notification) => {
          if (notification.notification_id === data.notification_id) {
            return { ...notification, status: "Read" };
          }
          return notification;
        });
      });

      console.log(data);
    },
  });

  const handleReadNotification = (id) => {
    mutate(id);
  };

  return (
    <Page className="space-y-6 max-sm:pt-18 sm:space-y-26 md:pt-0 xl:space-y-32">
      <Section>
        {data?.length !== 0 ? (
          data?.map((notification) => (
            <Link
              onClick={() =>
                handleReadNotification(notification.notification_id)
              }
              key={notification.notification_id}
              to={`/notifications/${notification.bookingId}`}
            >
              <NotificationItem notification={notification} />
            </Link>
          ))
        ) : (
          <div className="flex h-24 items-center justify-center">
            <h2 className="text-secondary-foreground text-base">
              No notifications available
            </h2>
          </div>
        )}
      </Section>
    </Page>
  );
}

export default Notification;
