import React from "react";

function Navbar({ dark, fullName, userId, handleLogout, toggleTheme }) {
  return (
    <nav className="w-full bg-blue-600 dark:bg-slate-900 text-white dark:text-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-md gap-3 sm:gap-0">
      <h1 className="text-lg sm:text-xl font-bold tracking-wide text-center sm:text-left">
        FlowTask
      </h1>
      <div className="flex gap-4">
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox"
            value={dark}
            onChange={toggleTheme}
            className="sr-only peer" />
          <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
          <span className="select-none ms-3 text-sm font-medium text-heading">Dark mode</span>
        </label>
        {fullName && userId && (
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="text-sm sm:text-base text-white dark:text-gray-300">
              {fullName}
            </div>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-white text-blue-600 dark:bg-slate-700 dark:text-gray-200 px-4 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;