import { useSelector } from "react-redux";

export function useUser() {
  const { data: userData } = useSelector((state) => state.user);

  const [firstName = "", lastName = ""] = userData?.name?.split(" ") || [];
  const data = { ...userData, firstName, lastName };

  if (userData) return { data };

  return { data: undefined };
}
