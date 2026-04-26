# 📝 MERN Todo App

A full-stack Todo application built using the MERN stack with authentication and complete task management features.

## </> Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Security:** Bcrypt for password hashing
- **Deployment:** Vercel and Render

---

## ✨ Features

- 🔐 User Authentication (Register / Login)
- ➕ Add new todos
- ✏️ Edit existing todos
- ❌ Delete todos
- ✅ Toggle complete / incomplete
- 📋 Show completed todos
- 🔒 Protected routes (only logged-in users can access todos)
- 🌙 Dark mode toggle option

---

## ⚙️ Installation & Setup

- Clone the repository
    ```git clone https://github.com/hamzamohd092007/Todo-App.git```
    ```cd mern-todo-app```
- Setup backend
    ```cd server```
    ```npm install```
    Create a .env file in the server folder and add
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key
    ```npm run server```

---

## 🔐 Authentication Flow

- User registers with email & password
- Password is hashed using bcrypt
- JWT token is generated on login
- Token is used to access protected routes

---

## 📡 API Endpoints

- Auth Routes
    POST /api/user/signup → Sign Up
    POST /api/user/login → Login
    POST /api/user/verify → Verify
- Todo Routes
    GET /api/todos/get → Get all todos
    POST /api/todos/add → Create todo
    PATCH /api/todos/toggle/:id → Toggle complete
    PUT /api/todos/edit/:id → Update todo
    DELETE /api/todos/delete/:id → Delete todo

---

## 🛡️ Security
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes

---

## 🚀 Deployment
- The frontend of this app is deployed on Vercel.
- The backend of this app is deployed on Render.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 👨‍💻 Author

Made with ❤️ by Mohd Hamza
