const { Schema, model } = require('mongoose');

//Schema to create user model
const userSchema = new Schema(
  {
    text: String,
    username: String,
    thoughts: [{ type: Schema.Types.ObjectId, ref:
    'thought' }],
    friends: [{ type: Schema.Types.ObjectId,
    ref:
    'user'}],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `thoughtCount` gets amount of thoughts per post

userSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});
// virtual property for `friendCount`
userSchema.virtual('friendCount').get(function
  (){
    return this.friends.length
  });

// Initialize user model
const User = model('user', userSchema);

module.exports = User;

