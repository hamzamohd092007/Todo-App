import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ taskList, handleToggle, handleEdit, handleDelete }) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const filteredTasks = showCompleted ? taskList : taskList.filter((task) => !task.completed);

  return (
    <div className="flex flex-col w-full gap-2 max-h-80 hide-scrollbar overflow-y-auto">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={showCompleted}
          className="w-4 h-4 accent-indigo-500 dark:accent-indigo-400 cursor-pointer"
          onChange={() => setShowCompleted(!showCompleted)}
        />
        <span className="text-gray-500 dark:text-gray-400">
          Show Completed
        </span>
      </div>
      <div className="flex flex-col w-full items-center gap-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} handleToggle={handleToggle} handleEdit={handleEdit} handleDelete={handleDelete} />
          ))
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            No Task Found
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;