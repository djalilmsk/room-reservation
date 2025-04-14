import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customFetch, localFetch } from "@/utils";
import { formSchema } from "@/utils/forms/signup-schema";
import { clearData, setData } from "@/utils/redux/form-cache";
import { login } from "@/utils/redux/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  BriefcaseBusiness,
  Building2,
  ChartBarIcon,
  GraduationCap,
  HandshakeIcon,
  Laptop,
  Loader,
  MicVocal,
  MoreHorizontal,
  PanelsTopLeft,
  Search,
  Smartphone,
  Store,
  Tv,
  UsersIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/hooks/mutation/useSignupMutation"; // Adjust the import path as needed

const extraDataSchema = formSchema.pick({
  profession: true,
  referral_source: true,
});

export const selfSelection = [
  { label: "Student", icon: GraduationCap },
  { label: "Freelancers/Consultants", icon: BriefcaseBusiness },
  { label: "Event Organizers", icon: MicVocal },
  { label: "Tech Support Teams", icon: Laptop },
  { label: "Researchers/Academics", icon: Search },
  { label: "Employees", icon: UsersIcon },
  { label: "Managers/Supervisors", icon: ChartBarIcon },
  { label: "HR Representatives", icon: HandshakeIcon },
  { label: "Other", icon: MoreHorizontal },
];

export const roomSelection = [
  { label: "Social Media", icon: Smartphone },
  { label: "Search Engine", icon: Search },
  { label: "Tech Blogs or Reviews", icon: PanelsTopLeft },
  { label: "Online Ads", icon: Tv },
  { label: "Events or Webinars", icon: MicVocal },
  { label: "App Store or Marketplace", icon: Store },
  { label: "Company Referral", icon: Building2 },
  { label: "Other", icon: MoreHorizontal },
];

function CustomSelect({ control, selfSelection, title, name, disabled }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-secondary-foreground text-lg font-semibold">
            {title}
          </FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                {selfSelection.map(({ label, icon }, index) => (
                  <SelectItem key={index} value={label}>
                    {React.createElement(icon, {
                      className: "text-secondary-foreground mr-2 inline-block",
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

export function FourthContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cacheData = useSelector((state) => state.formCache.data);
  const { image } = cacheData || {};

  const { data: imageFile, isLoading: imageLoading } = useQuery(
    localFetch(image),
  );

  const { mutate, isPending } = useSignupMutation();
  const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);

  useEffect(() => {
    const {
      firstName,
      lastName,
      email,
      agreedToTerms,
      password,
      confirmPassword,
    } = cacheData;

    if (!(firstName && lastName && email && agreedToTerms)) {
      navigate("/auth/signup", { replace: true });
    }

    if (!(password && confirmPassword)) {
      navigate("/auth/signup/password", { replace: true });
    }
  }, [cacheData, navigate]);

  const { profession = "", referral_source = "" } = cacheData;

  const form = useForm({
    resolver: zodResolver(extraDataSchema),
    defaultValues: {
      profession,
      referral_source,
    },
  });

  const onSubmit = async (data) => {
    setIsFormSubmitting(true);
    try {
      dispatch(setData({ fieldName: "profession", newData: data.profession }));
      dispatch(
        setData({
          fieldName: "referral_source",
          newData: data.referral_source,
        }),
      );

      const formData = new FormData();
      formData.append("name", `${cacheData.firstName} ${cacheData.lastName}`);
      formData.append("email", cacheData.email);
      formData.append("password", cacheData.password);
      if (imageFile) formData.append("image", imageFile);
      formData.append("profession", data.profession);
      formData.append("referral_source", data.referral_source);

      await mutate(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const onError = (errors) => {
    console.error("Form errors:", errors);
    setIsFormSubmitting(false);
  };

  const isLoading = isFormSubmitting || isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <CustomSelect
          control={form.control}
          selfSelection={selfSelection}
          title="How would you describe yourself?"
          name="profession"
          disabled={isLoading}
        />
        <CustomSelect
          control={form.control}
          selfSelection={roomSelection}
          title="How did you find out about ROOM?"
          name="referral_source"
          disabled={isLoading}
        />
        <Button className="mt-4 w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <span className="mr-2 animate-spin">
                <Loader />
              </span>
              <span>Loading...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
