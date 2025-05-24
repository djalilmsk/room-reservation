import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import ListLoader from "@/components/ui/list-loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { customFetch } from "@/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";
import { buttonLabel } from "@/components/ui/button-label";
import { useDebounce } from "react-haiku";

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
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) queryClient.invalidateQueries(["feedbacks"]);
  }, [isOpen]);

  const { data: feedback, isLoading } = useQuery({
    queryKey: ["feedback-" + id],
    queryFn: async () => {
      const res = await customFetch.get(`/feedbacks/${id}`);
      return res.data.data;
    },
    enabled: isOpen && !!id,
  });

  const { mutate: markAsSeen } = useMutation({
    mutationFn: async () => {
      await customFetch.patch(`/feedbacks/${id}`, { seen: true });
    },
    enabled: isOpen && !!id && !feedback?.seen,
  });

  const { mutate: removeFeedback, isPending } = useMutation({
    mutationFn: async () => {
      await customFetch.delete(`/feedbacks/${id}`);
    },
    onSuccess: () => {
      toast.success("Feedback removed successfully", {
        style: defaults,
      });
      queryClient.invalidateQueries(["feedbacks"]);
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to remove feedback", {
        style: defaults,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onClick={() => {
          if (!feedback?.seen) {
            markAsSeen();
          }
        }}
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
            <ListLoader nbr={1} height={52} />
            <ListLoader nbr={1} height={30} />
            <ListLoader nbr={1} />
          </div>
        ) : (
          <>
            <div className="space-y-3 rounded border py-4 text-sm">
              <div className="flex justify-between px-4">
                <span className="font-medium">Name:</span>
                <span>{feedback?.userName || "anonymous"}</span>
              </div>
              <Separator />
              <div className="flex justify-between px-4">
                <span className="font-medium">Email:</span>
                <span>{feedback?.email || "N/A"}</span>
              </div>
              <Separator />
              <div className="flex justify-between px-4">
                <span className="font-medium">Date Submitted:</span>
                <span>{feedback?.date}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between px-4">
                <span className="font-medium">Rating:</span>
                <RatingStars rating={feedback?.rating} />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 ml-2 block font-medium">Feedback:</label>
              <div className="dark:bg-card rounded p-4 text-sm not-dark:border">
                {feedback?.feedback}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="destructive"
                onClick={removeFeedback}
                disabled={isPending}
              >
                {buttonLabel(isPending, "Delete")}
              </Button>
              <DialogClose
                asChild
                onClick={() => queryClient.invalidateQueries(["feedbacks"])}
              >
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
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const { data: feedback, isLoading } = useQuery({
    queryKey: ["feedbacks", searchDebounce],
    queryFn: async () => {
      const res = await customFetch.get(
        `/feedbacks${searchDebounce ? `?email=${searchDebounce}` : ""}`,
      );
      return res.data.data;
    },
  });

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <CheckFeedback id={row?.original?.id}>
          {row.getValue("name") || "anonymous"}
        </CheckFeedback>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <CheckFeedback id={row?.original?.id}>
          {row.getValue("email") || "N/A"}
        </CheckFeedback>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <CheckFeedback id={row?.original?.id}>
          {row.getValue("date") || "N/A"}
        </CheckFeedback>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <CheckFeedback id={row?.original?.id}>
          <RatingStars rating={row.getValue("rating") || 0} />
        </CheckFeedback>
      ),
    },
    {
      accessorKey: "seen",
      header: "",
      cell: ({ row }) => (
        <CheckFeedback id={row?.original?.id}>
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
        <Input
          placeholder="find user feedback"
          className="w-40 sm:w-60"
          onChange={(e) => setSearch(e.target.value)}
        />
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
