const cjwt = require("../middleware/authmiddleware");
const { User, isPasswordMatch } = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const COOKIE_OPTIONS = {
  httpOnly: true,
};

const TOKEN_MAX_AGE = {
  ACCESS_TOKEN: 60 * 1000,
  REFRESH_TOKEN: 60 * 60 * 1000,
};

const generateToken = (res, accesstoken, refreshtoken) => {
  res.cookie("accesstoken", accesstoken, {
    ...COOKIE_OPTIONS,
    maxAge: TOKEN_MAX_AGE.ACCESS_TOKEN,
  });

  res.cookie("refreshtoken", refreshtoken, {
    ...COOKIE_OPTIONS,
    maxAge: TOKEN_MAX_AGE.REFRESH_TOKEN,
  });
};

const handleLogin = async (userData) => {
  const user = await User.findOne({ username: userData.username });
  if (!user || !isPasswordMatch(userData.password, user.password)) {
    throw new ApiError(404, "Incorrect username or password");
  }

  let payload = {
    username: user.username,
  };
  let { accesstoken, refreshtoken } = cjwt.createJWT(payload);
  return {
    accesstoken: accesstoken,
    refreshtoken: refreshtoken,
    username: user.username,
    name: user.name,
  };
};

const handleRefreshToken = async (token) => {
  if (!token) {
    throw new Error("Token not found");
  }
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  let { accesstoken, refreshtoken } = cjwt.createJWT(decoded);
  return { accesstoken, refreshtoken };
};

module.exports = { handleLogin, handleRefreshToken, generateToken };
