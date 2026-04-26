import express from 'express';
import Todo from '../models/Todo.js';
import auth from '../middleware/auth.js';

const todoRouter = express.Router();

todoRouter.get('/get', auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const todos = await Todo.find({ userId });
        if (!todos) {
            return res.status(404).json({ success: false, message: 'No todos found' });
        }
        res.status(200).json({ success: true, todos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});

todoRouter.post('/add', auth, async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.userId;
        if (!title || !userId) {
            return res.status(400).json({ success: false, message: "Title and User ID  required" });
        }
        const newTodo = await Todo.create({ userId, title });
        res.status(201).json({ success: true, message: "Todo added" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

todoRouter.put('/toggle/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            todo.completed = !todo.completed;
            await todo.save();
            res.status(200).json({ success: true, message: "Todo completed" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});

todoRouter.put('/edit/:id', auth, async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || !title.trim()) {
            return res.status(400).json({ success: false, message: "Title required" });
        }
        const todo = await Todo.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }
        todo.title = title;
        await todo.save();
        res.status(200).json({ success: true, message: "Todo updated", todo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

todoRouter.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default todoRouter;