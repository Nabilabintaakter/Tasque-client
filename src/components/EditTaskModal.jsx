/* eslint-disable react/prop-types */
const EditTaskModal = ({ isOpen, onClose, task, setTask, handleUpdateTask }) => {
    if (!isOpen) return null;
  
    return (
      <div className="px-2 md:px-0 fixed inset-0 bg-black/20 flex items-center justify-center">
        <div
          className="bg-white p-5 md:p-6 rounded-lg w-full max-w-md shadow-lg bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/Simple Shiny.svg')" }}
        >
          <h2 className="text-lg md:text-2xl font-semibold mb-6 text-gray-800">Edit Your Task</h2>
  
          {/* Task Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-sm md:text-base" htmlFor="title">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full p-3 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-base border-none"
            />
          </div>
  
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-sm md:text-base" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter task details (optional)"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="w-full p-3 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-base border-none"
            />
          </div>
  
          {/* Category */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-sm md:text-base" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              className="w-full p-3 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-base border-none"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
  
          {/* Buttons */}
          <div className="flex justify-between space-x-2 md:space-x-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold transition-colors duration-300 w-full text-sm md:text-base"
              onClick={onClose}
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
    );
  };
  
  export default EditTaskModal;
  