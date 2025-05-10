import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { z } from "zod";
import { XCircle } from "lucide-react";
import { useProfileMutation } from "@/hooks/mutation/useProfileMutation";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { buttonLabel } from "@/components/ui/button-label";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/utils/redux/user";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";

// Assuming this is how your formSchema looks - adjust if different
const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export function SecurityForm() {
  const { data } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const url = `${data.id}/password`;
  const { mutate, isPending: isUpdating } = useProfileMutation(url);

  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await customFetch.delete("/user/me");
      return response.data;
    },
    onSuccess: () => {
      navigate("/", { replace: true });
      dispatch(logout());
      toast.success("Account deleted successfully!", {
        style: defaults,
      });
    },
    onError: (err) => {
      toast.error("Error deleting account", {
        style: defaults,
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        form.reset();
        toast.success("Password updated successfully!", {
          style: defaults,
        });
      },
      onError: (error) => {
        toast.error("Error updating password!", {
          style: defaults,
        });
      },
    });
  };

  const onError = () => {};

  const handleDelete = () => {
    deleteUser();
  };

  const isLoading = isUpdating || isDeleting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
        noValidate
      >
        <div className="space-y-6">
          <div>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid items-start gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {buttonLabel(isLoading, "Update Password")}
        </Button>

        <Separator />
      </form>
      <div className="w-full text-center">
        <Button
          className="text-destructive hover:text-destructive hover:bg-destructive/20"
          variant="ghost"
          onClick={handleDelete}
          disabled={isLoading}
        >
          <XCircle className="h-4 w-4" />
          Delete Account
        </Button>
      </div>
    </Form>
  );
}
