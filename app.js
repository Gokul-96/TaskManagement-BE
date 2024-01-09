
const express = require('express');

const http = require('http');
const { initSocket } = require('./socket');
const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

const server = http.createServer(app);
// Create a Socket.IO instance and pass the HTTP server
const io = initSocket(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoute');
const taskRoutes = require('./routes/taskRoute');


//Routes
app.use('/auth', authRoutes);
app.use('/api', taskRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


module.exports ={ app, server, io };