const { Schema, model, Types } = require("mongoose");

const emailRegex = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
  validate: [
   email => email.match(emailRegex), "Email is not valid"
  ]
  },
  //foreign key, will hold the ObjectIds for all of the thoughts objects
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought"
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      // ref: "user",
    }
  ]
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
  // return 1;
});

//create virtual friendCount... retrieves length of user's friends array on query

const User = model("user", userSchema);

module.exports = User;



// const { Schema, model } = require('mongoose');

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/.+@.+\..+/, 'Must match an email address!'],
//     },
//     thoughts: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'thought',
//       },
//     ],
//     friends: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'user',
//       },
//     ],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
// );

// userSchema.virtual('friendCount').get(function () {
//   return this.friends.length;
// });

// const User = model('user', userSchema);

// module.exports = User;

