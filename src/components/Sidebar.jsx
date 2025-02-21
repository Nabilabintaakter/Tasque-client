import { Link } from 'react-router-dom';
import { MdAddTask, MdListAlt } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
            {/* Logo and Title */}
            <Link to={'/'} className="py-3 px-5 text-lg font-semibold text-[#FEC140] border-b border-gray-700">
                <h1>Tasque Workspace</h1>
            </Link>

            {/* Navigation Links */}
            <nav className="flex-1 mt-[10px] px-3">
                <ul className='space-y-2'>
                    <li>
                        <Link 
                            to="/dashboard" 
                            className="flex items-center p-2 font-medium hover:bg-[#FEC140] hover:text-gray-800 transition duration-200 rounded-lg">
                            <MdAddTask className="mr-3 text-xl" /> Add Task
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/tasks/todo" 
                            className="flex items-center p-2 font-medium hover:bg-[#FEC140] hover:text-gray-800 transition duration-200 rounded-lg">
                            <MdListAlt className="mr-3 text-xl" /> Manage Task
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/settings" 
                            className="flex items-center p-2 font-medium hover:bg-[#FEC140] hover:text-gray-800 transition duration-200 rounded-lg">
                            <IoMdPerson className="mr-3 text-xl" /> Profile
                        </Link>
                    </li>
                    <li>
                        <button 
                            className="flex items-center w-full p-2 font-medium text-left hover:bg-[#FEC140] hover:text-gray-800 transition duration-200 rounded-lg">
                            <RiLogoutCircleLine className="mr-3 text-xl" /> Logout
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Footer or any additional info */}
            <div className="py-4 text-center text-sm text-gray-400 border-t border-gray-700">
                <p>&copy; 2025 Tasque Workspace. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Sidebar;
