import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdAddTask, MdListAlt } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
    const { handleSignOut } = useAuth();
    const navigate = useNavigate();

    const signOutHandler = () => {
        handleSignOut()
            .then(() => {
                navigate('/login')
            })
    }
    return (
        <div className="w-52 hidden lg:flex bg-gray-800 text-white min-h-screen flex-col">
            {/* Logo and Title */}
            <Link to={'/'} className="py-[14px] px-5 text-lg font-semibold text-[#FEC140] border-b border-gray-700">
                <h1>Tasque Workspace</h1>
            </Link>

            {/* Navigation Links */}
            <nav className="flex-1 mt-3 px-3">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/dashboard/add-task"
                            className={({ isActive }) =>
                                `flex items-center p-2 font-medium text-xs transition duration-200 rounded-sm ${isActive ? "bg-[#FEC140] text-gray-800" : "hover:bg-[#FEC140] hover:text-gray-800"
                                }`
                            }
                        >
                            <MdAddTask className="mr-3 text-sm" /> Add Task
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/manage-task"
                            className={({ isActive }) =>
                                `flex items-center p-2 font-medium text-xs transition duration-200 rounded-sm ${isActive ? "bg-[#FEC140] text-gray-800" : "hover:bg-[#FEC140] hover:text-gray-800"
                                }`
                            }
                        >
                            <MdListAlt className="mr-3 text-sm" /> Manage Task
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) =>
                                `flex items-center p-2 font-medium text-xs transition duration-200 rounded-sm ${isActive ? "bg-[#FEC140] text-gray-800" : "hover:bg-[#FEC140] hover:text-gray-800"
                                }`
                            }
                        >
                            <IoMdPerson className="mr-3 text-sm" /> Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Footer or any additional info */}
            <div className='border-t border-gray-700 px-3 pt-4'>
                <button onClick={signOutHandler}
                    className="flex items-center justify-center cursor-pointer w-full text-white p-2 font-medium text-left bg-red-500 hover:bg-red-600 text-xs transition duration-200 rounded-sm">
                    <RiLogoutCircleLine className="mr-2 text-sm" /> Logout
                </button>
                <div className="py-4 text-center text-xs text-gray-400 ">
                    <p>&copy; 2025 Tasque Workspace. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
