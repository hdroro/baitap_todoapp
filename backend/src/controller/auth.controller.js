const authService = require("../service/auth.service");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync(async (req, res) => {
  const user = await authService.handleLogin(req.body);
  const { accesstoken, refreshtoken } = user;

  authService.generateToken(res, accesstoken, refreshtoken);
  res.status(200).send({ accesstoken, refreshtoken });
});

const refreshToken = catchAsync(async (req, res) => {
  const { accesstoken, refreshtoken } = await authService.handleRefreshToken(
    req.cookies.refreshtoken
  );

  authService.generateToken(res, accesstoken, refreshtoken);
  res.status(200).json({ accesstoken });
});

module.exports = { login, refreshToken };
