import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { useDispatch } from "react-redux";
import { clearData } from "@/utils/redux/form-cache";
import { useNavigate } from "react-router-dom";
import { login } from "@/utils/redux/user";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";

export function useSignupMutation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await customFetch.post("/auth/signup", formData);
      return response.data;
    },
    onSuccess: (data) => {
      navigate("/");
      dispatch(clearData());
      dispatch(login(data));
    },
    onError: (error) => {
      toast.error("Some thing wrong happened", {
        styles: defaults,
      });
    },
  });

  return mutation;
}
