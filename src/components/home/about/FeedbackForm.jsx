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

function FeedbackForm() {
  const { data } = useUser();
  const isGuest = data === undefined ? true : false;
  const [stars, setStars] = useState(0);
  const form = useForm();

  return (
    <div className={cn("my-10 w-full space-y-4", isGuest ? "hidden" : "")}>
      <SectionTitle>Share Your ROOM Experience</SectionTitle>
      <p className="text-secondary-foreground @container max-sm:text-sm">
        Your feedback helps us improve our services and create better booking
        experiences for everyone.
      </p>
      <Form {...form}>
        <form className="bg-card space-y-4 rounded-xl p-6 not-dark:shadow-sm">
          <FormField
            control={form.control}
            name="username"
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
                    onChange={setStars}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    {...field}
                  >
                    <ToggleGroupItem
                      className="hover:bg-secondary/10 hover:text-primary data-[state=on]:text-primary data-[state=on]:bg-secondary/40 w-full border px-4 text-center sm:w-auto"
                      value="Booking-Process"
                    >
                      Booking Process
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="hover:bg-secondary/10 hover:text-primary data-[state=on]:text-primary data-[state=on]:bg-secondary/40 w-full border px-4 text-center sm:w-auto"
                      value="Room-Quality"
                    >
                      Room Quality
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="hover:bg-secondary/10 hover:text-primary data-[state=on]:text-primary data-[state=on]:bg-secondary/40 w-full border px-4 text-center sm:w-auto"
                      value="Amenities"
                    >
                      Amenities
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="hover:bg-secondary/10 hover:text-primary data-[state=on]:text-primary data-[state=on]:bg-secondary/40 w-full border px-4 text-center sm:w-auto"
                      value="Customer-Service"
                    >
                      Customer Service
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="text-secondary-foreground flex items-center gap-2">
                    <Checkbox {...field} />
                    <p>submit feedback anonymous</p>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full" type="button">
            {buttonLabel(
              false,
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
