
const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoute');
const taskRoutes = require('./routes/taskRoute');


//Routes
app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  });



module.exports =app;