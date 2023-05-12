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
      .then((thought) => res.json(thought))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  },
  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ text: req.params.thoughtId })
      .then((user) => !user
        ? res.status(404).json({message: "Could not find user!"})
        : res.status(200).json({meesage: "User deleted successful"})
      )
      .catch((error) => {
        console.log(error);
        res.json(500).json(error);
      });
  },

  //update a thought
  updateThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.thoughtId},
      {new: true},
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