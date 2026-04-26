import React from 'react'

const Login = ({ currentState, setCurrentState, fullName, setFullName, email, setEmail, password, setPassword, handleSignUp, handleLogIn }) => {
  return (
    <div className="w-[90%] sm:w-3/4 lg:w-1/2 flex flex-col gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-white text-center">
        {currentState}
      </h1>
      {currentState === "Sign Up" && (
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg outline-none placeholder-gray-500 dark:placeholder-gray-200 focus:text-blue-600 dark:focus:text-white focus:border-blue-600 dark:focus:border-white"
        />
      )}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg outline-none placeholder-gray-500 dark:placeholder-gray-200 focus:text-blue-600 dark:focus:text-white focus:border-blue-600 dark:focus:border-white"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg outline-none placeholder-gray-500 dark:placeholder-gray-200 focus:text-blue-600 dark:focus:text-white focus:border-blue-600 dark:focus:border-white"
      />
      <button
        onClick={() =>
          currentState === "Sign Up"
            ? handleSignUp({ fullName, email, password })
            : handleLogIn({ email, password })
        }
        className="w-full px-4 py-2 bg-blue-600 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-100 cursor-pointer transition"
      >
        {currentState}
      </button>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        {currentState === "Sign Up" ? (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-blue-600 dark:text-slate-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-blue-600 dark:text-slate-400 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </>
        )}
      </p>
    </div>
  )
}

export default Login
