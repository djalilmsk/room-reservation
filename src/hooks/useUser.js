import { useSelector } from "react-redux";

export function useUser() {
  const { data, token } = useSelector((state) => state.user) || {
    data: undefined,
    token: undefined,
  };

  return { data, token };
}
