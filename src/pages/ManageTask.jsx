import { useQuery, useMutation } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FcTodoList } from "react-icons/fc";
import { MdFileDownloadDone, MdPendingActions } from "react-icons/md";
import EditTaskModal from "../components/EditTaskModal";

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
    const updateTaskMutation = useMutation({
        mutationFn: async (updatedTask) => {
            return await axiosSecure.patch(`/my-task/${updatedTask._id}`, updatedTask);
        },
        onSuccess: () => {
            toast.success("Task updated successfully");
            refetch();
            setEditModalOpen(false);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the droppable area, exit
    
    const { source, destination } = result;
    
    // Check if tasks belong to the same category or not
    if (source.droppableId === destination.droppableId) {
        const reorderedTasks = Array.from(tasks.filter(task => task.category === source.droppableId)); // Filter tasks from the same category
        
        const [movedTask] = reorderedTasks.splice(source.index, 1); // Remove the moved task
        reorderedTasks.splice(destination.index, 0, movedTask); // Insert the task at the new position

        // Update the order for all tasks in this category
        reorderedTasks.forEach((task, index) => {
            task.order = index; // Update order for the tasks in this category
        });

        // Now update the task order in the backend for all tasks in the same category
        reorderedTasks.forEach((task) => {
            updateTaskMutation.mutate({
                ...task,
                order: task.order,             // Update order within the same category
            });
        });

        // Refetch to get the latest task order from the backend
        refetch();
    } else {
        // Handle task move between different categories
        const movedTask = tasks.find(task => task._id === result.draggableId);
        if (movedTask) {
            updateTaskMutation.mutate({
                ...movedTask,
                category: destination.droppableId, // Move to the new category
                order: destination.index,          // Set order based on new position
            });

            // Refetch to update tasks after moving between categories
            refetch();
        }
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
        'To-Do': 'bg-gradient-to-br from-blue-100 to-blue-50',
        'In Progress': 'bg-gradient-to-br from-yellow-100 to-yellow-50',
        'Done': 'bg-gradient-to-br from-green-100 to-green-50',
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="px-2 py-2 grid grid-cols-3 gap-1 md:gap-3">
                {categories.map((category) => (
                    <Droppable key={category} droppableId={category}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className={`${categoryColors[category]} min-h-[calc(100vh-74px)] rounded shadow-md p-2 md:p-3`}>
                                <div className="flex items-center gap-2 text-sm md:text-lg font-semibold text-gray-800 mb-4">
                                    {category === 'To-Do' ? <FcTodoList className="text-blue-400 text-xl" /> : category === 'In Progress' ? <MdPendingActions className="text-yellow-600 text-xl" /> : <MdFileDownloadDone className="text-green-600 text-xl" />} {category}
                                </div>
                                <div className="space-y-3">
                                    {tasks.filter(task => task.category === category).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <Fade triggerOnce>
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white rounded p-1 md:p-4 shadow-sm flex flex-col justify-between">
                                                        <h4 className="text-xs md:text-base font-medium text-gray-800">{index +1}.{task.title}</h4>
                                                        <p className="text-gray-600 text-[10px] md:text-sm mt-2">{task.description}</p>
                                                        <div className="mt-4 flex justify-end space-x-2">
                                                            <button className="text-blue-500 hover:text-blue-400 text-sm" onClick={() => setEditedTask(task) || setEditModalOpen(true)}>
                                                                <FaEdit />
                                                            </button>
                                                            <button className="text-red-500 hover:text-red-400 text-sm" onClick={() => setSelectedTask(task) || setModalOpen(true)}>
                                                                <FaTrashAlt />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Fade>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
            <ConfirmModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={() => setModalOpen(false) || deleteTaskMutation.mutate(selectedTask._id)} message="Are you sure you want to delete this task?" />
            <EditTaskModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} task={editedTask} setTask={setEditedTask} handleUpdateTask={() => updateTaskMutation.mutate(editedTask)} />
        </DragDropContext>
    );
};

export default ManageTasks;
