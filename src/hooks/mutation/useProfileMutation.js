import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/utils/redux/user";

export function useProfileMutation(path) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      console.log("Mutation triggered with data:", formData);
      const response = await customFetch.patch(`/user/${path}`, formData);
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(login({ data: data.data.dataValues }));
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });

  return mutation;
}
