import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
