
import Sidebar from "../components/Sidebar";

import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import { Toaster } from "react-hot-toast";


const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen lg:flex bg-white">
      <div className="w-52"><Sidebar /></div>

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="h-[52px] md:h-[56px]"><DashboardNavbar></DashboardNavbar></div>

        {/* Dynamic Content (Outlet) */}
        <div
          className="min-h-[calc(100vh-56px)] bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/Simple Shiny.svg')" }}
        >
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
