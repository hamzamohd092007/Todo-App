import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  const signUp = async ({ email, fullName, password }) => {
    try {
      if (!fullName.trim() || !email.trim() || !password.trim()) return toast.error("Email and Password are required");
      const { data } = await axios.post("${VITE_BACKEND_URL}/api/user/signup", { fullName, email, password });
      if (data.token) localStorage.setItem("token", data.token);
      setUser(data.user);
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const logIn = async ({ email, password }) => {
    try {
      if (!email.trim() || !password.trim()) return toast.error("Email and Password are required");
      const { data } = await axios.post(`${VITE_BACKEND_URL}/api/user/login`, { email, password });
      if (data.token) localStorage.setItem("token", data.token);
      setUser(data.user);
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTaskList([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    const verifyUser = async () => {
      try {
        const { data } = await axios.get(`${VITE_BACKEND_URL}/api/user/verify`, { headers: { Authorization: `Bearer ${token}` } });
        setUser(data.user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get(`${VITE_BACKEND_URL}/api/todos/get`, { headers: { Authorization: `Bearer ${token}` } });
      setTaskList(data.todos);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, []);

  useEffect(() => {
    if (user?.userId) {
      fetchTodos();
    }
  }, [user?.userId]);

  const addTask = async (title) => {
    try {
      const token = localStorage.getItem("token");
      if (!title.trim()) return toast.error("Title Cannot Be Empty");
      if (!isEditing) {
        await axios.post(`${VITE_BACKEND_URL}/api/todos/add`, { title }, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Task added");
      } else {
        await axios.put(`${VITE_BACKEND_URL}/api/todos/edit/${editingId}`, { title }, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Task updated");
        setIsEditing(false);
        setEditingId(null);
      }
      setInputTitle("");
      fetchTodos();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const toggleTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (isEditing) return toast.error("Cannot Toggle While Editing");
      await axios.put(`${VITE_BACKEND_URL}/api/todos/toggle/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchTodos();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const editTask = (task) => {
    if (isEditing) {
      if (editingId === task._id) toast.error("Already Editing This Task");
      else toast.error("Already Editing Another Task");
      return
    }
    setInputTitle(task.title);
    setIsEditing(true);
    setEditingId(task._id);
  }

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (isEditing) return toast.error("Cannot Delete While Editing");
      await axios.delete(`${VITE_BACKEND_URL}/api/todos/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchTodos();
      toast.success("Task deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
          <div className="w-10 h-10 border-4 border-blue-600 dark:border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !user ? (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
          <Login currentState={currentState} setCurrentState={setCurrentState} fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSignUp={signUp} handleLogIn={logIn} />
        </main>
      ) : (
        <main className="min-h-screen flex flex-col justify-between items-center bg-gray-100 dark:bg-slate-900">
          <Navbar dark={dark} fullName={user.fullName} userId={user.userId} handleLogout={logOut} toggleTheme={toggleTheme} />
          <div className="w-[90%] flex items-center justify-center sm:w-3/4 lg:w-1/2 flex-col gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-white text-center">
              FlowTask
            </h1>
            <TaskInput inputTitle={inputTitle} setInputTitle={setInputTitle} handleAdd={addTask} isEditing={isEditing} />
            <TaskList taskList={taskList} handleToggle={toggleTask} handleEdit={editTask} handleDelete={deleteTask} />
          </div>
          <Footer />
        </main>
      )}
    </>
  );
}
export default App