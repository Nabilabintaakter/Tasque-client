import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import toast from "react-hot-toast";
import pic1 from '../assets/Mobile login-pana.png';
import pic2 from '../assets/Usability testing-pana.png';
import Container from "../shared/Container";


const Register = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { createUser, handleUpdateProfile, setUser, setLoading } = useContext(AuthContext);
    useEffect(() => {
        document.title = 'Register |Milescape';
    }, [])

    const handleRegister = e => {
        setError('');
        e.preventDefault();
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
            setError("password didn't match")
            return;
        }
        // const newUser = { name, photo, email, password, conPassword };

        createUser(email, password)
            .then(res => {
                setUser(res.user);
                setLoading(false);
                // update profile
                handleUpdateProfile(name, photo)
                    .then(() => {
                        setLoading(false);
                        toast.success('Successfully Registered!')
                        setTimeout(() => {
                            navigate('/');
                        }, 1000);
                    })
                    .catch((err) => {
                        toast.error(err.message.slice(10))
                        setUser(null);
                    });
            })
            .catch((err) => {
                toast.error(err.message.slice(10))
                setUser(null);
            });
    }
    return (
        <div className="bg-white dark:bg-[#1A1A1A] py-4 md:py-8 lg:py-12 flex items-center justify-center">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Image */}
                    <div className="w-1/3 hidden lg:flex justify-center items-center">
                        <img src={pic1} alt="Login Illustration" className="max-w-full h-auto rounded-lg" />
                    </div>

                    {/* Register Form */}
                    <div className="w-full lg:w-1/3 flex justify-center items-center">
                        <div className="card w-full shadow-xl" style={{ backgroundImage: "url('/Simple Shiny.svg')" }}>
                        <form onSubmit={handleRegister} className="card-body">
                            <h1 className="text-4xl font-bold mb-5 flex justify-center">Register now!</h1>
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
                            <label className="label flex justify-center">
                                <button href="#" className="font-bold ">Already have an account? Please <Link to='/login' className="text-blue-600 ml-1 text-xl font-semibold hover:underline "> Login</Link></button>
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