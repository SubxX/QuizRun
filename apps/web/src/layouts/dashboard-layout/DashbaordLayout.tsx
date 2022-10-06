import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="h-screen text-white flex overflow-y-auto">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
