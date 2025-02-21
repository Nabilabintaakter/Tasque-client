import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import  { Fade } from 'react-awesome-reveal';
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

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

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const categories = ['To-Do', 'In Progress', 'Done'];
    const categoryColors = {
        'To-Do': 'bg-gradient-to-br from-blue-200 to-blue-100',
        'In Progress': 'bg-gradient-to-br from-yellow-200 to-yellow-100',
        'Done': 'bg-gradient-to-br from-green-200 to-green-100',
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
                                <p className="text-gray-500 text-sm">No tasks in this category.</p>
                            ) : (
                                groupedTasks[category].map((task, index) => (
                                    <Fade key={task._id} delay={index * 200} triggerOnce className="w-full">
                                        <div className="bg-white rounded p-2 md:p-4 shadow-sm flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-xs md:text-base font-medium text-gray-800">{task.title}</h4>
                                                <p className="text-gray-600 text-[10px] md:text-sm mt-2">{task.description}</p>
                                            </div>
                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button className="text-blue-500 hover:text-blue-400 text-sm">
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
        </div>
    );
};

export default ManageTasks;
