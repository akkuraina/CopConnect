import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import anonymousComplaintRoutes from './routes/anonymousComplaintRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup CORS with frontend origin
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-production-url.com'], // Add your frontend URLs here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Socket.io with CORS
const io = new Server(server, {
  cors: corsOptions,
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/anonymous', anonymousComplaintRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('CopConnect Backend is Running');
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { io };
