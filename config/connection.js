const { connect, connection } = require('mongoose');

// wrap Mongoose around local connection to MongoDB
connect('mongodb://127.0.0.1:27017/socialDB',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = connection;