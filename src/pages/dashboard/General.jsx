import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Mail, Moon, Sun, Laptop } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ui/theme-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { useProfileMutation } from "@/hooks/mutation/useProfileMutation";
import { Button } from "@/components/ui/button";
import { useDebounce } from "react-haiku";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "@/utils/redux/user";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";

const ThemePreview = ({ theme, className }) => {
  const base = "w-40 h-28 p-2 flex flex-col justify-between shadow-sm";
  const head = "flex items-center gap-2";
  const circle = "w-11 h-11 rounded-full";
  const line = "h-3 rounded-full";
  const square = "h-10 rounded-lg mt-auto";

  const styles = {
    light: "bg-white text-blue-200",
    dark: "bg-[#1e1e1e] text-[#3792de4d]",
    system: "bg-gray-100 text-gray-500", // Fallback for system theme
  };

  return (
    <div className={cn(base, styles[theme] || styles.light, className)}>
      <div className={cn(head)}>
        <div className={cn(circle, "bg-current")} />
        <div className={cn("w-3/5 space-y-1")}>
          <div className={cn(line, "w-full bg-current")} />
          <div className={cn(line, "h-2 w-3/4 bg-current")} />
        </div>
      </div>
      <div className={cn(square, "bg-current")} />
    </div>
  );
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      value={theme} // Use current theme instead of defaultValue
      onValueChange={(value) => setTheme(value)}
      className="flex flex-wrap items-start gap-4"
    >
      <Label className="flex flex-col items-center gap-2">
        <ThemePreview theme="light" className="rounded-xl" />
        <RadioGroupItem value="light" />
        <span className="mt-1 text-sm">Light</span>
      </Label>

      <Label className="flex flex-col items-center gap-2">
        <ThemePreview theme="dark" className="rounded-xl" />
        <RadioGroupItem value="dark" />
        <span className="mt-1 text-sm">Dark</span>
      </Label>

      <Label className="flex flex-col items-center gap-2">
        <div className="relative h-28 w-40 overflow-hidden rounded-xl shadow-sm">
          <div className="absolute top-0 left-0 h-full w-1/2 rounded-none">
            <ThemePreview theme="light" className="rounded-l-2xl" />
          </div>
          <div className="absolute top-0 right-1/2 h-full w-20 overflow-hidden rounded-none">
            <ThemePreview theme="dark" />
          </div>
        </div>
        <RadioGroupItem value="system" />
        <span className="mt-1 text-sm">System</span>
      </Label>
    </RadioGroup>
  );
}

function General() {
  const dispatch = useDispatch();
  const { data, isLoading } = useUser();
  const { emailNotification = true, id = "" } = data || {};
  const [isUpdating, setIsUpdating] = useState(false); // Track mutation loading state

  const form = useForm({
    defaultValues: {
      emailNotification,
    },
  });

  const watchedValue = form.watch("emailNotification");
  const debouncedValue = useDebounce(watchedValue, 1000);
  const { mutate } = useProfileMutation(id);

  useEffect(() => {
    if (debouncedValue !== emailNotification && id) {
      // crete form data var
      const formData = new FormData();
      formData.append("emailNotification", debouncedValue ? true : false);
      setIsUpdating(true);
      mutate(formData, {
        onSuccess: (data) => {
          dispatch(login({ data: data.data.dataValues }));
          toast.success("Email notification updated!", {
            style: defaults,
          });
        },
        onError: (err) => {
          console.error("Error updating email notification:", err);
          form.setValue("emailNotification", emailNotification); // Revert to server value
          toast.error("Error updating email notification!", {
            style: defaults,
          });
        },
        onSettled: () => setIsUpdating(false),
      });
    }
  }, [debouncedValue, emailNotification, id, mutate, dispatch, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">General Settings</h1>

      {/* Notification Section */}
      <div>
        <div className="bg-secondary/50 rounded-xl p-4">
          <h2 className="font-bold">Notification</h2>
        </div>
        <Form {...form}>
          <form className="flex items-center justify-between p-4 py-5">
            <div className="flex items-center gap-2">
              <Mail className="text-primary" />
              <h4>Email Notification</h4>
            </div>
            <FormField
              control={form.control}
              name="emailNotification"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isUpdating} // Disable during update
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {/* Appearance Section */}
      <div className="bg-secondary/50 rounded-xl p-4">
        <h2 className="font-bold">Appearance</h2>
      </div>
      <ThemeToggle />
    </div>
  );
}

export default General;
