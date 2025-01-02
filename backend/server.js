require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.post('/api/messages', async (req, res) => {
    try {
        const Message = require('./models/Message');
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/messages', async (req, res) => {
    try {
        const Message = require('./models/Message');
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));