import { Link, useNavigate, useParams } from "react-router-dom";
import RoomCard from "./room-card";
import { Edit, LucideOutdent, Star, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format/formatPrice";
import { formatStatus } from "@/utils/format/formatStatus";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { buttonLabel } from "@/components/ui/button-label";
import RoomDetails from "@/components/home/Room/RoomDetails";
import { defaults } from "@/utils/format/toast-styles";
import toast from "react-hot-toast";
import RoomBookings from "@/components/home/Room/RoomBookings";
import SingleRoomLoader from "@/components/home/Room/SingleRoomLoader";

function SingleRoom() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

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
    mutationFn: async (data) => {
      const response = await customFetch.delete(`/rooms/${id}`);
      return response.data.room;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
        refetchActive: true,
        refetchInactive: true,
      });
      // queryClient.removeQueries(["room", id]);

      toast.success("Room deleted successfully!", {
        style: defaults,
      });

      navigate("/dashboard/rooms");
    },
    onError: () => {
      toast.error("Failed to delete room.", {
        style: defaults,
      });
    },
  });

  if (isLoading)
    return (
      <SingleRoomLoader
        className="space-y-0 max-sm:-mt-18 -mt-13 sm:space-y-30 md:pt-0 lg:space-y-0"
        displayFooter={false}
      />
    );

  if (!room) {
    return <div>Room not found!</div>;
  }

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="space-y-5">
      <RoomDetails {...room}>
        <div className="flex w-full justify-end">
          <div className="space-x-3 max-lg:w-full max-lg:space-y-3">
            <Button
              className="max-lg:w-full"
              onClick={() => navigate(`/dashboard/rooms/edit-room/${id}`)}
              disabled={isPending}
            >
              <Edit className="h-4 w-4" />
              Edit Room
            </Button>

            <Button
              variant="none"
              className="hover:text-destructive text-destructive hover:bg-destructive/20 max-lg:w-full"
              onClick={handleDelete}
              disabled={isPending}
            >
              {buttonLabel(
                isPending,
                <>
                  <X className="h-4 w-4" />
                  Delete
                </>,
              )}
            </Button>
          </div>
        </div>
      </RoomDetails>
      <RoomBookings />
    </div>
  );
}

export default SingleRoom;
