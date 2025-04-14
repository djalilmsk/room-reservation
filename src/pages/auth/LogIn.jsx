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
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { useLoginMutation } from "@/hooks/mutation/useLoginMutation";
import { Loader } from "lucide-react";

const { buttonLabel, title, description, separator, footer } = {
  buttonLabel: "Log In",
  title: "Log in to manage your reservations!",
  description: "Smart reservations for modern workspaces.",
  separator: true,
  footer: { display: true, content: <CardFooter /> },
};

const loginSchema = formSchema.pick({
  email: true,
  password: true,
});

function LogIn() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "djalil.meskali@gmail.com",
      password: "djalilmsk123",
    },
  });

  const { mutate, isPending } = useLoginMutation(form);

  const onSubmit = (data) => {
    mutate(data);
  };

  const onError = (errors) => {
    console.error("Form errors:", errors);
  };

  const SubmitButton = () => (
    <Button disabled={isPending} className="w-full" type="submit">
      {isPending ? (
        <div className="flex items-center justify-center">
          <span className="mr-2 animate-spin">
            <Loader />
          </span>
          <span>Loading...</span>
        </div>
      ) : (
        buttonLabel
      )}
    </Button>
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
      <Body
        title={title}
        description={description}
        separator={separator}
        footer={footer}
        effect={1}
      >
        <LoginForm form={form} />
        <SubmitButton />
      </Body>
    </form>
  );
}

export default LogIn;
