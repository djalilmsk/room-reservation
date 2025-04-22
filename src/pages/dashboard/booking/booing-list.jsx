import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";

function BooingList({ status = "pending", title = "Booking Management" }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["bookings", status],
    queryFn: async () => {
      const response = await customFetch.get(`/bookings?status=${status}`);
      return response.data.bookings;
    },
  });

  if (isLoading) return "loading";

  const bookings = data.map((item) => ({
    ...item,
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

  const columns = [
    {
      accessorKey: "user_id",
      header: "User",
      cell: ({ row }) => (
        <div className="w-24 truncate">{row.getValue("user_id")}</div>
      ),
    },
    {
      accessorKey: "room_id",
      header: "Room",
      cell: ({ row }) => (
        <div className="w-fit px-3 text-center">{row.getValue("room_id")}</div>
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
  ];

  return (
    <div className="@container space-y-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      <DataTable columns={columns} data={bookings} to="/dashboard/bookings" />
    </div>
  );
}

export default BooingList;
