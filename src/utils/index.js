import axios from "axios";
import { io } from "socket.io-client";

const url = "https://meeting-room-reservatiom-sys.onrender.com/api/v1/";

export const customFetch = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const socket = io.connect(
  "https://meeting-room-reservatiom-sys.onrender.com",
  {
    autoConnect: true,
    withCredentials: true,
    transports: ["websocket"],
  },
);

export const localFetch = (image) => {
  return {
    queryKey: ["restoreImage", image],
    queryFn: async () => {
      if (!image) return null;
      const response = await axios.get(image.url, { responseType: "blob" });
      const blob = response.data;
      const file = new File([blob], image.name, { type: blob.type });
      return file;
    },
  };
};
