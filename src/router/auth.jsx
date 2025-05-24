import AuthLayout from "../pages/AuthLayout";
import SignUp from "../pages/auth/SignUp";
import LogIn from "../pages/auth/LogIn";
import ForgetPassword from "../pages/auth/ForgetPassword";
import { FirstContent } from "../components/auth/forms/signup-form";
import { SecondContent } from "../components/auth/forms/password-form";
import { ThirdContent } from "../components/auth/forms/image-form";
import { FourthContent } from "../components/auth/forms/extra-data-form";
import { EmailForm } from "../components/auth/forms/email-form";
import { OTPForm } from "../components/auth/forms/OTP-form";
import { ChangePassword } from "../components/auth/forms/change-password";
import RouteProtection from "./authentication/route-protection";
import ContinueWithGoogle from "@/pages/auth/ContinueWithGoogle";
import ErrorBoundary from "@/error/error-boundary";

export const auth = {
  path: "/",
  element: (
    <RouteProtection permission="guest">
      <AuthLayout />
    </RouteProtection>
  ),
  errorElement: <ErrorBoundary />,
  children: [
    {
      path: "/auth/signup",
      element: <SignUp />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <FirstContent />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/auth/signup/password",
          element: <SecondContent />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/auth/signup/profile-picture",
          element: <ThirdContent />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/auth/signup/extra-data",
          element: <FourthContent />,
          errorElement: <ErrorBoundary />,
        },
      ],
    },
    {
      path: "/auth/login",
      element: <LogIn />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/auth/login/forget-password",
      element: <ForgetPassword />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <EmailForm />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/auth/login/forget-password/OTP-confirmation",
          element: <OTPForm />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/auth/login/forget-password/change-password",
          element: <ChangePassword />,
          errorElement: <ErrorBoundary />,
        },
      ],
    },
    {
      path: "/auth/login/continue-with-google",
      element: <ContinueWithGoogle />,
      errorElement: <ErrorBoundary />,
    },
  ],
};
