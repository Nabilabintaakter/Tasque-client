
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import banner from '../assets/web-blue-banner-software-ui-and-development-vector-42172307.jpg';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white p-3 md:p-6 min-h-screen">
            {/* Background Image */}
            <div className="relative h-48 rounded-t-lg overflow-hidden">
                <img src={banner} alt="Profile Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
            </div>

            {/* Profile Content */}
            <div className="relative -mt-20 p-3 md:p-6">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-full mx-auto border-4 border-white overflow-hidden">
                    <img src={user?.photoURL} alt="Profile" className="w-full h-full object-cover" />
                </div>

                {/* User Info */}
                <div className="mt-4 text-center">
                    <h2 className="text-2xl font-semibold text-black">{user?.displayName}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                </div>

                {/* Stats */}
                <div className="mt-6 flex justify-around">
                    <div>
                        <p className="text-lg font-semibold text-[#FEC140]">150</p>
                        <p className="text-sm text-gray-600">Followers</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-[#FEC140]">140</p>
                        <p className="text-sm text-gray-600">Place Stay</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-[#FEC140]">45</p>
                        <p className="text-sm text-gray-600">Reviews</p>
                    </div>
                </div>

                {/* About Me */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-[#FEC140]">About Me</h3>
                    <p className="text-gray-700 leading-relaxed">
                        I'm a passionate and creative web developer with a strong focus on front-end technologies and user experience. I enjoy building intuitive and visually appealing websites and web applications. My goal is to create digital experiences that are not only functional but also engaging and enjoyable for users. I'm constantly learning and exploring new technologies to stay up-to-date with the ever-evolving web development landscape.
                    </p>
                </div>

                {/* Skills */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-[#FEC140]">Skills</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="bg-[#FEC140] text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">HTML</span>
                        <span className="bg-[#FEC140] text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">CSS</span>
                        <span className="bg-[#FEC140] text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">JavaScript</span>
                        <span className="bg-[#FEC140] text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">React</span>
                        <span className="bg-[#FEC140] text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">Node.js</span>
                        <span className="bg-[#FEC140] text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">Tailwind CSS</span>
                        <span className="bg-[#FEC140] text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">Git</span>
                        <span className="bg-[#FEC140] text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">Responsive Design</span>
                    </div>
                </div>

                {/* Language */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-[#FEC140]">Language</h3>
                    <p className="text-gray-700">English | Bangla</p>
                </div>

                {/* Personal Information */}
                <div className="mt-6">
    <h3 className="text-xl font-semibold text-[#FEC140]">Personal Information</h3>
    <div className="mt-2 space-y-2">
        <p className="text-gray-700">
            <FaUser className="inline-block mr-2" /> Name: {user?.displayName}
        </p>
        <p className="text-gray-700">
            <FaEnvelope className="inline-block mr-2" /> Email: {user?.email}
        </p>
        <p className="text-gray-700">
            <FaMapMarkerAlt className="inline-block mr-2" /> Location: Dhaka, Bangladesh
        </p>
        <p className="text-gray-700">
            <FaBriefcase className="inline-block mr-2" /> Year of Experience: 02 Years
        </p>
    </div>
</div>
            </div>
        </div>
    );
};

export default Profile;
