require("dotenv").config();
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const nonSecurePaths = ["/auth/login"];

const createJWT = (payload) => {
  let accesstoken = null,
    refreshtoken = null;
  try {
    accesstoken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    refreshtoken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

    return { accesstoken, refreshtoken };
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
  return token;
};

const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJWT = async (req, res, next) => {
  try {
    if (nonSecurePaths.includes(req.path)) return next();

    let tokenFromHeader = getToken(req);
    let cookies = req.cookies;
    let token =
      cookies && cookies.accesstoken ? cookies.accesstoken : tokenFromHeader;

    if (token) {
      let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decoded) {
        req.user = decoded;
        req.token = token;
        return next();
      }
    }

    throw new ApiError(401, "The user is not authenticated!");
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createJWT, checkUserJWT };
