const cjwt = require("../middleware/jwtActions");
const { User, isPasswordMatch } = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const handleLogin = async (userData) => {
  const user = await User.findOne({ username: userData.username });
  if (!user || !isPasswordMatch(userData.password, user.password)) {
    throw new ApiError(404, "Incorrect username or password");
  }

  let payload = {
    username: user.username,
  };
  let token = cjwt.createJWT(payload);
  return {
    access_token: token,
    username: user.username,
    name: user.name,
  };
};

module.exports = { handleLogin };
