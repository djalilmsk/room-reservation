import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import ListLoader from "@/components/ui/list-loader";
import { useQuery } from "@tanstack/react-query";

function FeedBackList() {
  const {
    data: feedback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await customFetch.get("/feedback");
      return res.data.data;
    },
  });

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name") || "N/A"}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email") || "N/A"}</div>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date") || "N/A"}</div>,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => <div>{row.getValue("rating") || "N/A"}</div>,
    },
  ];

  return (
    <div className="@container mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Feedback List</h1>
        <Input placeholder="find user feedback" className='sm:w-60 w-40' />
      </div>
      {isLoading ? (
        <ListLoader />
      ) : (
        <DataTable columns={columns} data={feedback || []} />
      )}
    </div>
  );
}

export default FeedBackList;
