import { Link } from "react-router-dom";
import RoomCard from "./room-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@/utils";

function RoomsList() {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await customFetch.get("/rooms");
      return response.data.rooms;
    },
  });

  if (isLoading) return "loading";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rooms Management</h1>
        <Link to="/dashboard/rooms/new-room">
          <Button variant="ghost" className="">
            <Plus className="h-4 w-4" />
            <span className="mt-[3px] max-sm:hidden">New Room</span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {rooms?.length ? (
          rooms.map((room, index) => (
            <Link key={index} to={`/dashboard/rooms/${room.id}`}>
              <RoomCard data={room} />
              {/* {room.name} */}
            </Link>
          ))
        ) : (
          <div className="text-secondary-foreground col-span-2 flex items-center justify-center p-15">
            no rooms
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomsList;
