const { Schema, model } = require('mongoose');

//Schema to create user model
const userSchema = new Schema(
  {
    text: String,
    username: String,
    comments: [{ type: Schema.Types.ObjectId, ref:
    'comment' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` gets amount of comments per post

userSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// Initialize user model
const User = model('user', userSchema);

module.exports = User;

