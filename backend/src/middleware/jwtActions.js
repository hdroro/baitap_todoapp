require("dotenv").config();
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const nonSecurePaths = ["/auth/login"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
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

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    throw new ApiError(500, { message: error.response.data.message });
  }
  return decoded;
};

const checkUserJWT = async (req, res, next) => {
  try {
    if (nonSecurePaths.includes(req.path)) return next();

    let tokenFromHeader = getToken(req);
    let cookies = req.cookies;
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;

    if (token) {
      let decoded = verifyToken(token);

      if (decoded) {
        req.user = decoded;
        req.token = token;
        return next();
      }
    }

    throw new ApiError(401, "Not authenticated the user!");
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createJWT, checkUserJWT };
