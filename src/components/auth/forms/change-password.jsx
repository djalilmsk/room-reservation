import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "@/utils/forms/forget-password-schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { useForgetPassword } from "@/pages/auth/ForgetPassword";
import { buttonLabel } from "@/components/ui/button-label";
import { useDispatch } from "react-redux";
import { login } from "@/utils/redux/user";
import toast from "react-hot-toast";

const passwordSchema = formSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function ChangePassword({ label = null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordStrength, setPasswordStrength] = useState("weak");

  const { email } = useForgetPassword();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await customFetch.post("/auth/reset-password", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
      dispatch(login({ data: data.user }));
      toast.success("Password changed successfully!", {
        style: defaults,
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error("An error occurred. Please try again.", {
        style: defaults,
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "djalilmsk123",
      confirmPassword: "djalilmsk123",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);

    const postData = {
      newPassword: data.password,
      ...email,
    };

    mutate(postData);
  };

  const onError = (errors) => {
    console.error("Form errors:", errors);
  };

  const handleChange = (value) => {
    let strength;
    if (value.length < 8) {
      strength = "weak";
    } else if (
      !/[A-Z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[@#$%^&*!]/.test(value)
    ) {
      strength = "medium";
    } else {
      strength = "strong";
    }
    setPasswordStrength(strength);
  };

  const passwordValue = form.watch("password");

  useEffect(() => {
    if (passwordValue) {
      handleChange(passwordValue);
    }
  }, [passwordValue]);

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />{" "}
              {/* This will show the "Passwords don't match" error */}
            </FormItem>
          )}
        />
        <div className="items-top flex flex-col gap-1">
          <p className="text-secondary-foreground text-xs">
            Your password is{" "}
            <span
              className={
                {
                  weak: "text-destructive",
                  medium: "text-[#fbbc05]",
                  strong: "text-[#34a853]",
                }[passwordStrength]
              }
            >
              {passwordStrength}
            </span>
          </p>
          <div className="flex w-full justify-between gap-2">
            <span className="bg-primary h-1 w-full rounded-full"></span>
            <span
              className={`h-1 w-full rounded-full ${
                passwordStrength === "weak" ? "bg-secondary" : "bg-primary"
              }`}
            ></span>
            <span
              className={`h-1 w-full rounded-full ${
                passwordStrength === "strong" ? "bg-primary" : "bg-secondary"
              }`}
            ></span>
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={isPending}>
          {buttonLabel(isPending, "Change Password")}
        </Button>
      </form>
    </Form>
  );
}
