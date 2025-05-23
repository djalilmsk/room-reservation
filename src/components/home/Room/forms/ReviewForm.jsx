import { Button } from "@/components/ui/button";
import { buttonLabel } from "@/components/ui/button-label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { customFetch } from "@/utils";
import { defaults } from "@/utils/format/toast-styles";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function StarRating({ totalStars = 5, value = 0, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="space-x-1">
        {[...Array(totalStars)].map((_, idx) => {
          const starValue = idx + 1;
          return (
            <button
              key={starValue}
              type="button"
              onClick={() => onChange && onChange(starValue)}
              onMouseEnter={() => setHovered(starValue)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
              className="cursor-pointer border-none bg-transparent p-0"
            >
              <svg
                width="20"
                height="20"
                fill={starValue <= (hovered || value) ? "#fbbf24" : "#e5e7eb"}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          );
        })}
      </div>
      <span className="text-muted-foreground ml-2 text-sm">
        {value ? `You rated ${value} star${value > 1 ? "s" : ""}` : "No rating"}
      </span>
    </div>
  );
}
function ReviewForm() {
  const { id } = useParams();
  const form = useForm({
    defaultValues: {
      rating: 0,
      review: "",
    },
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await customFetch.post(`/reviews/`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!", {
        style: defaults,
      });
      form.reset();
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to submit review", {
        style: defaults,
      });
    },
  });

  const onSubmit = (data) => {
    const reviewData = {
      rating: data.rating,
      comment: data.review,
      room_id: +id,
    };
    mutate(reviewData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          rules={{
            required: "Please provide a rating",
            validate: (value) => value > 0 || "Please provide a rating",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate Your Experience</FormLabel>
              <FormControl>
                <StarRating value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="mt-3 mb-4" />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Share your thoughts</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What do you think about ROOM?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          {buttonLabel(
            isPending,
            <>
              <Send className="h-4 w-4" />
              Submit Review
            </>,
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ReviewForm;
