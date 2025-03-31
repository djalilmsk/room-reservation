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
import { formSchema } from "@/utils/forms/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BriefcaseBusiness,
  Building2,
  ChartBarIcon,
  GraduationCap,
  HandshakeIcon,
  Laptop,
  MicVocal,
  MoreHorizontal,
  PanelsTopLeft,
  Search,
  Smartphone,
  Store,
  Tv,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const extraDataSchema = formSchema.pick({
  userType: true,
  referralSource: true,
});

function CustomSelect({ control, selfSelection, title, name = "" }) {
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

export function FourthContent() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(extraDataSchema),
    defaultValues: {
      userType: "Student",
      referralSource: "Online Ads",
    },
  });

  const selfSelection = [
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

  const roomSelection = [
    { label: "Social Media", icon: Smartphone },
    { label: "Search Engine", icon: Search },
    { label: "Tech Blogs or Reviews", icon: PanelsTopLeft },
    { label: "Online Ads", icon: Tv },
    { label: "Events or Webinars", icon: MicVocal },
    { label: "App Store or Marketplace", icon: Store },
    { label: "Company Referral", icon: Building2 },
    { label: "Other", icon: MoreHorizontal },
  ];

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    navigate("/auth/signup/extra-data");
  };

  const onError = (errors) => {
    console.error("Form errors:", errors);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
        <CustomSelect
          control={form.control}
          selfSelection={selfSelection}
          title={"How would you describe yourself?"}
          name="userType"
        />
        <CustomSelect
          control={form.control}
          selfSelection={roomSelection}
          title={"How did you find out about ROOM?"}
          name="referralSource"
        />
        <Button
          className="w-full mt-4"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Processing..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
