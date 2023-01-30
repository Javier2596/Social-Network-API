const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  text: String,
  username: String,
});

// Initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;