import { Button } from "@/components/ui/button";
import Body from "./Body";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardFooter from "./CardFooter";
import { useState } from "react";
import { formSchema } from "@/utils/forms/forget-password-schema";
import { SecondContent } from "@/components/auth/forms/password-form";
import { ProgressState } from "@/components/ui/progress-state";
import { EmailForm } from "@/components/auth/forms/email-form";
import { OTPForm } from "@/components/auth/forms/OTP-form";
import { ChangePassword } from "@/components/auth/forms/change-password";

const cardFooter = [
  {
    buttonLabel: "Next",
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  },
  {
    buttonLabel: "Next",
    separator: false,
    footer: {
      display: true,
      content: (
        <CardFooter>
          Didn't receive the code?{" "}
          <Button variant="link" type="button" className={"h-0 px-0"}>
            Resend
          </Button>
          .
        </CardFooter>
      ),
    },
  },
  {
    buttonLabel: "Change Password",
    separator: false,
    footer: {
      display: true,
      content: (
        <CardFooter>
          <Button variant="link" type="button" className={"h-0"}>
            Skip & Login
          </Button>
        </CardFooter>
      ),
    },
  },
];

function ForgetPassword() {
  const [contentCounter, setContentCounter] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "djalil.meskali@gmail.com",
      OTP: "123456",
      password: "djalilmsk123",
      confirmPassword: "djalilmsk123",
    },
  });

  const content = [
    <EmailForm label={"Enter Your Email Address"} form={form} />,
    <OTPForm form={form} />,
    <ChangePassword label={"Enter Your New Password"} form={form} />,
  ];

  const handleNext = async () => {
    const fieldsToValidate = {
      0: ["email"],
      1: ["OTP"],
      2: ["password", "confirmPassword"],
    }[contentCounter];
    if (contentCounter === 0) fieldsToValidate.push("email");
    if (contentCounter === 1) fieldsToValidate.push("OTP");
    if (contentCounter === 2)
      fieldsToValidate.push("password", "confirmPassword");

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && contentCounter < content.length - 1) {
      setContentCounter(contentCounter + 1);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted successfully:", data);
  };

  const { title, description } = {
    title: "Reset your password easily.",
    description: "Enter your email, and we’ll help you reset your password.",
  };

  const { buttonLabel, separator, footer } = cardFooter[contentCounter];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Body
        title={title}
        description={description}
        separator={separator}
        footer={footer}
        beforeContent={
          <ProgressState max={content.length} value={contentCounter} />
        }
      >
        {content[contentCounter]}
        <Button
          className="w-full"
          onClick={contentCounter < content.length - 1 ? handleNext : undefined}
          type={"submit"}
        >
          {buttonLabel}
        </Button>
      </Body>
    </form>
  );
}

export default ForgetPassword;
