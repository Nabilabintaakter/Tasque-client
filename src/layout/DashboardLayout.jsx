
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
        <div
          className="h-[calc(100vh-56px)] bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/Simple Shiny.svg')" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
