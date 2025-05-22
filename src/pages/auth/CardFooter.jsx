import { Button } from "@/components/ui/button";
import { Primary } from "@/components/ui/global";

import google from "@/assets/google.svg";
import { Link, useLocation } from "react-router-dom";

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
          <Link
            className="w-full"
            to={
              "https://meeting-room-reservatiom-sys.onrender.com/api/v1/auth/google"
            }
          >
            <Button variant="secondary" type="button" className="w-full">
              <img src={google} alt="google icon" className="w-5" />
              Continue with Google
            </Button>
          </Link>

          <p className="text-secondary-foreground text-sm">
            {text} <Primary link={`/auth/${to}`}>{link}</Primary>.
          </p>
        </>
      )}
    </>
  );
}

export default CardFooter;
