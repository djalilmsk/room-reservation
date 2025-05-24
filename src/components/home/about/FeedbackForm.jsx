import { Button } from "@/components/ui/button";
import { buttonLabel } from "@/components/ui/button-label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SectionTitle } from "@/components/ui/section";
import { StarRating } from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema } from "@/utils/forms/feedbackSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";

function FeedbackForm() {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const isGuest = user === undefined;
  const [stars, setStars] = useState(0);

  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      is_anonymous: false,
      rating: 0,
      satisfied_aspects: [],
      feedback: "",
    },
  });

  const { mutate: submitFeedback, isPending } = useMutation({
    mutationFn: async (feedbackData) => {
      await customFetch.post("/feedbacks", feedbackData);
    },
    onSuccess: () => {
      form.reset();
      setStars(0);
      queryClient.invalidateQueries(["feedbacks"]);
      toast.success("Feedback submitted successfully", {
        style: defaults,
      });
    },
    onError: () => {
      toast.error("Error submitting feedback", {
        style: defaults,
      });
    },
  });

  const onSubmit = (data) => {
    const feedbackData = {
      email: data.is_anonymous ? null : user?.email,
      userName: data.is_anonymous ? null : user?.name,
      message: data.feedback,
      rating: data.rating,
      Anonymous: data.is_anonymous,
    };

    submitFeedback(feedbackData);
  };

  return (
    <div className={cn("my-10 w-full space-y-4", isGuest ? "hidden" : "")}>
      <SectionTitle>Share Your ROOM Experience</SectionTitle>
      <p className="text-secondary-foreground @container max-sm:text-sm">
        Your feedback helps us improve our services and create better booking
        experiences for everyone.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card space-y-4 rounded-xl p-6 not-dark:shadow-sm"
        >
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  How would you rate your overall experience?
                </FormLabel>
                <FormControl>
                  <StarRating
                    width={30}
                    height={30}
                    value={stars}
                    onChange={(value) => {
                      setStars(value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Satisfied Aspects */}
          <FormField
            control={form.control}
            name="satisfied_aspects"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  What aspects of our service were you most satisfied with?
                </FormLabel>
                <FormControl>
                  <ToggleGroup
                    className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
                    type="multiple"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ToggleGroupItem
                      value="Booking-Process"
                      className="hover:bg-secondary/10 hover:text-primary data-[state=on]:text-primary data-[state=on]:bg-secondary/40 w-full border px-4 text-center sm:w-auto"
                    >
                      Booking Process
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Room-Quality"
                      className="hover:bg-secondary/10 hover:text-primary data-[state=on]:text-primary data-[state=on]:bg-secondary/40 w-full border px-4 text-center sm:w-auto"
                    >
                      Room Quality
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Amenities"
                      className="hover:bg-secondary/10 hover:text-primary data-[state=on]:text-primary data-[state=on]:bg-secondary/40 w-full border px-4 text-center sm:w-auto"
                    >
                      Amenities
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Customer-Service"
                      className="hover:bg-secondary/10 hover:text-primary data-[state=on]:text-primary data-[state=on]:bg-secondary/40 w-full border px-4 text-center sm:w-auto"
                    >
                      Customer Service
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Feedback Textarea */}
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  Tell us more about your experience
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Anonymous Checkbox */}
          <FormField
            control={form.control}
            name="is_anonymous"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="text-secondary-foreground flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <p>Submit feedback anonymously</p>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isPending} className="w-full">
            {buttonLabel(
              isPending,
              <>
                <Send className="size-4" />
                Submit Feedback
              </>,
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FeedbackForm;
