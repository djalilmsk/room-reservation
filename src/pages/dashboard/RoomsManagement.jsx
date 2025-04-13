import { Outlet } from "react-router-dom";

function RoomsManagement() {
  return (
    <div className="space-y-8">
      <Outlet />
    </div>
  );
}

export default RoomsManagement;
