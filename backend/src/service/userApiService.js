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

async function getAllUsers(page = 1, limit = 5, valueSearch = "") {
  try {
    const totalCount = await User.countDocuments({
      name: { $regex: new RegExp(valueSearch, "i") },
    });

    const totalPages = Math.ceil(totalCount / limit);
    let users;
    if (limit === 5) {
      users = await User.find({
        name: { $regex: new RegExp(valueSearch, "i") },
      });
    } else {
      users = await User.find({
        name: { $regex: new RegExp(valueSearch, "i") },
      })
        .skip((page - 1) * limit)
        .limit(limit);
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

    let data = {
      data: usersWithTasks,
      totalPages: totalPages,
    };

    return {
      EM: "Get data success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
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
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
}

const deleteUser = async (idUser) => {
  try {
    let user = await User.findById(idUser);

    if (user?.tasks?.length > 0) {
      user.tasks.map(async (item, index) => {
        const userAssigned = await Task.findById(item);
        userAssigned.assignee = null;
      });

      await user.save();
    }
    userDelete = await User.findByIdAndDelete(idUser);
    return {
      EM: "Delete user successfully",
      EC: 0,
      DT: userDelete,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 2,
      DT: [],
    };
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
};
