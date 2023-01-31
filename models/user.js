const { Schema, model } = require('mongoose');

//Schema to create user model
const userSchema = new Schema(
  {
    text: String,
    username: String,
    thoughts: [{ type: Schema.Types.ObjectId, ref:
    'thought' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` gets amount of comments per post

userSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});

// Initialize user model
const User = model('user', userSchema);

module.exports = User;

