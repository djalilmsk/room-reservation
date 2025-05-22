import { useQuery } from "@tanstack/react-query";
import LogIn from "./LogIn";
import { customFetch } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/utils/redux/user";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";
import { Loader } from "lucide-react";

function ContinueWithGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useQuery({
    queryFn: async () => {
      const response = await customFetch.get("/user/me");
      return response.data.data;
    },
  });

  if (isError) {
    toast.error("Something went wrong", { style: defaults });
    return navigate("/auth/signup");
  }

  if (isLoading)
    return (
      <div className="absolute top-40 left-1/2 flex w-dvw -translate-x-1/2 items-start justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader className="size-10 animate-spin" />
          <div className="text-2xl">Loading</div>
        </div>
      </div>
    );

  if (data) {
    dispatch(login({ data: data }));
    navigate("/");
  }

  return <LogIn />;
}

export default ContinueWithGoogle;
