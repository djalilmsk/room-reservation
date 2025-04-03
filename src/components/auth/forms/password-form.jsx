import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "@/utils/forms/signup-schema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "@/utils/redux/form-cache";

const passwordSchema = formSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function SecondContent({ label = null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.formCache.data);

  useEffect(() => {
    const { firstName, lastName, email, agreedToTerms } = data;

    if (!(firstName && lastName && email && agreedToTerms)) {
      navigate("/auth/signup", { replace: true });
    }
  }, [data]);

  const { password = "", confirmPassword = "" } = data;

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: password,
      confirmPassword: confirmPassword,
    },
  });

  const [passwordStrength, setPasswordStrength] = useState("weak");

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

  const onSubmit = (data) => {
    dispatch(setData(data));
    console.log("Form submitted with data:", data);
    navigate("/auth/signup/profile-picture");
  };

  const onError = (errors) => {
    console.error("Form errors:", errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4"
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
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e.target.value);
                  }}
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
              <FormMessage />
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
        <Button className="w-full" type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
}
