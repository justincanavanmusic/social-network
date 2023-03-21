const { Schema, model, Types } = require("mongoose");

// const newDate = format_date => {
//   return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
// }

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId(),
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
    get: function(createdAt) {
      return `${createdAt.getMonth() + 1}/${createdAt.getDate()}/${createdAt.getFullYear()}`
    }
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function(date) {
        // console.log(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      }
    },
    username: {
      type: String,
      required: true,
      //get this from user?
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create virtual reactionCount... retrieves length of thoughts reactions array on query

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
