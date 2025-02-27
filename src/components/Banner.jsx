import { Link } from "react-router-dom";
import Container from "../shared/Container";
import { Fade, Zoom } from "react-awesome-reveal";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Banner = () => {
    const { user } = useAuth();
    useEffect(() => {
        document.title = 'Home | Tasque';
    }, []);
    return (
        <section
            className={`flex w-full justify-center items-center bg-cover bg-center bg-no-repeat relative ${user ? 'min-h-[calc(100vh-64px)]' : 'min-h-[100vh]'}`}
            style={{ backgroundImage: "url('/Simple Shiny.svg')" }}
        >

            <Container>
                <div className="relative flex flex-col w-full text-center text-white">
                    <Fade triggerOnce direction="down" cascade>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Organize, Track & Achieve Your Tasks
                        </h1>
                    </Fade>
                    <Zoom triggerOnce>
                        <p className="mt-4 text-base md:text-xl opacity-90">
                            Simplify your workflow with Tasque - your ultimate task management solution.
                        </p>
                    </Zoom>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link to="/dashboard/manage-task" className="px-4 py-2 md:px-6 md:py-3 bg-black hover:bg-white hover:text-black text-white rounded-lg text-sm md:text-lg font-medium shadow-md transition-all flex justify-center items-center duration-300">
                            Get Started
                        </Link>
                        <Link to="/features" className="px-4 py-2 md:px-6 md:py-3 border border-white hover:bg-white hover:text-black rounded-lg text-sm md:text-lg font-medium shadow-md transition-all duration-300">
                            Learn More
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Banner;