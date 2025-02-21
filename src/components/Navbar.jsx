/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../shared/Container";
import logo from "../assets/tasque-logo.png";
import logoText from "../assets/Tas-removebg-preview.png";
import { CgMenuGridO } from "react-icons/cg";
import AuthContext from "../context/AuthContext/AuthContext";
import { FaHome, FaInfoCircle, FaList, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";


const Navbar = () => {
    const { user, handleSignOut } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const signOutHandler = () => {
        handleSignOut()
            .then(() => {
                navigate('/login')
            })
    }
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const links = (
        <>
            <li>
                <NavLink 
                    onClick={scrollToTop} 
                    to="/" 
                    className={({ isActive }) => isActive ? "bg-black text-white font-semibold" : ""}
                >
                    <FaHome className="" /> Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/features" 
                    className={({ isActive }) => isActive ? "bg-black text-white font-semibold" : ""}
                >
                    <FaList className="" /> Features
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => isActive ? "bg-black text-white font-semibold" : ""}
                >
                    <FaInfoCircle className="" /> About Us
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink 
                        to="/dashboard/manage-task" 
                        className={({ isActive }) => isActive ? "bg-black text-white font-semibold" : ""}
                    >
                        <FaTachometerAlt className="" /> Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );
    

    return (
        <div className="bg-[#FEC140] w-full">
            <div className="fixed backdrop-blur-md z-50 bg-[#FEC140]/90 w-full">
                <Container>
                    <div className="navbar">
                        {/* Navbar Start */}
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="mr-5 lg:hidden">
                                    <CgMenuGridO className="text-[27px]" />
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#FEC140] rounded-box z-10 mt-6 w-52 p-2 shadow">
                                    {links}
                                </ul>
                            </div>
                            <Link to={'/'} onClick={scrollToTop} className="flex items-center gap-1">
                                <img className="w-6 md:w-8" src={logo} alt="" />
                                <img className="w-32" src={logoText} alt="" />
                            </Link>
                        </div>

                        {/* Navbar Center */}
                        <div className="navbar-center hidden lg:block">
                            <ul className="menu menu-horizontal flex gap-2 px-1 text-black font-medium">
                                {links}
                            </ul>
                        </div>

                        {/* Navbar End */}
                        <div className="navbar-end flex items-center gap-5">
                            <div className='flex items-center gap-2'>
                                {
                                    user ?
                                        <div className='flex items-center gap-2 lg:gap-4'>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className="w-10 h-10  btn-circle avatar border-[1px] border-blue-800 dark:border-blue-400 mt-1">
                                                    <div className="w-full rounded-full ">
                                                        <img
                                                            referrerPolicy="no-referrer"
                                                            alt="user"
                                                            src={user?.photoURL} />
                                                    </div>
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="menu menu-sm dropdown-content bg-base-100 rounded z-[1] mt-3 w-52 p-2 shadow">
                                                    <li className='flex justify-center items-center text-xl text-black font-bold mb-2'>{user?.displayName}</li>
                                                    <li className='px-2 block  lg:hidden'>
                                                        <button onClick={signOutHandler} className='bg-red-600  rounded border-[1px] border-red-600 shadow-none text-white font-medium w-full py-1 px-2 md:py-[6px] md:px-4 flex md:hidden justify-center items-center hover:bg-white hover:text-red-600 transition-all duration-300 gap-2'><FaSignOutAlt></FaSignOutAlt> Logout</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <button onClick={signOutHandler} className='bg-red-600  rounded border-[1px] border-red-600 shadow-none text-white font-medium py-1 px-2 md:py-[6px] md:px-4 hidden md:flex items-center hover:bg-white hover:text-red-600 transition-all duration-300 gap-2'><FaSignOutAlt></FaSignOutAlt> Logout</button>
                                        </div>
                                        :
                                        <div className='flex items-center gap-2'>
                                            <Link to='/login' className='bg-transparent  py-1 px-4 md:py-[6px] md:px-4 rounded border border-gray-500 shadow-none text-base font-normal hover:bg-white transition-all duration-300'>Login</Link>
                                            <Link to='/register' className='bg-blue-500 text-base font-normal hidden md:block rounded py-1 md:py-[6px] px-4  border-[1px] border-blue-500 shadow-none text-white hover:text-blue-600 hover:bg-white transition-all duration-300'>Register</Link>

                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
