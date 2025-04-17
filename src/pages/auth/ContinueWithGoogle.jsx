import { useQuery } from "@tanstack/react-query";
import LogIn from "./LogIn";
import { customFetch } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/utils/redux/user";

function ContinueWithGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useQuery({
    queryFn: async () => {
      const response = await customFetch.get("/user/me");
      return response.data.data;
    },
  });

  if (isError) return <>Error</>;
  if (isLoading) return <>Loading</>;

  if (data) {
    dispatch(login({ data: data }));
    navigate("/");
  }

  return <LogIn />;
}

export default ContinueWithGoogle;
