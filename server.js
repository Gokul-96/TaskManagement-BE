//Refer diary
const path = require('path');
const config = require('./utils/config');
//use mongoose
const mongoose = require ('mongoose');
//import app here
const app = require('./app');

//mongodb connection
console.log('connecting to MongoDB');
mongoose.connect(config.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.PORT,()=>{
        console.log(`server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });