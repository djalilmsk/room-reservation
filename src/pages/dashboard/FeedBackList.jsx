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
import { Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DialogClose } from "@radix-ui/react-dialog";

function RatingStars({ rating }) {
  const filledStars = Array.from({ length: rating }, (_, i) => (
    <Star key={i} className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
  ));
  const emptyStars = Array.from({ length: 5 - rating }, (_, i) => (
    <Star key={i + 5} className="h-4 w-4 fill-gray-300 stroke-gray-300" />
  ));

  return (
    <div className="flex gap-[2px]">{[...filledStars, ...emptyStars]}</div>
  );
}

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
        userName: "John Do",
        email: "sarah.j@example.com",
        date: "24/01/2025",
        rating: 4,
        feedback:
          "The booking process was seamless and the meeting room exceeded our expectations. Will definitely book again!",
      },
      isLoading: false,
    };

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

        {isLoading ? (
          <div className="space-y-2">
            <ListLoader nbr={1} height={50} />
            <ListLoader nbr={1} height={30} />
            <ListLoader nbr={1} />
          </div>
        ) : (
          <>
            <div className="space-y-3 rounded border py-4 text-sm">
              <div className="flex justify-between px-4">
                <span className="font-medium">Name:</span>
                <span>{feedback.userName}</span>
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
              <div className="flex items-center justify-between px-4">
                <span className="font-medium">Rating:</span>
                <RatingStars rating={feedback.rating} />
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
          </>
        )}
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
          seen: true,
          rating: 4,
        },
        {
          name: "John Doe",
          email: "johndoe@gmail.com",
          date: "2023-10-01",
          seen: false,
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
          <RatingStars rating={row.getValue("rating") || 0} />
        </CheckFeedback>
      ),
    },
    {
      accessorKey: "seen",
      header: "",
      cell: ({ row }) => (
        <CheckFeedback>
          {row.getValue("seen") ? (
            <Eye className="fill-primary text-background" />
          ) : (
            <Eye className="text-background fill-gray-300" /> || "N/A"
          )}
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
