import { FaRegListAlt, FaUserFriends, FaBell, FaChartPie } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import Container from "../shared/Container";
import { useEffect } from "react";

const Features = () => {
        useEffect(() => {
            document.title = 'Features | Tasque';
        }, []);
    const features = [
        {
            icon: <FaRegListAlt className="text-4xl text-blue-700" />,
            title: "Task Management",
            description: "Organize and track tasks efficiently with categorized lists.",
            bgColor: "bg-blue-100",
        },
        {
            icon: <FaUserFriends className="text-4xl text-green-700" />,
            title: "Team Collaboration",
            description: "Enhance teamwork with seamless communication and real-time updates.",
            bgColor: "bg-green-100",
        },
        {
            icon: <FaBell className="text-4xl text-yellow-700" />,
            title: "Deadline Alerts",
            description: "Never miss deadlines with automated reminders and tracking.",
            bgColor: "bg-yellow-100",
        },
        {
            icon: <FaChartPie className="text-4xl text-purple-700" />,
            title: "Analytics & Reports",
            description: "Gain insights with real-time performance tracking and reports.",
            bgColor: "bg-purple-100",
        },
    ];

    return (
<section className="min-h-screen py-8 bg-white">
    <Container>
        <Fade triggerOnce cascade>
            <div className="w-[95%] md:w-[70%] mx-auto max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-4 md:mb-6">
                    Optimize Your Productivity with Key Features
                </h2>
                <p className="md:text-lg text-center text-gray-600 mb-12">
                    Discover the tools and techniques that can help you streamline your tasks and stay focused, so you can achieve more with less effort.
                </p>
            </div>
        </Fade>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {features.map((feature, index) => (
                <Fade key={index} triggerOnce delay={index * 100}>
                    <div className={`h-[240px] md:h-[250px] rounded-xl transition-transform duration-300 hover:shadow-lg ${feature.bgColor} flex flex-col  items-center p-4 md:p-8 min-h-[250px] transition-all duration-300 ease-in-out`}>
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

    );
};

export default Features;
