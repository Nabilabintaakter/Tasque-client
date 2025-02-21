import { Link, useLocation, useNavigate } from "react-router-dom";
import {useEffect, useRef, useState } from "react";
import pic1 from '../assets/Login-bro.png';
import pic2 from '../assets/Login-cuate.png';
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import logo from "../assets/tasque-logo.png";
import logoText from "../assets/Tas-removebg-preview.png";
import Container from "../shared/Container";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const from = location.state || '/';
    const emailRef = useRef();
    const { handleLogin, setUser, handleGoogleSignIn, setLoading } = useAuth();

    useEffect(() => {
        document.title = 'Login | Tasque';
    }, []);
    const { mutateAsync } = useMutation({
        mutationFn: async userData => {
            await axiosPublic.post(`/users`, userData)
        },
        onSuccess: () => {
            console.log('user data saved')
            // queryClient.invalidateQueries({ queryKey: ['classes'] })
        },
        onError: err => {
            console.log(err.message)
        },
    })
    const handleSubmit = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        handleLogin(email, password)
            .then(res => {
                setLoading(false);
                setUser(res.user);
                toast.success('Successfully Logged in to your account!');
                setTimeout(() => {
                    navigate(from);
                }, 1000);
            })
            .catch(() => {
                setLoading(false);
                toast.error('Please verify that your email and password are entered correctly.');
                setUser(null);
            });
    };
// handle google sign in
    const googleLoginHandler = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res.user);
                mutateAsync(
                    {
                        name: res?.user?.displayName,
                        email: res?.user?.email,
                        image: res?.user?.photoURL
                    }
                )
                toast.success('Successfully Logged in to your account!');
                setTimeout(() => {
                    navigate(from);
                }, 1000);
            })
            .catch(err => {
                toast.error(err?.message)
                setUser(null)
            })
    };

    return (
        <div className="bg-white dark:bg-[#1A1A1A] py-4 md:py-8 lg:py-12 flex items-center justify-center">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Image */}
                    <div className="w-1/3 hidden lg:flex justify-center items-center">
                        <img src={pic1} alt="Login Illustration" className="max-w-full h-auto rounded-lg" />
                    </div>

                    {/* Login Form */}
                    <div className="w-full lg:w-1/3 flex justify-center items-center">
                        <div className="card w-full p-6 shadow-xl max-w-md" style={{ backgroundImage: "url('/Simple Shiny.svg')" }}>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="mb-4 flex justify-center text-center">
                                    <div className="flex items-center gap-1">
                                        <img className="w-6 md:w-8" src={logo} alt="" />
                                        <img className="w-32" src={logoText} alt="" />
                                    </div>
                                </div>
                                
                                <p className="text-center">Please Login to continue</p>
                                <div className="form-control">
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Email Address:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={emailRef}
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full py-2 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                                        required
                                    />
                                </div>
                                <div className="form-control relative">
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Password:</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full py-2 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                                        required
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute bg-white border-none right-3 top-8'
                                    >
                                        {showPassword ? <IoMdEyeOff className='text-lg' /> : <IoMdEye className='text-lg' />}
                                    </button>
                                </div>
                                <div className="form-control mt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md text-sm font-semibold border-[1px] border-blue-600 hover:text-blue-600 hover:border-blue-600 hover:bg-gradient-to-r hover:from-white hover:to-slate-50 duration-500 transition-all hover:font-bold"
                                    >
                                        Log In
                                    </button>
                                </div>
                            </form>
                            <div className="divider text-gray-600 text-sm">Or</div>
                            <div className="form-control">
                                <button
                                    onClick={googleLoginHandler}
                                    className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-md text-sm font-semibold border-[1px] border-red-500 hover:bg-white hover:text-red-500 hover:border-red-500 hover:font-bold transition-all duration-500 w-full"
                                >
                                    <FcGoogle className="text-xl" />
                                    Log in with Google
                                </button>
                            </div>
                            <p className="text-center mt-4 text-gray-600 text-sm">
                                New to Tasque? Please
                                <Link
                                    to="/register"
                                    className="text-blue-600 ml-1 text-sm font-semibold hover:underline"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full lg:w-1/3 justify-center items-center hidden lg:flex">
                        <img src={pic2} alt="Login Illustration 2" className="max-w-full h-auto rounded-lg" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;