import { IoMdSettings, IoMdNotifications } from 'react-icons/io';
import { MdOutlineTask } from 'react-icons/md';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaTasks } from 'react-icons/fa';
const DashboardNavbar = () => {
    const { user } = useAuth();

    return (
        <div className=" bg-gray-800 text-white dark:bg-[#282834] w-full px-4 py-2">
            <div className="flex items-center justify-between">
                {/* Left Side: Dashboard Title with Icon */}
                <div className='flex items-center gap-2'>
                <FaTasks />
                    <p className="text-lg dark:text-white font-medium">
                        My Tasque Board
                    </p>
                </div>

                {/* Right Side: Icons and User Avatar */}
                <div className="flex justify-end items-center space-x-4">
                    {/* Notifications Icon */}
                    <Link to="/dashboard/notifications" title="Notifications">
                        <div className="bg-gray-200 dark:bg-[#3C3F47] px-2 py-[6px] rounded-md shadow-md cursor-pointer hover:bg-[#FEC140]">
                            <IoMdNotifications className="text-xl text-gray-600 dark:text-white" />
                        </div>
                    </Link>

                    {/* Settings Icon */}
                    <Link to="/dashboard/settings" title="Settings">
                        <div className="bg-gray-200 dark:bg-[#3C3F47] px-2 py-[6px] rounded-md shadow-md cursor-pointer hover:bg-[#FEC140]">
                            <IoMdSettings className="text-xl text-gray-600 dark:text-white" />
                        </div>
                    </Link>

                    {/* Tasks Icon */}
                    <Link to="/dashboard/tasks" title="Tasks">
                        <div className="bg-gray-200 dark:bg-[#3C3F47] px-2 py-[6px] rounded-md shadow-md cursor-pointer hover:bg-[#FEC140]">
                            <MdOutlineTask className="text-xl text-gray-600 dark:text-white" />
                        </div>
                    </Link>

                    {/* Logout Icon */}
                    <div title="Logout" className="bg-gray-200 dark:bg-[#3C3F47] px-2 py-[6px] rounded-md shadow-md cursor-pointer hover:bg-[#FEC140]">
                        <RiLogoutCircleLine className="text-xl text-gray-600 dark:text-white" />
                    </div>

                    {/* User Avatar */}
                    <div tabIndex={0} role="button" className="avatar">
                        <div className="cursor-pointer w-10 h-10 rounded-full bg-blue-800 p-[1px]">
                            <img
                                className="rounded-full object-cover"
                                alt="User"
                                src={user?.photoURL}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
