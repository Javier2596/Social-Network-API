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
          ? res.status(404).json({ message: 'thought created, but no users with this ID' }) : res.json({ message: 'thought created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },

  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAnddelete({ text: req.params.thought }, (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('opps, something went wrong');
        res.status(500).json({ message: 'something went wrong'});
      }
    });
  },

  //update a thought
  updateThought(req, res) {
    User.findOneAndUpdate(
      { text: req.params.thought },
      { new: true},
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log('Oh no, something went wrong');
          res.status(500).json({ message: 'Something went wrong' });
        }
      } 
    );
  }
};