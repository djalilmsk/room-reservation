import { Link } from "react-router-dom";
import { Separator } from "./separator";
import clsx from "clsx";

const Primary = ({ link, children, className }) => {
  return (
    <Link to={link} className={clsx("text-primary hover:underline" , className)}>
      {children}
    </Link>
  );
};

const OrSeparator = ({ className }) => {
  return (
    <div className={clsx("relative", className)}>
      <p className="text-secondary-foreground bg-card max-md:bg-background absolute top-1/2 left-1/2 -translate-1/2 px-2 text-sm">
        or
      </p>
      <Separator />
    </div>
  );
};

export { Primary, OrSeparator };
