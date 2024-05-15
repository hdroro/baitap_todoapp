const mongoose = require("mongoose");
const bcypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const User = mongoose.model("User", userSchema);

const checkUsernameExist = async (username) => {
  let user = await User.findOne({ username: username });

  return !!user;
};

const isPasswordMatch = (userPassword, password) => {
  return bcypt.compareSync(userPassword, password);
};

module.exports = { User, checkUsernameExist, isPasswordMatch };
