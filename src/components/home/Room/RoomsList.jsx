import RoomCard from "@/pages/dashboard/rooms/room-card";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "react-day-picker";
import { Link } from "react-router-dom";

function RoomsList({ status = "" }) {
  const { data: rooms, isLoading } = useQuery({
    queryKey: [`rooms ${status}`],
    queryFn: async () => {
      const response = await customFetch.get(`/rooms/${status}`);
      console.log(response);
      return response.data.data;
    },
  });

  if (isLoading) return "loading";

  return (
    <div className="space-y-5">
      <div
        className={rooms?.length && "grid gap-3 md:grid-cols-2 lg:grid-cols-3"}
      >
        {rooms?.length ? (
          rooms.map((room, index) => (
            <Link key={index} to={`/rooms/${room.id}`}>
              <RoomCard data={room} />
            </Link>
          ))
        ) : (
          <div className="text-secondary-foreground col-span-2 flex w-full items-center justify-center p-15">
            no rooms
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomsList;
