import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Primary } from "@/components/ui/global";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function LoginForm({ form }) {
  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
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
        <div className="max-sm:flex-col justify-between gap-3 flex">
          <div className="items-top flex gap-3">
            <FormField
              control={form.control}
              name="agreedToTerms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      name="agreedToTerms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-secondary-foreground text-sm">
              I agree to <Primary>terms</Primary> and{" "}
              <Primary>privacy policy</Primary>.
            </p>
          </div>
          <Link
            className="text-secondary-foreground text-sm hover:underline -mb-4"
            to={`/auth/login/forget-password`}
          >
            Forget Password?
          </Link>
        </div>
      </div>
    </Form>
  );
}
