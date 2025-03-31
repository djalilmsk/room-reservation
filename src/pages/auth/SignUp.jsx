import { useState, useEffect } from "react";
import Body from "./Body";
import CardFooter from "./CardFooter";
import { Outlet, useLocation } from "react-router-dom";

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
