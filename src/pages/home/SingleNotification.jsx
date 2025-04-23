import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function SingleNotification() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["notifications", id],
    queryFn: async () => {
      const res = await customFetch.get(`/notifications/${id}`);
      return res.data.notification;
    },
  });

  console.log(data);

  return <div></div>;
}

export default SingleNotification;
