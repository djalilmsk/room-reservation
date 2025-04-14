import axios from "axios";

const url = "http://localhost:3000/api/v1/";

export const customFetch = axios.create({
  baseURL: url,
});

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
