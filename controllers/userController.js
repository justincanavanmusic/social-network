const { Thought, User } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
    .populate('thoughts')
      .then((user) => res.json(user))
      .catch((err) => res.status.json(err));
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
    .then((newUserData) => res.json(newUserData))
    .catch((err) => res.status(500).json(err))
  },
 
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
      )
     
      .catch((err) => res.status(500).json(err));
  },

    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that id!' })
        : Thought.deleteMany({ _id: { $in: user.thoughts }})
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
      )
      .then((user) =>
        !user
        ? res
              .status(404)
              .json({ message: 'friend added, but no users with this id!'})
        : res.json({ message: 'friend added!'})
      )
      .catch((err) => {
        console.error(err);
      }
      )
    }
};
