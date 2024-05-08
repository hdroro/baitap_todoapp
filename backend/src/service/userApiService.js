const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");
require("dotenv").config();

const bcypt = require("bcryptjs");

const salt = bcypt.genSaltSync(10);

const hashUserPassword = (password) => {
  //   console.log(bcypt.compareSync(password, bcypt.hashSync(password, salt)));
  return bcypt.hashSync(password, salt);
};

const checkUsernameExist = async (username) => {
  let user = await User.findOne({ username: username });

  if (user) return true;
  return false;
};

async function getAllUsers() {
  try {
    let users = await User.find();
    let usersWithTasks = await Promise.all(
      users.map(async (user) => {
        let taskIds = user.tasks.map((t) => t.toString());
        let tasks = await Promise.all(
          taskIds.map(async (taskId) => {
            return await Task.findById(taskId);
          })
        );
        return {
          id: user._id,
          username: user.username,
          name: user.name,
          tasks: tasks,
        };
      })
    );

    return {
      EM: "get data success",
      EC: 0,
      DT: usersWithTasks,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
}

async function createUser(username, name) {
  try {
    let isUsernameExist = await checkUsernameExist(username);
    if (isUsernameExist) {
      return {
        EM: "The username is already exist!",
        EC: 1,
      };
    }

    let hashPassword = hashUserPassword((password = process.env.PASSWORD));
    const newUser = new User({
      username: username,
      name: name,
      password: hashPassword,
    });
    await newUser.save();

    return {
      EM: "Create a user successfully!",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
}

module.exports = {
  getAllUsers,
  createUser,
};
