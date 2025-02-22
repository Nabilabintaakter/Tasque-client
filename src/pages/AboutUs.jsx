import { useEffect } from 'react';
import Container from '../shared/Container';
import { Fade } from 'react-awesome-reveal';
import taskImage from '../assets/Task-cuate.png';
import { MdCheckCircle, MdOutlineTrackChanges } from 'react-icons/md';
import { GiDiamondTrophy } from 'react-icons/gi';
import { RiHandHeartLine } from 'react-icons/ri';
import { FaCheckCircle } from 'react-icons/fa';
import { GoGoal } from 'react-icons/go';
import { TbCheck, TbTargetArrow } from 'react-icons/tb';

const AboutUs = () => {
    useEffect(() => {
        document.title = 'About Us | Tasque';
    }, []);

    return (
        <section className="min-h-screen py-8 bg-white flex items-center">
            <Container>
                <Fade triggerOnce cascade>
                    <div className="text-center w-full md:w-3/4 lg:w-2/3 mx-auto mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center justify-center gap-3">Empowering Productivity with Tasque
                        </h2>
                        <p className="text-lg text-gray-600">
                            Simplifying task management and enhancing team collaboration for a more productive workflow.
                        </p>
                    </div>
                </Fade>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <Fade triggerOnce direction='up'>
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <MdOutlineTrackChanges className="text-green-500" /> Our Mission
                                </h3>
                                <ul className="list-none space-y-3 text-gray-700 text-sm md:text-base">
                                    <li className="flex items-center gap-2">
                                        <TbCheck className="text-green-500" /> Enhance productivity with seamless task management.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <TbCheck className="text-green-500" /> Provide an intuitive and efficient platform for users.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <TbCheck className="text-green-500" /> Empower individuals and teams to achieve goals effortlessly.
                                    </li>
                                </ul>
                            </div>
                        </Fade>
                        <Fade triggerOnce direction='up' delay={100}>
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <TbTargetArrow className="text-purple-500" /> Our Vision
                                </h3>
                                <ul className="list-none space-y-3 text-gray-700 text-sm md:text-base">
                                    <li className="flex items-center gap-2">
                                        <TbCheck className="text-purple-500" /> Be the most user-friendly task management platform.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <TbCheck className="text-purple-500" /> Continuously innovate for simplicity and efficiency.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <TbCheck className="text-purple-500" /> Foster collaboration and seamless teamwork.
                                    </li>
                                </ul>
                            </div>
                        </Fade>
                    </div>
                    <Fade triggerOnce delay={200}>
                        <div className="flex justify-center">
                            <img src={taskImage} alt="Task Management" className="w-[50%] max-w-md md:w-full" />
                        </div>
                    </Fade>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <Fade triggerOnce delay={300}>
                        <div className="space-y-6">
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <GiDiamondTrophy className="text-blue-500" /> Our Values
                            </h3>
                            <ul className="list-none space-y-3 text-gray-700 text-sm md:text-base">
                                <li className="flex items-center gap-2">
                                    <TbCheck className="text-blue-500" /> Intuitive and user-friendly design
                                </li>
                                <li className="flex items-center gap-2">
                                    <TbCheck className="text-blue-500" /> Continuous improvement and innovation
                                </li>
                                <li className="flex items-center gap-2">
                                    <TbCheck className="text-blue-500" /> Teamwork and collaboration
                                </li>
                                <li className="flex items-center gap-2">
                                    <TbCheck className="text-blue-500" /> Reliable and efficient task management
                                </li>
                            </ul>
                        </div>
                    </Fade>

                    <Fade triggerOnce delay={400}>
                        <div className="space-y-6">
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <RiHandHeartLine className="text-red-500" /> Our Commitment
                            </h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                We are dedicated to providing exceptional support and continuously evolving Tasque to meet user needs.
                                Your success is our priority, and we strive to make productivity effortless.
                            </p>
                        </div>
                    </Fade>
                </div>
            </Container>
        </section>
    );
};

export default AboutUs;
