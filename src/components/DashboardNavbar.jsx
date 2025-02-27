import { IoMdSettings } from 'react-icons/io';
import { MdAddTask, MdOutlineTask } from 'react-icons/md';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaHome, FaTasks } from 'react-icons/fa';
import { useState } from 'react';

const DashboardNavbar = () => {
    const { user, handleSignOut } = useAuth();
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(false);

    const signOutHandler = () => {
        handleSignOut()
            .then(() => {
                navigate('/login')
            })
    };

    return (
        <div className="bg-gray-800 fixed z-50 lg:z-0 lg:static text-white px-2 md:px-4 py-2 w-full">

            <div className="flex items-center justify-between">
                {/* Left Side: Dashboard Title with Icon */}
                <div className='flex items-center gap-2'>
                    <FaTasks className='hidden md:block' />
                    <p className="text-base dark:text-white font-medium">
                        My Tasque Board
                    </p>
                </div>

                {/* Right Side: Icons and User Avatar */}
                <div className="flex justify-end items-center space-x-1 md:space-x-3">
                    {/* Home Icon */}
                    <NavLink
                        to="/"
                        title="Home"
                        className={({ isActive }) =>
                            `px-2 py-[6px] lg:hidden block rounded-sm shadow-md cursor-pointer transition-all duration-300 ease-in-out ${isActive ? " bg-[#FEC140] text-gray-800" : "bg-gray-200 hover:bg-[#FEC140] hover:text-gray-800"}`
                        }
                    >
                        <FaHome className="text-lg text-gray-600" />
                    </NavLink>
                    {/* Add Task icon */}
                    <NavLink
                        to="/dashboard/add-task"
                        title="Add Task"
                        className={({ isActive }) =>
                            `px-2 py-[6px] lg:hidden block rounded-sm shadow-md cursor-pointer transition-all duration-300 ease-in-out ${isActive ? " bg-[#FEC140] text-gray-800" : "bg-gray-200 hover:bg-[#FEC140] hover:text-gray-800"}`
                        }
                    >
                        <MdAddTask className="text-lg text-gray-600 " />
                    </NavLink>


                    {/* Tasks Icon */}
                    <NavLink
                        to="/dashboard/manage-task"
                        title="Manage Tasks"
                        className={({ isActive }) =>
                            `px-2 py-[6px] lg:hidden block rounded-sm shadow-md cursor-pointer transition-all duration-300 ease-in-out ${isActive ? "bg-[#FEC140] text-gray-800" : "bg-gray-200 hover:bg-[#FEC140] hover:text-gray-800"}`
                        }
                    >
                        <MdOutlineTask className="text-lg text-gray-600 " />
                    </NavLink>

                    {/* Profile Icon */}
                    <NavLink
                        to="/dashboard/profile"
                        title="Settings"
                        className={({ isActive }) =>
                            `px-2 py-[6px] lg:hidden block rounded-sm shadow-md cursor-pointer transition-all duration-300 ease-in-out ${isActive ? " bg-[#FEC140] text-gray-800" : "bg-gray-200 hover:bg-[#FEC140] hover:text-gray-800"}`
                        }
                    >
                        <IoMdSettings className="text-lg text-gray-600" />
                    </NavLink>

                    {/* Logout Icon */}
                    <div
                        onClick={signOutHandler}
                        title="Logout"
                        className="bg-red-200 lg:bg-gray-200 px-2 py-[6px] rounded-sm shadow-md cursor-pointer transition-all duration-300  ease-in-out hover:bg-red-600 lg:hover:bg-red-500 block lg:hidden"
                    >
                        <RiLogoutCircleLine className="text-lg text-red-600 lg:text-gray-600  hover:text-white" />
                    </div>
                    <div className='text-white hidden md:block'>
                        <h1 className='font-bold text-sm'>{user?.displayName}</h1>
                        <p className='text-xs'>{user?.email}</p>
                    </div>
                    {/* User Avatar with Hover Tooltip */}
                    <div
                        className="relative cursor-pointer"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <div className="avatar">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-800 p-[1px]">
                                <img className="rounded-full object-cover" alt="User" src={user?.photoURL} />
                            </div>
                        </div>

                        {/* Tooltip for User Name */}
                        {showTooltip && user?.displayName && (
                            <div className="absolute block md:hidden w-40 text-center px-5 py-3 top-[50px] font-medium right-1 bg-gray-800 text-[#FEC140] text-sm rounded-md shadow-lg">
                                {user.displayName}
                            </div>
                        )}
                    </div>
                                        {/* Logout Icon */}
                                        <div
                        onClick={signOutHandler}
                        title="Logout"
                        className="bg-red-200 lg:bg-gray-200 px-2 py-[6px] rounded-sm shadow-md cursor-pointer transition-all duration-300  ease-in-out hover:bg-red-600 lg:hover:bg-red-500 hidden lg:block"
                    >
                        <RiLogoutCircleLine className="text-lg text-red-600 lg:text-gray-600  hover:text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
