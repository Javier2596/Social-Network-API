const { User } = require('../models');

module.exports = {
  //finds users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //finds a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.postId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  
  //deletes a user
  deleteUser(req, res) {
    User.findOneAnddelete({ username: req.params.user }, (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('opps, something went wrong');
        res.status(500).json({ message: 'something went wrong'});
      }
    });
  },

  //updates a user 
  updateUser(req, res) {
    User.findOneAndUpdate(
      { username: req.params.user },
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
