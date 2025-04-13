import { Outlet } from "react-router-dom";

function BookingManagement() {
  return (
    <div className="space-y-8">
      <Outlet />
    </div>
  );
}

export default BookingManagement;
