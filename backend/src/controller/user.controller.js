const userService = require("../service/user.service");
const catchAsync = require("../utils/catchAsync");

const readFunc = catchAsync(async (req, res) => {
  const { page, limit, searchValue } = req.query;
  const users = await userService.getAllUsers(page, limit, searchValue);
  res.status(200).send(users);
});

const createFunc = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).send(user);
});

const deleteFunc = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(200).send();
});

module.exports = {
  readFunc,
  createFunc,
  deleteFunc,
};
