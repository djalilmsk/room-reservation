import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import ListLoader from "@/components/ui/list-loader";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DialogClose } from "@radix-ui/react-dialog";

function CheckFeedback({ id, className, children }) {
  const { data: feedback, isLoading } =
    /*  useQuery({
    queryKey: ["feedback"  id],
    queryFn: async () => {
      const res = await customFetch.get(`/feedback/${id}`);
      return res.data.data;
    },
  }); */
    {
      data: {
        userId: "001",
        room: "Name",
        email: "sarah.j@example.com",
        date: "Date Submitted",
        customer: "Sarah Johnson",
        rating: 4,
        feedback:
          "The booking process was seamless and the meeting room exceeded our expectations. Will definitely book again!",
      },
      isLoading: false,
    };

  const filledStars = Array.from({ length: feedback.rating }, (_, i) => (
    <Star key={i} className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
  ));
  const emptyStars = Array.from({ length: 5 - feedback.rating }, (_, i) => (
    <Star key={i + 5} className="h-5 w-5 fill-gray-300 stroke-gray-300" />
  ));

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          className,
          "h-full w-full cursor-pointer px-4 py-3 text-left",
        )}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Feedback Details</DialogTitle>
          <DialogDescription>
            Review and respond to customer feedback
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded border py-4 text-sm">
          <div className="flex justify-between px-4">
            <span className="font-medium">User:</span>
            <span>{feedback.userId}</span>
          </div>
          <Separator />
          <div className="flex justify-between px-4">
            <span className="font-medium">Room:</span>
            <span>{feedback.room}</span>
          </div>
          <Separator />
          <div className="flex justify-between px-4">
            <span className="font-medium">Email:</span>
            <span>{feedback.email}</span>
          </div>
          <Separator />
          <div className="flex justify-between px-4">
            <span className="font-medium">Date Submitted:</span>
            <span>{feedback.date}</span>
          </div>
          <Separator />
          <div className="flex justify-between px-4">
            <span className="font-medium">Customer:</span>
            <span>{feedback.customer}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between px-4">
            <span className="font-medium">Rating:</span>
            <div className="flex">{[...filledStars, ...emptyStars]}</div>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1 ml-2 block font-medium">Feedback:</label>
          <div className="dark:bg-card rounded p-4 text-sm not-dark:border">
            {feedback.feedback}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="destructive">Remove</Button>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeedBackList() {
  const { data: feedback, isLoading } =
    /*  useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await customFetch.get("/feedback");
      return res.data.data;
    },
  }); */
    {
      data: [
        {
          name: "John Doe",
          email: "johndoe@gmail.com",
          date: "2023-10-01",
          rating: 4,
        },
        {
          name: "John Doe",
          email: "johndoe@gmail.com",
          date: "2023-10-01",
          rating: 4,
        },
      ],
      isLoading: false,
    };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <CheckFeedback>{row.getValue("name") || "N/A"}</CheckFeedback>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <CheckFeedback>{row.getValue("email") || "N/A"}</CheckFeedback>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <CheckFeedback>{row.getValue("date") || "N/A"}</CheckFeedback>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <CheckFeedback>
          <div className="ml-3">{row.getValue("rating") || "N/A"}</div>
        </CheckFeedback>
      ),
    },
  ];

  return (
    <div className="@container mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Feedback List</h1>
        <Input placeholder="find user feedback" className="w-40 sm:w-60" />
      </div>
      {isLoading ? (
        <ListLoader />
      ) : (
        <DataTable
          classNames={{ bodyCell: "px-0 py-0" }}
          columns={columns}
          data={feedback || []}
        />
      )}
    </div>
  );
}

export default FeedBackList;
