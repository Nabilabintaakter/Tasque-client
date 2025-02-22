import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/tasque-logo.png";
import logoText from "../assets/Tas-removebg-preview.png";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand & Description */}
                    <div>
                        <Link to={'/'} className="flex w-fit bg-[#FEC140] px-4 py-2 rounded-tr-2xl rounded-b-2xl items-center gap-1 mb-4">
                            <img className="w-6 md:w-8" src={logo} alt="" />
                            <img className="w-32" src={logoText} alt="" />
                        </Link>
                        <p className="text-sm">
                            Streamline your workflow, boost productivity, and stay organized with Tasque.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/features" className="hover:text-blue-400 transition">Features</Link>
                            </li>
                            <li>
                                <Link to="/aboutUs" className="hover:text-blue-400 transition">About us</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manage-task" className="hover:text-blue-400 transition">Dashboard</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
                        <p className="text-sm">support@tasque.com</p>
                        <p className="text-sm mb-3">+123 456 789</p>
                        <div className="flex items-center space-x-4 mt-3">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
                                <FaTwitter size={18} />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
                                <FaLinkedinIn size={18} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
                                <FaInstagram size={18} />
                            </a>

                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Tasque. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
