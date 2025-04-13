import { Button } from "@/components/ui/button";
import Body from "./Body";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardFooter from "./CardFooter";
import { LoginForm } from "@/components/auth/forms/login-form";
import { formSchema } from "@/utils/forms/login-schema";
import { useDispatch } from "react-redux";
import { login } from "@/utils/redux/user";
import { useNavigate } from "react-router-dom";

const { buttonLabel, title, description, separator, footer } = {
  buttonLabel: "Log In",
  title: "Log in to manage your reservations!",
  description: "Smart reservations for modern workspaces.",
  separator: true,
  footer: { display: true, content: <CardFooter /> },
};

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "djalil.meskali@gmail.com",
      password: "djalilmsk123",
      agreedToTerms: true,
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted successfully:", data);
    dispatch(login({ data: data, token: "" }));
    navigate("/");
  };

  const onError = (errors) => {
    console.error("Form errors:", errors);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
      <Body
        title={title}
        description={description}
        separator={separator}
        footer={footer}
      >
        <LoginForm form={form} />
        <Button className="w-full" type="submit">
          {buttonLabel}
        </Button>
      </Body>
    </form>
  );
}

export default LogIn;
