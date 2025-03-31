import { Button } from "@/components/ui/button";
import Body from "./Body";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardFooter from "./CardFooter";
import { LoginForm } from "@/components/auth/forms/login-form";
import { formSchema } from "@/utils/forms/login-schema";

function LogIn() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "djalil.meskali@gmail.com",
      password: "djalilmsk123",
      agreedToTerms: true,
    },
  });

  const content = <LoginForm form={form} />;

  const handleNext = async () => {};

  const onSubmit = (data) => {
    console.log("Form submitted successfully:", data);
  };

  const { buttonLabel, title, description, separator, footer } = {
    buttonLabel: "Log In",
    title: "Log in to manage your reservations!",
    description: "Smart reservations for modern workspaces.",
    separator: true,
    footer: { display: true, content: <CardFooter /> },
  };

  return (
    <Body
      title={title}
      description={description}
      separator={separator}
      footer={footer}
    >
      {content}
      <Button className="w-full" onClick={handleNext}>
        {buttonLabel}
      </Button>
    </Body>
  );
}

export default LogIn;
