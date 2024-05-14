const { Task } = require("../models/task.model");
const { User, checkUsernameExist } = require("../models/user.model");
const ApiError = require("../utils/ApiError");

require("dotenv").config();

const bcypt = require("bcryptjs");
const salt = bcypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcypt.hashSync(password, salt);
};

async function getAllUsers(page = 1, limit = null, valueSearch = "") {
  const query = {
    name: { $regex: new RegExp(valueSearch, "i") },
  };

  const totalCount = await User.countDocuments(query);
  const totalPages = Math.ceil(totalCount / (limit || 1));

  let users;
  if (limit !== null) {
    users = await User.find(query)
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  } else {
    users = await User.find(query).sort({ _id: -1 });
  }

  let usersWithTasks = await Promise.all(
    users.map(async (user) => {
      let taskIds = user?.tasks?.map((t) => t?.toString());
      let tasks = [];
      if (taskIds && taskIds.length > 0) {
        tasks = await Promise.all(
          taskIds.map(async (taskId) => {
            return await Task.findById(taskId);
          })
        );
      }
      return {
        _id: user._id,
        username: user.username,
        name: user.name,
        tasks: tasks,
      };
    })
  );

  return {
    data: usersWithTasks,
    totalPages: totalPages,
  };
}

async function createUser(userData) {
  let { username, name } = userData;
  if (await checkUsernameExist(username)) {
    throw new ApiError(400, "The username already exist");
  }
  let hashPassword = hashUserPassword((password = process.env.PASSWORD));
  const newUser = new User({
    username: username,
    name: name,
    password: hashPassword,
  });
  await newUser.save();
}

const deleteUser = async (idUser) => {
  let user = await User.findById(idUser);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (user?.tasks?.length > 0) {
    user.tasks.map(async (item, index) => {
      const userAssigned = await Task.findById(item);
      userAssigned.assignee = null;
    });

    await user.save();
  }
  let userDeleted = await User.findByIdAndDelete(idUser);
  return userDeleted;
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
};
