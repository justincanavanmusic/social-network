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

    createThought(req, res) {
      Thought.create(req.body)
        .then((thoughtObj) => 
        {
          console.log(thoughtObj);
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughtObj._id } },
            { new: true },
          );
        })
        .then((user) =>
          !user
          ? res
              .status(404)
              .json({ message: 'thought created, but no thoughts with this ID' })
          : res.json({ message: 'thought created' })
      )
      .catch((err) => {
        console.error(err);
      });
      },
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, 
        { $push: { reactions: req.body } },
        { new: true },
        )
        .then((thought) =>
          !thought
          ? res
              .status(404)
              .json({ message: 'reaction created, but no reactions with this ID' })
          : res.json({ message: 'reaction created' })
      )
      .catch((err) => {
        console.error(err);
      });
      },
        //delete
      deleteReaction(req, res) {
        Thought.findOneAndDelete(
          { _id: req.params.thoughtId }, 
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true },
          )
          .then((thought) =>
            !thought
            ? res
                .status(404)
                .json({ message: 'reaction created, but no reactions with this ID' })
            : res.json({ message: 'reaction created' })
        )
        .catch((err) => {
          console.error(err);
        });
        },
    }
    
    


      //add createThought (activity 21 commentRoutes)
