/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ImMenu } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
import Container from "../shared/Container";
import logo from "../assets/tasque-logo.png";
import logoText from "../assets/Tas-removebg-preview.png";
import { CgMenuGridO } from "react-icons/cg";


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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
            <li><NavLink onClick={scrollToTop} to={'/'} activeClassName="text-blue-500">Home</NavLink></li>
            <li><NavLink to="/#products" activeClassName="text-blue-500">Features</NavLink></li>
            <li><NavLink to="#footer" activeClassName="text-blue-500">About Us</NavLink></li>
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
                                <CgMenuGridO className="text-2xl" />
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-6 w-52 p-2 shadow">
                                    {links}
                                </ul>
                            </div>
                            <div onClick={scrollToTop} className="flex items-center gap-1">
                                <img className="w-6 md:w-8" src={logo} alt="" />
                                <Link to={'/'}><img className="w-32" src={logoText} alt="" /></Link>
                            </div>
                        </div>

                        {/* Navbar Center */}
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 text-black font-medium">
                                {links}
                            </ul>
                        </div>

                        {/* Navbar End */}
                        <div className="navbar-end flex items-center gap-3 md:gap-5">
                            

                            {/* User Icon */}
                            <FaUserCircle className="text-black text-2xl cursor-pointer" />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
