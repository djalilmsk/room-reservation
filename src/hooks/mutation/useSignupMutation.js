import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { useDispatch } from "react-redux";
import { clearData } from "@/utils/redux/form-cache";
import { useNavigate } from "react-router-dom";
import { login } from "@/utils/redux/user";

export function useSignupMutation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      console.log("Mutation triggered with data:", formData);
      const response = await customFetch.post("/auth/signup", formData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Mutation success with data:", data);
      navigate("/");
      dispatch(clearData());
      dispatch(login(data));
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}
