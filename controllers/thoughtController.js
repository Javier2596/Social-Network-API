const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
  // gets single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No id found for that thought' })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
  //creates user thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'comment created, but no posts with this ID' }) : res.json({ message: 'comment created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },
};