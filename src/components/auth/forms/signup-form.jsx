import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Primary } from "@/components/ui/global";
import { formSchema } from "@/utils/forms/signup-schema";
import { useDispatch, useSelector } from "react-redux";
import { setData, updateField } from "@/utils/redux/form-cache";

const signingSchema = formSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  agreedToTerms: true,
});

export function FirstContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cacheData = useSelector((state) => state.formCache.data);
  const {
    firstName = "",
    lastName = "",
    email = "",
    agreedToTerms = false,
  } = cacheData || null;

  const form = useForm({
    resolver: zodResolver(signingSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      agreedToTerms: agreedToTerms,
    },
  });

  const onSubmit = (data) => {
    dispatch(
      setData({
        fieldName: "firstName",
        newData: data.firstName.replace(/ /g, "_"),
      }),
    );
    dispatch(
      setData({
        fieldName: "lastName",
        newData: data.lastName.replace(/ /g, "_"),
      }),
    );
    dispatch(setData({ fieldName: "email", newData: data.email }));
    dispatch(
      setData({ fieldName: "agreedToTerms", newData: data.agreedToTerms }),
    );
    navigate("/auth/signup/password");
  };

  const onError = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <div className="flex justify-between gap-5 md:gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreedToTerms"
          render={({ field }) => (
            <FormItem>
              <div className="items-top flex gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to <Primary>terms</Primary> and{" "}
                    <Primary>privacy policy</Primary>.
                  </label>
                </div>
              </div>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
