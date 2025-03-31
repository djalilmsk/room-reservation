import { useState, useEffect } from "react";
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
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const stepConfig = [
  {
    title: "Create an account to get started!",
    description: "Smart reservations for modern workspaces.",
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  },
  {
    title: "Create an account to get started!",
    description: "Smart reservations for modern workspaces.",
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  },
  {
    title: "Create an account to get started!",
    description: "Smart reservations for modern workspaces.",
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  },
  {
    title: "Tell us more about you.",
    description: "Smart reservations for modern workspaces.",
    separator: false,
    footer: { display: false, content: <CardFooter /> },
  },
];

const steps = [
  "/auth/signup/",
  "/auth/signup/password",
  "/auth/signup/profile-picture",
  "/auth/signup/extra-data",
];

function SignUp() {
  const [contentCounter, setContentCounter] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const currentStepIndex = steps.indexOf(location.pathname);

    if (currentStepIndex !== -1) {
      setContentCounter(currentStepIndex);
    }
  }, [location.pathname]);

  const { title, description, separator, footer } = stepConfig[contentCounter];

  return (
    <Body
      title={title}
      description={description}
      separator={separator}
      footer={footer}
      effect={contentCounter}
    >
      <Outlet />
    </Body>
  );
}

export default SignUp;
