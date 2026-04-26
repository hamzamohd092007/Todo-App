import React from 'react'

const TaskItem = ({ task, handleToggle, handleEdit, handleDelete }) => {
  return (
    <div className="flex w-full items-center justify-between bg-gray-50 dark:bg-slate-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600">
      <div className={`flex items-center gap-3 ${task.completed ? "line-through opacity-60" : ""}`}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleToggle(task._id)}
          className="w-4 h-4 accent-indigo-500 dark:accent-indigo-400 cursor-pointer"
        />
        <span className="text-gray-800 dark:text-gray-200">
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleEdit(task)}
          className="text-sm text-blue-500 dark:text-blue-400 hover:underline cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-sm text-red-500 dark:text-red-400 hover:underline cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
