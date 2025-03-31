import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/utils/forms/forget-password-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const emailSchema = formSchema.pick({
  email: true,
});

export function EmailForm({ label = null }) {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "djalil.meskali@gmail.com",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const buttonLabel = { true: "Processing...", false: "Next" }[isSubmitting];

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    navigate("/auth/login/forget-password/OTP-confirmation");
  };

  const onError = (errors) => {
    console.error("Form errors:", errors);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
}
