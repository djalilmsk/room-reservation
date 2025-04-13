import RoomForm from "./room-form";

function CreateRoom() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Create New Room</h1>
      <RoomForm />
    </div>
  );
}

export default CreateRoom;
