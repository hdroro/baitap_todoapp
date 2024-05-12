const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");

async function getTaskPagniation(
  page = 1,
  limit = 1,
  title = "",
  progress = ""
) {
  try {
    const query = {
      $and: [
        { title: { $regex: new RegExp(title, "i") } },
        { state: { $regex: new RegExp(progress, "i") } },
      ],
    };

    const totalCount = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    let data;
    if (limit !== 1) {
      data = await Task.find(query)
        .populate("assignee", "username")
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      data = await Task.find(query);
    }

    return {
      EM: "Get data success",
      EC: 0,
      DT: { data, totalPages },
    };
  } catch (error) {
    console.error(error);
    return {
      EM: "Something went wrong with the service",
      EC: 1,
      DT: [],
    };
  }
}

async function createTask(taskData) {
  try {
    const newTask = new Task(taskData);
    if (taskData?.assignee) {
      const user = await User.findById(taskData.assignee);
      if (!user) {
        return {
          EM: "This user is not exist!",
          EC: 1,
        };
      }
      user.tasks.push(newTask);
      user.save();
    } else newTask.assignee = null;

    savedTask = await newTask.save();
    return {
      EM: "Create only new task successfully",
      EC: 0,
      DT: savedTask,
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

async function editTask(idTask, taskUpdateData) {
  try {
    let idUser = taskUpdateData.assignee;
    if (+idUser === 0) taskUpdateData.assignee = null;
    let newUserUpdate;
    if (idUser != 0) {
      newUserUpdate = await User.findById(idUser);
      if (!newUserUpdate) {
        return {
          EM: "This user is not exist!",
          EC: 1,
        };
      }

      const taskSwitch = await Task.findById(idTask);
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

      if (!newUserUpdate.tasks.includes(idTask))
        newUserUpdate.tasks.push(idTask);
      await newUserUpdate.save();
    }

    let updatedTask = await Task.findByIdAndUpdate(idTask, taskUpdateData, {
      new: true,
    });
    if (updatedTask) {
      return {
        EM: "Edit task successfully",
        EC: 0,
        DT: updatedTask,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service....",
      EC: 1,
      DT: [],
    };
  }
}

const deleteTask = async (idTask) => {
  try {
    let task = await Task.findById(idTask);

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
    return {
      EM: "Delete task successfully",
      EC: 0,
      DT: taskDeleted,
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
  getTaskPagniation,
  createTask,
  editTask,
  deleteTask,
};
