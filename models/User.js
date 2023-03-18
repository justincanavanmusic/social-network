const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
    //add validation
  validate: [
    email => email.match(/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/), "Email is not valid"
  ]
  },
  //foreign key, will hold the ObjectIds for all of the thoughts objects
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

//create virtual friendCount... retrieves length of user's friends array on query

const User = model("user", userSchema);

module.exports = User;
