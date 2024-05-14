const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");
const ApiError = require("../utils/ApiError");

async function getTaskPagniation(
  page = 1,
  limit = null,
  title = "",
  progress = ""
) {
  const query = {
    $and: [
      { title: { $regex: new RegExp(title, "i") } },
      { state: { $regex: new RegExp(progress, "i") } },
    ],
  };

  const totalCount = await Task.countDocuments(query);
  const totalPages = Math.ceil(totalCount / (limit || 1));

  let data;
  if (limit !== null) {
    data = await Task.find(query)
      .populate("assignee", "username")
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  } else {
    data = await Task.find(query).sort({ _id: -1 });
  }

  return { data, totalPages };
}

async function createTask(taskData) {
  const newTask = new Task(taskData);
  if (taskData?.assignee) {
    const user = await User.findById(taskData.assignee);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    user.tasks.push(newTask);
    user.save();
  } else newTask.assignee = null;

  savedTask = await newTask.save();
  return savedTask;
}

async function editTask(idTask, taskUpdateData) {
  let idUser = taskUpdateData.assignee;
  if (+idUser === 0) taskUpdateData.assignee = null;
  let newUserUpdate;
  if (idUser != 0) {
    newUserUpdate = await User.findById(idUser);
    if (!newUserUpdate) {
      throw new ApiError(404, "User not found");
    }

    const taskSwitch = await Task.findById(idTask);
    if (!taskSwitch) {
      throw new ApiError(404, "Task not found");
    }
    if (taskSwitch?.assignee) {
      const oldUser = await User.findById(taskSwitch.assignee);
      if (oldUser) {
        if (taskSwitch.assignee.toString() !== idUser) {
          oldUser.tasks = oldUser.tasks.filter(
            (task) => task.toString() !== idTask
          );
          await oldUser.save();
        }
      }
    }

    if (!newUserUpdate.tasks.includes(idTask)) newUserUpdate.tasks.push(idTask);
    await newUserUpdate.save();
  }

  let updatedTask = await Task.findByIdAndUpdate(idTask, taskUpdateData, {
    new: true,
  });

  return updatedTask;
}

const deleteTask = async (idTask) => {
  let task = await Task.findById(idTask);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task?.assignee) {
    const taskAssigneed = await User.findById(task.assignee);
    if (taskAssigneed) {
      taskAssigneed.tasks = taskAssigneed.tasks.filter(
        (task) => task.toString() != idTask
      );
      await taskAssigneed.save();
    }
  }
  taskDeleted = await Task.findByIdAndDelete(idTask);
  return taskDeleted;
};

module.exports = {
  getTaskPagniation,
  createTask,
  editTask,
  deleteTask,
};
