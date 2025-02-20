import { Link } from "react-router-dom";
import Container from "../shared/Container";
import { Fade, Zoom } from "react-awesome-reveal";

const Banner = () => {
    return (
        <section
            className="flex min-h-[80vh] md:min-h-[75vh] lg:h-[85vh] w-full justify-center items-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/Simple Shiny.svg')" }}
        >
            <Container>
                <div className="relative flex flex-col w-full text-center text-white">
                    <Fade direction="down" cascade>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Organize, Track & Achieve Your Tasks
                        </h1>
                    </Fade>
                    <Zoom>
                        <p className="mt-4 text-base md:text-xl opacity-90">
                            Simplify your workflow with Tasque - your ultimate task management solution.
                        </p>
                    </Zoom>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link to="/dashboard" className="px-4 py-2 md:px-6 md:py-3 bg-black hover:bg-white hover:text-black text-white rounded-lg text-sm md:text-lg font-medium shadow-md transition-all flex justify-center items-center duration-300">
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