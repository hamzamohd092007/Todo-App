import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";

const TaskInput = ({ taskList, handleAdd, inputTitle, setInputTitle, isEditing }) => {
  return (
    <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center gap-2">
      <input
        type="text"
        placeholder="Add a task..."
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        className="w-full sm:flex-1 px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg outline-none placeholder-gray-500 dark:placeholder-gray-200 focus:text-blue-600 dark:focus:text-white focus:border-blue-600 dark:focus:border-white"
      />
      <button
        onClick={() => handleAdd(inputTitle)}
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-100 transition cursor-pointer"
      >
        {isEditing ? "Edit" : "Add"}
      </button>
    </div>
  )
}

export default TaskInput
