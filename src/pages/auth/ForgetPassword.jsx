import { Button } from "@/components/ui/button";
import Body from "./Body";
import CardFooter from "./CardFooter";
import { createContext, useContext, useEffect, useState } from "react";
import { ProgressState } from "@/components/ui/progress-state";
import { Outlet, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { defaults } from "@/utils/format/toast-styles";
import toast from "react-hot-toast";

const steps = [
  "/auth/login/forget-password",
  "/auth/login/forget-password/OTP-confirmation",
  "/auth/login/forget-password/change-password",
];

const ForgetPasswordContext = createContext();

function ForgetPassword() {
  const [contentCounter, setContentCounter] = useState(0);
  const location = useLocation();

  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await customFetch.post("/auth/forgot-password", data);
      return response.data;
    },
    onError: () => {
      toast.error("Some thing wrong happened", {
        styles: defaults,
      });
    },
  });

  const handleResent = () => {
    mutate(email);
  };

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
            <Button
              variant="link"
              type="button"
              onClick={handleResent}
              className={"h-0 px-0"}
            >
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
        // content: (
        //   <CardFooter>
        //     <Button variant="link" type="button" className={"h-0"}>
        //       Skip & Login
        //     </Button>
        //   </CardFooter>
        // ),
      },
    },
  ];

  const { separator, footer } = cardFooter[contentCounter];

  return (
    <ForgetPasswordContext.Provider
      value={{ email, setEmail, mutate, isPending }}
    >
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
    </ForgetPasswordContext.Provider>
  );
}

export default ForgetPassword;

export const useForgetPassword = () => useContext(ForgetPasswordContext);
