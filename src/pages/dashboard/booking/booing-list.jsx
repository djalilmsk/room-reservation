import { DataTable } from "@/components/ui/data-table";
import ListLoader from "@/components/ui/list-loader";
import { cn } from "@/lib/utils";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";

function BooingList({
  status = "Pending",
  url = "",
  title = "Booking Management",
  to = "/dashboard/bookings",
}) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["bookings", status, url],
    queryFn: async () => {
      const response = await customFetch.get(
        `/bookings${url}?status=${status}`,
      );
      return response.data.bookings;
    },
  });

  const bookings = data.map((item) => ({
    ...item,
    room_name: item?.room?.name || item?.room_id,
    user_email: item?.user?.email || null,
    date: new Date(item.start_time).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    start_time: new Date(item.start_time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    end_time: new Date(item.end_time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  }));

  const hasUserEmail = bookings.some((item) => item.user_email);

  const columns = [
    hasUserEmail && {
      accessorKey: "user_email",
      header: "User",
      cell: ({ row }) => (
        <div className="max-w-40 truncate">{row.getValue("user_email")}</div>
      ),
    },
    {
      accessorKey: "room_name",
      header: "Room",
      cell: ({ row }) => (
        <div className="w-fit">{row.getValue("room_name")}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "start_time",
      header: "Start Time",
      cell: ({ row }) => <div>{row.getValue("start_time")}</div>,
    },
    {
      accessorKey: "end_time",
      header: "End Time",
      cell: ({ row }) => <div>{row.getValue("end_time")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status")?.toLowerCase();
        return (
          <div
            className={cn(
              "my-1 w-fit rounded-md px-4 py-1 text-center",
              {
                pending: "bg-[#fbbc05]/20 text-[#fbbc05]",
                confirmed: "bg-[#34a853]/20 text-[#34a853]",
                canceled: "bg-[#eb4335]/20 text-[#eb4335]",
              }[status],
            )}
          >
            {status}
          </div>
        );
      },
    },
  ].filter(Boolean);

  return (
    <div className="@container space-y-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      {isLoading ? (
        <ListLoader />
      ) : (
        <DataTable columns={columns} data={bookings} to={to} />
      )}
    </div>
  );
}

export default BooingList;
