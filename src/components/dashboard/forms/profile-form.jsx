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
import { formSchema } from "@/utils/forms/update-profile-schema";
import { useUser } from "@/hooks/useUser";
import { Separator } from "@/components/ui/separator";
import {
  roomSelection,
  selfSelection,
} from "@/components/auth/forms/extra-data-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useProfileMutation } from "@/hooks/mutation/useProfileMutation";
import { buttonLabel } from "@/components/ui/button-label";
import { useDispatch } from "react-redux";
import { login } from "@/utils/redux/user";

const profileSchema = formSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  profession: true,
  referral_source: true,
});

function CustomSelect({ control, selfSelection, title, name = "" }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm font-normal">{title}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                {selfSelection.map(({ label, icon }, index) => (
                  <SelectItem key={index} value={label}>
                    {React.createElement(icon, {
                      className: "text-secondary-foreground mr-2",
                    })}
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ProfileForm() {
  const { data } = useUser();
  const dispatch = useDispatch();
  const { firstName, lastName, email, profession, referral_source, id } = data;
  const { mutate, isPending } = useProfileMutation(id);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      profession: profession,
      referral_source: referral_source,
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);

    const formData = new FormData();
    let hasChanges = false;

    if (data.firstName !== firstName || data.lastName !== lastName) {
      formData.append("name", `${data.firstName} ${data.lastName}`);
      hasChanges = true;
    }

    if (data.email !== email) {
      formData.append("email", data.email);
      hasChanges = true;
    }

    if (data.profession !== profession) {
      formData.append("profession", data.profession);
      hasChanges = true;
    }

    if (data.referral_source !== referral_source) {
      formData.append("referral_source", data.referral_source);
      hasChanges = true;
    }

    if (hasChanges)
      mutate(formData, {
        onSuccess: (data) => {
          console.log("Mutation success with data:", data);
          // navigate("/");
          dispatch(login({ data: data.data.dataValues }));
        },
      });
  };

  const onError = (errors) => {
    console.error("Form errors:", errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-10"
      >
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-5 md:gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm font-normal">
                    First Name
                  </FormLabel>
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
                  <FormLabel className="text-sm font-normal">
                    Last Name
                  </FormLabel>
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
                <FormLabel className="text-sm font-normal">
                  Email Address
                </FormLabel>
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
        </div>
        <Separator />
        <div className="space-y-5">
          <CustomSelect
            control={form.control}
            selfSelection={selfSelection}
            title={"How would you describe yourself?"}
            name="profession"
          />
          <CustomSelect
            control={form.control}
            selfSelection={roomSelection}
            title={"How did you find out about ROOM?"}
            name="referral_source"
          />
        </div>
        <Button className="w-full" disabled={isPending} type="submit">
          {buttonLabel(isPending, "Submit Changes")}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
