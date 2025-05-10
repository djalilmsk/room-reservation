import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/utils/redux/user";
import { defaults } from "@/utils/format/toast-styles";

export function useProfileMutation(path) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await customFetch.patch(`/user/${path}`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(login({ data: data.data.dataValues }));
    },
    onError: (error) => {
      toast.error("Some thing wrong happened", {
        styles: defaults,
      });
    },
  });

  return mutation;
}
