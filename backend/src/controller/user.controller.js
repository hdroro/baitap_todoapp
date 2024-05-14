const userService = require("../service/user.service");

const readFunc = async (req, res) => {
  try {
    const { page, limit, searchValue } = req.query;
    const users = await userService.getAllUsers(page, limit, searchValue);
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const createFunc = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const deleteFunc = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  readFunc,
  createFunc,
  deleteFunc,
};
