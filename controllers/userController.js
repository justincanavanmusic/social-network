const { Thought, User } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
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
  }
};
