import { useNavigate, useParams } from "react-router-dom";
import RoomForm from "./room-form";
import { customFetch } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";

function EditRoom() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const {
    data: room,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const response = await customFetch.get(`/rooms/${id}`);
      return response.data.room;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await customFetch.patch(`/rooms/${id}`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.setQueryData(["room", id], data.room);

      toast.success("Room updated successfully!", {
        style: defaults,
      });

      navigate(`/dashboard/rooms/${id}`);
    },
    onError: (err) => {
      console.error("Error creating room:", err.response?.data || err.message);
      toast.error("Failed to update room.", {
        style: defaults,
      });
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

  if (!room) {
    return <div>Room not found!</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Update Room</h1>
      <RoomForm
        defaultValues={room}
        onSubmit={onSubmit}
        isLoading={isLoading || isPending}
      />
    </div>
  );
}

export default EditRoom;
