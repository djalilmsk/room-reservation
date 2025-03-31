import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Body from "./Body";
import { FirstContent } from "@/components/auth/forms/signup-form";
import { SecondContent } from "@/components/auth/forms/password-form";
import { ThirdContent } from "@/components/auth/forms/image-form";
import { FourthContent } from "@/components/auth/forms/extra-data-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardFooter from "./CardFooter";
import { formSchema } from "@/utils/forms/signup-schema";

const stepConfig = [
  {
    buttonLabel: "Sign Up",
    title: "Create an account to get started!",
    description: "Smart reservations for modern workspaces.",
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  },
  {
    buttonLabel: "Next",
    title: "Create an account to get started!",
    description: "Smart reservations for modern workspaces.",
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  },
  {
    buttonLabel: "Next",
    title: "Create an account to get started!",
    description: "Smart reservations for modern workspaces.",
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  },
  {
    buttonLabel: "Create Account",
    title: "Tell us more about you.",
    description: "Smart reservations for modern workspaces.",
    separator: false,
    footer: { display: false, content: <CardFooter /> },
  },
];

function SignUp() {
  const [contentCounter, setContentCounter] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "djalil",
      lastName: "msk",
      email: "djalil.meskali@gmail.com",
      agreedToTerms: true,
      password: "123456789",
      confirmPassword: "123456789",
      image: null,
      userType: "Student",
      referralSource: "Online Ads",
    },
  });

  const content = [
    <FirstContent form={form} />,
    <SecondContent form={form} />,
    <ThirdContent form={form} />,
    <FourthContent form={form} />,
  ];

  const handleNext = async () => {
    const fieldsToValidate = {
      0: ["firstName", "lastName", "email", "agreedToTerms"],
      1: ["password", "confirmPassword"],
      2: [], // Ensure this is intentional
      3: ["userType", "referralSource"],
    }[contentCounter];
  
    const isValid = await form.trigger(fieldsToValidate);
  
    if (isValid) {
      if (contentCounter < content.length - 1) {
        setContentCounter((prev) => prev + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    } else {
      console.log("Validation failed:", form.formState.errors);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted successfully:", data);
  };

  const { buttonLabel, title, description, separator, footer } =
    stepConfig[contentCounter];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Body
        title={title}
        description={description}
        separator={separator}
        footer={footer}
        effect={contentCounter}
      >
        {content[contentCounter]}
        <Button
          className="w-full"
          type={contentCounter === content.length - 1 ? "submit" : "button"}
          onClick={handleNext}
        >
          {buttonLabel}
        </Button>
      </Body>
    </form>
  );
}

export default SignUp;
