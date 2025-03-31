import { Button } from "@/components/ui/button";
import Body from "./Body";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardFooter from "./CardFooter";
import { useEffect, useState } from "react";
import { formSchema } from "@/utils/forms/forget-password-schema";
import { ProgressState } from "@/components/ui/progress-state";
import { EmailForm } from "@/components/auth/forms/email-form";
import { OTPForm } from "@/components/auth/forms/OTP-form";
import { ChangePassword } from "@/components/auth/forms/change-password";
import { Outlet, useLocation } from "react-router-dom";

const cardFooter = [
  {
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  },
  {
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

const steps = [
  "/auth/login/forget-password",
  "/auth/login/forget-password/OTP-confirmation",
  "/auth/login/forget-password/change-password",
];

function ForgetPassword() {
  const [contentCounter, setContentCounter] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const currentStepIndex = steps.indexOf(location.pathname);

    if (currentStepIndex !== -1) {
      setContentCounter(currentStepIndex);
    }
  }, [location.pathname]);

  const { title, description } = {
    title: "Reset your password easily.",
    description: "Enter your email, and we’ll help you reset your password.",
  };

  const { separator, footer } = cardFooter[contentCounter];

  return (
    <Body
      title={title}
      description={description}
      separator={separator}
      footer={footer}
      effect={contentCounter}
      beforeContent={
        <ProgressState max={steps.length} value={contentCounter} />
      }
    >
      <Outlet />
    </Body>
  );
}

export default ForgetPassword;
