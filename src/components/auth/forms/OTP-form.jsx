import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { formSchema } from "@/utils/forms/forget-password-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForgetPassword } from "@/pages/auth/ForgetPassword";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const otpSchema = formSchema.pick({
  OTP: true,
});

export function OTPForm() {
  const { isPending: isResending, email } = useForgetPassword();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      OTP: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await customFetch.post("/auth/verify-reset-code", data);
      return res.data;
    },
    onSuccess: () => {
      navigate("/auth/login/forget-password/change-password");
    },
    onError: () => {
      form.setError("OTP", { type: "manual", message: "Check your code" });
    },
  });

  const isSubmitting = isResending || isPending;
  const buttonLabel = {
    true: (
      <div className="flex gap-2">
        <Loader className="animate-spin" /> <span>Loading...</span>
      </div>
    ),
    false: "Next",
  }[isSubmitting];

  const onSubmit = (data) => {
    const postData = {
      ...email,
      code: data.OTP,
    };
    mutate(postData);
  };

  const onError = () => {};

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <FormField
          control={form.control}
          name="OTP"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                >
                  <InputOTPGroup className="flex w-full justify-center gap-3">
                    <InputOTPGroup>
                      <InputOTPSlot className="h-12 w-11" index={0} />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot className="h-12 w-11" index={1} />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot className="h-12 w-11" index={2} />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot className="h-12 w-11" index={3} />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot className="h-12 w-11" index={4} />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot className="h-12 w-11" index={5} />
                    </InputOTPGroup>
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className={"text-center"} />
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
