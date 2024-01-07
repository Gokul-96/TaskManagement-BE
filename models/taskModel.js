const mongoose = require('mongoose');
const Schema= mongoose.Schema;


const taskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    //mongoose.Schema.Types.ObjectId, which is a type used to store MongoDB ObjectId values
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //reference to another Mongoose model named 'User'. It indicates that the user field should hold ObjectId values that refer to documents in the User collection.
});

module.exports = mongoose.model('Task', taskSchema,'tasks');

