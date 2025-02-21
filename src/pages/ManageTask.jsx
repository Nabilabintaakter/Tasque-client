import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";


const ManageTasks = () => {
    const axiosSecure = useAxiosSecure(); 
    const {user} = useAuth();
    
    const { data: tasks = [], isLoading, error } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/tasks/${user?.email}`); 
            return data;
        },
        enabled: !!user?.email, 
        refetchOnWindowFocus: false, 
    });
    console.log(tasks);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Manage Tasks</h2>
            <div className="task-container">
                your tasks {tasks?.length}
            </div>
        </div>
    );
};

export default ManageTasks;
