import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";

const AuthCard = ({ children, refVar }) => {
  return (
    <div className="relative md:p-10 2xl:p-20">
      <Card className="relative w-full overflow-hidden py-8 max-md:py-5 max-md:shadow-none md:w-lg md:px-5 lg:w-2xl">
        <div ref={refVar} className="flex flex-col gap-8">
          {children}
        </div>
      </Card>
    </div>
  );
};

const AuthCardHeader = ({ children, className }) => {
  return <CardHeader className={clsx(className)}>{children}</CardHeader>;
};

const AuthCardTitle = ({ children, className }) => {
  return (
    <CardTitle
      className={clsx("text-xl md:text-2xl lg:text-3xl", className)}
    >
      {children}
    </CardTitle>
  );
};

const AuthCardDescription = ({ children, className }) => {
  return (
    <CardDescription
      className={clsx("text-sm md:text-sm lg:text-base", className)}
    >
      {children}
    </CardDescription>
  );
};

const AuthCardContent = ({ children, className, refVar }) => {
  return (
    <CardContent ref={refVar} className={clsx("space-y-8", className)}>
      {children}
    </CardContent>
  );
};

const AuthCardFooter = ({ children, className }) => {
  return (
    <CardFooter className={clsx("flex-col space-y-8", className)}>
      {children}
    </CardFooter>
  );
};

export {
  AuthCard,
  AuthCardHeader,
  AuthCardTitle,
  AuthCardDescription,
  AuthCardContent,
  AuthCardFooter,
};
