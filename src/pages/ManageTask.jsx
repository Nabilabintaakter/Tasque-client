import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedTask, setEditedTask] = useState({ title: '', description: '', category: '' });

    const { data: tasks = [], isLoading, error, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/tasks/${user?.email}`);
            return data;
        },
        enabled: !!user?.email,
        refetchOnWindowFocus: false,
    });

    // Delete Task Mutation with Toast
    const deleteTaskMutation = useMutation({
        mutationFn: async (taskId) => {
            return await axiosSecure.delete(`/my-task/${taskId}`);
        },
        onSuccess: () => {
            toast.success("Task deleted successfully");
            refetch();
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    // Update Task Mutation with Toast
    const updateTaskMutation = useMutation({
        mutationFn: async (updatedTask) => {
            return await axiosSecure.patch(`/my-task/${updatedTask._id}`, updatedTask);
        },
        onSuccess: () => {
            toast.success("Your task updated successfully");
            refetch();
            setEditModalOpen(false);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    // Handle Delete Click (Show Modal)
    const handleDeleteClick = (task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };

    // Handle Delete Confirmation
    const handleConfirmDelete = () => {
        setModalOpen(false);
        if (selectedTask) {
            toast.promise(
                deleteTaskMutation.mutateAsync(selectedTask._id),
            );
        }
    };
    // Handle Edit Click (Open Edit Modal)
    const handleEditClick = (task) => {
        setEditedTask({ ...task });
        setEditModalOpen(true);
    };
    // Handle Update Task
    const handleUpdateTask = () => {
        updateTaskMutation.mutate(editedTask);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const categories = ['To-Do', 'In Progress', 'Done'];
    const categoryColors = {
        'To-Do': 'bg-gradient-to-br from-blue-100 to-blue-50',
        'In Progress': 'bg-gradient-to-br from-yellow-100 to-yellow-50',
        'Done': 'bg-gradient-to-br from-green-100 to-green-50',
    };

    const groupedTasks = categories.reduce((acc, category) => {
        acc[category] = tasks.filter(task => task.category === category);
        return acc;
    }, {});

    return (
        <div className="px-2 py-2">
            <div className="grid grid-cols-3 gap-1 md:gap-3">
                {categories.map((category) => (
                    <div key={category} className={`${categoryColors[category]} min-h-screen rounded shadow-md p-2 md:p-3`}>
                        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">{category}</h3>
                        <div className="space-y-2 md:space-y-3">
                            {groupedTasks[category]?.length === 0 ? (
                                <p className="text-xs md:text-base font-medium text-gray-800">No tasks in this category.</p>
                            ) : (
                                groupedTasks[category].map((task, index) => (
                                    <Fade key={task._id} delay={index * 200} triggerOnce className="w-full">
                                        <div className="bg-white rounded p-2 md:p-4 shadow-sm flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-xs md:text-base font-medium text-gray-800">{task.title}</h4>
                                                <p className="text-gray-600 text-[10px] md:text-sm mt-2">{task.description}</p>
                                            </div>
                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button className="text-blue-500 hover:text-blue-400 text-sm" onClick={() => handleEditClick(task)}>
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(task)}
                                                    className="text-red-500 hover:text-red-400 text-sm"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </Fade>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this task?"
            />
            {/* Edit Task Modal */}
            {editModalOpen && (
                <div className="px-2 md:px-0 fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center" >
                    <div className="bg-white p-5 md:p-6 rounded-lg w-full max-w-md shadow-lg bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/Simple Shiny.svg')" }}>
                        <h2 className="text-lg md:text-2xl font-semibold mb-6 text-gray-800">Edit Your Task</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2 text-sm md:text-base" htmlFor="title">
                                Task Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter task title"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                className="w-full p-3 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-base border-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2 text-sm md:text-base" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Enter task details (optional)"
                                value={editedTask.description}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                className="w-full p-3 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-base border-none"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2 text-sm md:text-base" htmlFor="category">
                                Category
                            </label>
                            <select
                                id="category"
                                value={editedTask.category}
                                onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
                                className="w-full p-3 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-base border-none"
                            >
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <div className="flex justify-between space-x-2 md:space-x-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold transition-colors duration-300 w-full text-sm md:text-base"
                                onClick={() => setEditModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold transition-colors duration-300 text-sm md:text-base w-full"
                                onClick={handleUpdateTask}
                            >
                                Update Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTasks;