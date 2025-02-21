import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from 'react-hot-toast';
import useAuth from "../hooks/useAuth";
const MainLayout = () => {
    const {user} = useAuth();
    return (
        <div className="font-lato">
            {user && <div className="h-[64px]"><Navbar></Navbar></div>}
            <Outlet></Outlet>
            <Toaster />
        </div>
    );
};

export default MainLayout;