import RoomCard from "@/pages/dashboard/rooms/room-card";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "react-day-picker";
import { Link, useSearchParams } from "react-router-dom";
import RoomsLoader from "./RoomsLoader";

function RoomsList({ status = "" }) {
  const queryParams = new URLSearchParams();
  const [searchParams] = useSearchParams();

  const startTime = searchParams.get("start_time");
  const endTime = searchParams.get("end_time");
  const search = searchParams.get("search");
  const capacity = searchParams.get("capacity");

  if (search) queryParams.append("search", search);
  if (capacity) queryParams.append("capacity", capacity);
  if (startTime) queryParams.append("start_time", startTime);
  if (endTime) queryParams.append("end_time", endTime);

  const { data: rooms, isLoading } = useQuery({
    queryKey: [`rooms ${status}`, queryParams.toString()],
    queryFn: async () => {
      const response = await customFetch.get(
        `/rooms/${status}?${queryParams.toString()}`,
      );
      return response.data.data;
    },
  });

  if (isLoading) return <RoomsLoader />;

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
