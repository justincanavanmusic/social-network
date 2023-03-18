const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //getter method to format date
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //format date
  },
  username: {
    type: String,
    required: true,
    //get this from user?
  },
  reactions: [reactionSchema],
});

//create virtual reactionCount... retrieves length of thoughts reactions array on query

const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
