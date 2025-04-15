import { useMutation } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { login } from "@/utils/redux/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = (form) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      console.log(data)
      const response = await customFetch.post("/auth/login", data);

      // add reponce.data.tocken document.cookie() 
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data)
      dispatch(login({ data: data.data }));
      navigate("/");
    },
    onError: (error) => {
      if (error.status === 500) {
        alert("Internal Server Error");
        return;
      }
      form.setError("email", { type: "manual", message: "" });
      form.setError("password", {
        type: "manual",
        message: "Email or password is incorrect.",
      });
    },
  });
};
