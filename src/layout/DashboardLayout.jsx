
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";


const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      <Sidebar />

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1">
        {/* Header */}
        <DashboardNavbar></DashboardNavbar>

        {/* Dynamic Content (Outlet) */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
