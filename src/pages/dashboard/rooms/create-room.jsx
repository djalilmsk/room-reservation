import { useMutation, useQueryClient } from "@tanstack/react-query";
import RoomForm from "./room-form";
import { customFetch } from "@/utils";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await customFetch.post("/rooms", formData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
        refetchActive: true,
        refetchInactive: true,
      });

      navigate(`/dashboard/rooms/${data.finalRoom.id}`);
    },
    onError: (err) => {
      console.error("Error creating room:", err.response?.data || err.message);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("capacity", data.capacity);
    formData.append("pricing", data.pricing);
    formData.append("amenities", data.amenities);
    formData.append("type", data.type);
    formData.append("note", data.note);
    formData.append("description", data.description);
    formData.append("status", data.status);

    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    mutate(formData);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Create New Room</h1>
      <RoomForm onSubmit={onSubmit} isLoading={isPending} />
    </div>
  );
}

export default CreateRoom;
