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

export function OTPForm({ form }) {
  return (
    <Form {...form}>
      <div className="space-y-4">
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
              <FormMessage className={'text-center'} />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
