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
import { StarRating } from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import ActionProtection from "@/router/authentication/action-protection";
import { customFetch } from "@/utils";
import { defaults } from "@/utils/format/toast-styles";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

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
        <ActionProtection
          guest={
            <Button
              variant="link"
              className="text-secondary-foreground hover:text-primary h-4 w-full"
            >
              Sign up to submit your review!
            </Button>
          }
        >
          <Button disabled={isPending} className="w-full" type="submit">
            {buttonLabel(
              isPending,
              <>
                <Send className="h-4 w-4" />
                Submit Review
              </>,
            )}
          </Button>
        </ActionProtection>
      </form>
    </Form>
  );
}

export default ReviewForm;
