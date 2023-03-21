const { Thought, User } = require("../models");

// module.exports = {
  // getUsers(req, res) {
  //   User.find()
  //   // .populate('thoughts')
  //     .populate('thoughts')
  //     .then((users) => res.json(users))
  //     .catch((err) => res.status(500).json(err));
  // },
  module.exports = {
    // Get all courses
    getUsers(req, res) {
      User.find()
      .populate('thoughts')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // getUsers(req, res) {
    //   User.find()
    //     .select('-__v')
    //     .then((users) => {
    //       res.json(users);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       res.status(500).json(err);
    //     });
    // },
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
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )

      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that id!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //FRIEND ROUTES

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "friend added, but no users with this id!" })
          : res.json({ message: "friend added!" })
      )
      .catch((err) => {
        console.error(err);
      });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No users with this ID!" })
          : res.json({ message: "Friend deleted!" })
      )
      .catch((err) => {
        console.error(err);
      });
  },
};
