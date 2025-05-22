import ListLoader from "@/components/ui/list-loader";
import { customFetch } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 ${i < rating ? "text-yellow-500" : "text-gray-300"} inline`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
    </svg>
  ));
};

function DeleteReview() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleteReview } = useMutation({
    mutationFn: async (reviewId) => {
      const res = await customFetch.delete(`/reviews/${reviewId}`);
      return res.data;
    },
  });

  const handleDelete = (reviewId) => {
    deleteReview(reviewId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["room-reviews"]);
      },
      onError: (error) => {
        console.error("Error deleting review:", error);
      },
    });
  };

  return (
    <div className="relative mt-3 flex w-full items-center border-t-1 pt-3">
      <Button
        onClick={() => handleDelete(id)}
        size="sm"
        variant="link"
        className="text-destructive flex h-4 items-center justify-center"
      >
        <Trash2 className="size-4" />
        <p className="h-4">delete</p>
      </Button>
    </div>
  );
}

function RoleBaseAccess({ id }) {
  const { data } = useUser();
  console.log(data);
  const isAdmin = data?.role_name === "Admin";
  const isOwner = data?.id === id;

  if (isAdmin || isOwner) {
    return <DeleteReview />;
  }
  return <></>;
}

function ReviewCard({ review }) {
  dayjs.extend(relativeTime);

  return (
    <div className="h-fit w-full rounded-xl border-1 p-3">
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-2">
          <img
            src={review.user.avatar || "/default-avatar.png"}
            alt={review.user.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold">{review.user.name}</h3>
            <h4 className="text-secondary-foreground text-xs">
              {review.user.email}
            </h4>
          </div>
        </div>
        <p className="text-secondary-foreground text-sm">
          {dayjs(review.created_at).fromNow()}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-1">
        <span className="flex items-center font-semibold">
          <span className="my-1 flex gap-1">{renderStars(review.rating)}</span>
        </span>
      </div>
      <p className="mt-2 text-sm">{review.comment}</p>

      <RoleBaseAccess id={review.user_id}>
        <DeleteReview />
      </RoleBaseAccess>
    </div>
  );
}

function ReviewsList() {
  const { id } = useParams();
  const [rating, setRating] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["room-reviews", id, rating],
    queryFn: async () => {
      const res = await customFetch.get(
        `/reviews/rooms/${id}${rating ? (rating !== "all" ? `?rating=${rating}` : "") : ""}`,
      );
      return res.data.reviews;
    },
  });

  console.log(data);

  return (
    <div className="bg-card h-[30rem] rounded-lg p-5 not-dark:shadow-sm lg:col-span-2">
      <div className="flex items-start justify-between">
        <h3 className="mb-4">Customer Reviews</h3>
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger className="cursor-pointer border-0 data-[size=default]:h-6 dark:hover:bg-transparent">
            <SelectValue placeholder="Filter By Stars" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rating</SelectLabel>
              <SelectItem className="cursor-pointer" value="all">
                all reviews
              </SelectItem>
              <SelectItem className="cursor-pointer" value="1">
                1 Star
              </SelectItem>
              <SelectItem className="cursor-pointer" value="2">
                2 Stars
              </SelectItem>
              <SelectItem className="cursor-pointer" value="3">
                3 Stars
              </SelectItem>
              <SelectItem className="cursor-pointer" value="4">
                4 Stars
              </SelectItem>
              <SelectItem className="cursor-pointer" value="5">
                5 Stars
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[25rem] space-y-2 overflow-y-auto rounded-lg">
        {isLoading ? (
          <ListLoader height={40} />
        ) : data?.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-secondary-foreground">No reviews yet</p>
          </div>
        ) : (
          <>
            {data?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            <div className="flex h-10 items-center justify-center">
              <p className="text-secondary-foreground">
                You’ve reached the end of the reviews.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewsList;
