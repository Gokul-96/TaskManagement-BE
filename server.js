const config = require('./utils/config');
const mongoose = require('mongoose');
const {app,server} = require('./app');

// MongoDB connection
console.log('Connecting to MongoDB');
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start Express app after successful MongoDB connection
    server.listen(config.PORT,'0.0.0.0', () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });