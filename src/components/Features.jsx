import { FaRegListAlt, FaClock, FaShieldAlt, FaTasks, FaMobileAlt, FaRegLightbulb } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import Container from "../shared/Container";
import { useEffect } from "react";
import Footer from "./Footer";

const Features = () => {
    useEffect(() => {
        document.title = 'Features | Tasque';
    }, []);

    const features = [

        {
            icon: <FaClock className="text-2xl md:text-4xl text-green-700" />,
            title: "Instant Real-Time Updates",
            description: "Changes sync across all devices instantly, ensuring your team always has the latest information.",
            bgColor: "bg-green-100",
        },

        {
            icon: <FaRegLightbulb className="text-2xl md:text-4xl text-orange-700" />,
            title: "Minimalist Clean Interface",
            description: "Focus on what matters with our clean, distraction-free user interface design.",
            bgColor: "bg-orange-100",
        },
        {
            icon: <FaShieldAlt className="text-2xl md:text-4xl text-yellow-700" />,
            title: "Robust Secure Authentication",
            description: "Keep your data safe with our strong authentication system and personalized task management.",
            bgColor: "bg-yellow-100",
        },
        {
            icon: <FaRegListAlt className="text-2xl md:text-4xl text-blue-700" />,
            title: "Smart Drag & Drop",
            description: "Easily organize tasks into 'To-Do', 'In Progress', and 'Done' categories with our intuitive drag & drop interface.",
            bgColor: "bg-blue-100",
        },
        {
            icon: <FaTasks className="text-2xl md:text-4xl text-purple-700" />,
            title: "Custom Task Categories",
            description: "Organize tasks into distinct categories to maintain a structured workflow and track progress effectively.",
            bgColor: "bg-purple-100",
        },
        {
            icon: <FaMobileAlt className="text-2xl md:text-4xl text-red-700" />,
            title: "Fully Mobile Responsive",
            description: "Access and manage your tasks from any device with our adaptable and responsive design.",
            bgColor: "bg-red-100",
        },
    ];

    return (
        <>
                <section className="min-h-screen py-8 bg-white">
            <Container>
                <Fade triggerOnce cascade>
                    <div className="w-[95%] md:w-[70%] mx-auto max-w-2xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-4 md:mb-6">
                            Unlock Productivity with Our Comprehensive Task Management
                        </h2>
                        <p className="md:text-lg text-center text-gray-600 mb-6 md:mb-12">
                            Explore a suite of features designed to simplify your workflow, boost efficiency, and help you accomplish more, effortlessly.
                        </p>
                    </div>
                </Fade>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {features.map((feature, index) => (
                        <Fade key={index} triggerOnce delay={index * 100}>
                            <div className={`h-[310px] sm:h-[240px] md:h-[250px] rounded-xl transition-transform duration-300 hover:shadow-lg ${feature.bgColor} flex flex-col items-center p-4 md:p-8 min-h-[250px] transition-all duration-300 ease-in-out`}>
                                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-center text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 text-center mt-2">{feature.description}</p>
                            </div>
                        </Fade>
                    ))}
                </div>
            </Container>
        </section>
        <Footer></Footer>
        </>
    );
};

export default Features;