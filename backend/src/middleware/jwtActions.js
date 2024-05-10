require("dotenv").config();
const jwt = require("jsonwebtoken");

const nonSecurePaths = ["/login", "/register", "/logout"];

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
    console.log(error);
  }
  return decoded;
};

const checkUserJWT = async (req, res, next) => {
  try {
    if (nonSecurePaths.includes(req.path)) return next();
    let tokenFromHeader = getToken(req);

    let cookies = req.cookies;
    if ((cookies && cookies.jwt) || tokenFromHeader) {
      let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
      let decoded = verifyToken(token);

      if (decoded) {
        req.user = decoded;
        req.token = token;
        next();
      } else {
        return res.status(401).json({
          EC: -1,
          DT: "",
          EM: "Not authenticated the user!",
        });
      }
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createJWT, checkUserJWT };
