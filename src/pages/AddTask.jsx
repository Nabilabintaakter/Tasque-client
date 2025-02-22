import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { ImSpinner3 } from "react-icons/im";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // useMutation for adding a task
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (newTask) => {
            await axiosSecure.post("/tasks", newTask);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Title is required!");
            return;
        }
        const newTask = {
            title,
            description,
            timestamp: new Date().toISOString(),
            category : "To-Do",
            user: user?.displayName,
            email: user?.email,
            userId: user?.uid,
        };
        try {
            await mutateAsync(newTask)
            toast.success('Your task has been successfully added!');
            navigate('/dashboard/manage-task')
        } catch (err) {
            toast.error(err.message)
        }
    };

    return (
        <div className="py-8 md:py-10">
            <div className="w-[96%] md:w-[60%] lg:w-[70%] mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl text-center font-semibold mb-4 text-gray-900 dark:text-white">
                    Add New Task
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Task Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={50}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-yellow-300 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter task title"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={200}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-yellow-300 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter task details (optional)"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#FEC140] text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all"
                        disabled={isPending} // Disable button when loading
                    >
                        {isPending ? <div className="flex items-center justify-center"><p className="flex items-center gap-2">Adding <ImSpinner3 className="animate-spin" /></p></div> : "Add Task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
