import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import pic1 from '../assets/Mobile login-pana.png';
import pic2 from '../assets/Usability testing-pana.png';
import Container from "../shared/Container";
import logo from "../assets/tasque-logo.png";
import logoText from "../assets/Tas-removebg-preview.png";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, handleUpdateProfile,handleGoogleSignIn, setUser, setLoading } = useAuth();
    useEffect(() => {
        document.title = 'Register | Tasque';
    }, [])
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
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const conPassword = form.conPassword.value;

        if (password.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter!");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter!");
            return;
        }
        if (password !== conPassword) {
            setError("Passwords didn't match!");
            return;
        }

        try {
            // Create User
            const res = await createUser(email, password);
            const user = res.user;
            console.log(user.uid);
            const userId = user.uid;
            // Update Profile
            await handleUpdateProfile(name, photo);
            // Save user data in DB
            const userData = { name, email, photo, userId };
            await mutateAsync(userData);

            // Set user & navigate
            setUser(user);
            setLoading(false);
            toast.success("Successfully Registered!");
            navigate('/');

        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            setUser(null);
            setLoading(false);
        }
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
                        image: res?.user?.photoURL,
                        userId: res?.user?.uid
                    }
                )
                toast.success('Successfully Logged in to your account!');
                navigate('/');
            })
            .catch(err => {
                toast.error(err?.message)
                setUser(null)
            })
    };
    return (
        <div className="bg-white dark:bg-[#1A1A1A] min-h-screen py-4 md:py-8 lg:py-12 flex items-center justify-center">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Image */}
                    <div className="w-1/3 hidden lg:flex justify-center items-center">
                        <img src={pic1} alt="Login Illustration" className="max-w-full h-auto rounded-lg" />
                    </div>

                    {/* Register Form */}
                    <div className="w-full lg:w-1/3 flex justify-center items-center">
                        <div className="card w-full shadow-xl max-w-md bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/Simple Shiny.svg')" }}>
                            <form onSubmit={handleRegister} className="card-body p-6">
                                <div className="flex justify-center text-center">
                                    <Link to={'/'} className="flex items-center gap-1">
                                        <img className="w-6 md:w-8" src={logo} alt="" />
                                        <img className="w-32" src={logoText} alt="" />
                                    </Link>
                                </div>
                                <p className="text-center text-sm">Please Register to continue</p>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-bold">Name</span>
                                    </label>
                                    <input type="text" placeholder="name*" name="name" className="input border-none w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-bold">Photo URL</span>
                                    </label>
                                    <input type="url" placeholder="photo url*" name="photo" className="input border-none w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-bold">Email</span>
                                    </label>
                                    <input type="email" placeholder="email*" name="email" className="input border-none w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-bold">Password</span>
                                    </label>
                                    <input type="password" placeholder="password*" name="password" className="input border-none w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-bold">Confirm Password</span>
                                    </label>
                                    <input type="password" placeholder="confirm password*" name="conPassword" className="input border-none w-full" required />
                                </div>
                                {
                                    error && <p className="text-red-500">{error}</p>
                                }
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary w-full">Register</button>
                                </div>
                                <div className="divider text-gray-600 text-sm">Or</div>
                            <div className="form-control">
                                <button
                                    onClick={googleLoginHandler}
                                    className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-full text-sm font-semibold border-[1px] border-red-500 hover:bg-white hover:text-red-500 hover:border-red-500 hover:font-bold transition-all duration-500 w-full"
                                >
                                    <FcGoogle className="text-xl" />
                                    Log in with Google
                                </button>
                            </div>
                                <label className="label flex justify-center mt-3">
                                    <button href="#" className=" ">Already have an account? Please <Link to='/login' className="text-blue-600 ml-1 text-sm font-semibold hover:underline"> Login</Link></button>
                                </label>
                            </form>
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

export default Register;