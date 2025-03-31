import { Button } from "@/components/ui/button";
import { Primary } from "@/components/ui/global";

import google from "@/assets/google.svg";
import { useLocation } from "react-router-dom";

const initialContent = {
  to: "#",
  link: "link",
  text: "text before link",
  exist: false,
};

function CardFooter({ children }) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean)[1];

  const { to, link, text } = {
    login: {
      text: "Don’t have an account?",
      link: "Sign Up",
      to: "signup",
    },
    signup: {
      text: "Already have an account?",
      link: "Log In",
      to: "login",
    },
  }[pathSegments];

  return (
    <>
      {children ? (
        <p className="text-secondary-foreground text-sm">{children}</p>
      ) : (
        <>
          <Button variant="secondary" className="w-full">
            <img src={google} alt="google icon" className="w-5" />
            Continue with Google
          </Button>
          <p className="text-secondary-foreground text-sm">
            {text} <Primary link={`/auth/${to}`}>{link}</Primary>.
          </p>
        </>
      )}
    </>
  );
}

export default CardFooter;
