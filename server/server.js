import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import todoRouter from './routes/todoRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

await connectDB();

app.use(express.json());
app.use(cors({
    origin: "https://todo-app-dun-six-62.vercel.app",
    credentials: true
}));

app.use(express.json());
app.use("/api/todos", todoRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
