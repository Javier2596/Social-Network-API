const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
  textThought: {
    type:Schema.Types.String,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
  }
});

// Initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;