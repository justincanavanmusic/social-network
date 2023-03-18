const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username: { 
        type: String, 
        required: true, 
        unique: true },  //add validation  
        // validate: {
        // validator: () => Promise.resolve(false),
        // message: 'Email validation failed'}
       
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
            },

    thoughts: [{
        type: Schema.Types.ObjectId, ref: 'thought',
        }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        }],
    });

    //create virtual friendCount... retrieves length of user's friends array on query

module.exports = User;