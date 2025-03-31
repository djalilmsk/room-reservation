import Logo from "@/assets/Logo.svg";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean)[1];

  const link = {
    login: {
      label: "Sign Up",
      to: "signup",
    },
    signup: {
      label: "Log In",
      to: "login",
    },
  }[pathSegments];

  return (
    <div className="px-6 md:px-10">
      <div className="flex w-full items-center justify-between py-4 max-md:border-b-1 xl:py-5">
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="h-8 md:h-10" />
        </Link>

        <div className="hidden space-x-3 md:flex">
          <Link to={`auth/${link.to}`}>
            <Button className="text-primary" variant="link">
              {link.label}
            </Button>
          </Link>
          <Link to={"/"}>
            <Button>Continue as Guest</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Link to={`/`}>
            <Button className="text-primary" variant="link">
              Skip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
