import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from 'react-hot-toast';
const MainLayout = () => {
    return (
        <div className="font-lato">
            <div className="h-[64px]"><Navbar></Navbar></div>
            <Outlet></Outlet>
            <Toaster />
        </div>
    );
};

export default MainLayout;