const authService = require("../service/auth.service");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync(async (req, res) => {
  let user = await authService.handleLogin(req.body);
  res.cookie("jwt", user.access_token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).send(user);
});
module.exports = { login };
