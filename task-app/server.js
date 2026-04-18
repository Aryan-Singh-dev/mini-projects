import express from 'express';
import { JSONFilePreset } from 'lowdb/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const SECRET_KEY = "your_secret_key_here";

app.use(express.json());
app.use(express.static('public'));

// Initialize Database
async function initDB() {
    const defaultData = { users: [], tasks: [] };
    const db = await JSONFilePreset('db.json', defaultData);

    // --- AUTH ROUTES ---
    app.post('/api/register', async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        db.data.users.push({ username, password: hashedPassword });
        await db.write();
        res.json({ message: "User registered!" });
    });

    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        const user = db.data.users.find(u => u.username === username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username }, SECRET_KEY);
            res.json({ token });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    });

    // --- TASK ROUTES (Protected) ---
    app.get('/api/tasks', (req, res) => {
        const token = req.headers.authorization;
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const userTasks = db.data.tasks.filter(t => t.owner === decoded.username);
            res.json(userTasks);
        } catch (e) { res.status(401).send("Unauthorized"); }
    });

    app.post('/api/tasks', async (req, res) => {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, SECRET_KEY);
        db.data.tasks.push({ ...req.body, owner: decoded.username, id: Date.now() });
        await db.write();
        res.json({ success: true });
    });

    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

initDB();