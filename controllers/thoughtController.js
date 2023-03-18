const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought found with that id' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
}