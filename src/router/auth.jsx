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

export const auth = {
  path: "/",
  element: <AuthLayout />,
  // errorElement: <Error />,
  children: [
    {
      path: "/auth/signup",
      element: <SignUp />,
      // errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <FirstContent />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/auth/signup/password",
          element: <SecondContent />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/auth/signup/profile-picture",
          element: <ThirdContent />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/auth/signup/extra-data",
          element: <FourthContent />,
          // errorElement: <ErrorElement />,
        },
      ],
    },
    {
      path: "/auth/login",
      element: <LogIn />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/auth/login/forget-password",
      element: <ForgetPassword />,
      // errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <EmailForm />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/auth/login/forget-password/OTP-confirmation",
          element: <OTPForm />,
          // errorElement: <ErrorElement />,
        },
        {
          path: "/auth/login/forget-password/change-password",
          element: <ChangePassword />,
          // errorElement: <ErrorElement />,
        },
      ],
    },
  ],
};
