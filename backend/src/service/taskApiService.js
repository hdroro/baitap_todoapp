const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");

async function getTaskPagniation(page = 1, limit = 5, title = "") {
  try {
    const totalCount = await Task.countDocuments({
      title: { $regex: new RegExp(title, "i") },
    });

    const totalPages = Math.ceil(totalCount / limit);
    const data = await Task.find({
      title: { $regex: new RegExp(title, "i") },
    })
      .populate("assignee", "username")
      .skip((page - 1) * limit)
      .limit(limit);

    let data_ = {
      data: data,
      totalPages: totalPages,
    };

    if (data_) {
      return {
        EM: "get data success",
        EC: 0,
        DT: data_,
      };
    } else {
      return {
        EM: "something wrongs with service heheh",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
}

async function createTask(taskData) {
  try {
    const newTask = new Task(taskData);
    if (taskData.assignee) {
      const user = await User.findById(taskData.assignee);
      if (!user) {
        return {
          EM: "This user is not exist!",
          EC: 1,
        };
      }
      user.tasks.push(newTask);
      return {
        EM: "create task and task assigneed for user successfully",
        EC: 0,
        DT: [],
      };
    }
    tasksave = await newTask.save();
    return {
      EM: "create only new task successfully",
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

async function editTask(taskId, taskUpdateData) {
  //task cần update và dữ liệu udpdate
  try {
    let idUser = taskUpdateData.assignee;
    if (idUser) {
      let newUserUpdate = await User.findById(idUser);
      if (!newUserUpdate) {
        return {
          EM: "This user is not exist!",
          EC: 1,
        };
      }
      const taskSwitch = await Task.findById(taskId);

      if (taskSwitch.assignee) {
        const oldUser = await User.findById(taskSwitch.assignee.toString());
        if (oldUser) {
          oldUser.tasks = oldUser.tasks.filter(
            (task) => task.toString() != taskId
          );
          await oldUser.save();
        }
      }

      if (!newUserUpdate.tasks.includes(taskId))
        newUserUpdate.tasks.push(taskId);
      await newUserUpdate.save();
    }
    let anotherData = await Task.findByIdAndUpdate(taskId, taskUpdateData, {
      new: true,
    });
    if (anotherData) {
      return {
        EM: "edit task successfully",
        EC: 0,
        DT: anotherData,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service....",
      EC: 1,
      DT: [],
    };
  }
}

const deleteTask = async (idTask) => {
  try {
    let task = await Task.findById(idTask);

    if (task.assignee) {
      const taskAssigneed = await User.findById(task.assignee);
      console.log("taskAssigneed", taskAssigneed);
      if (taskAssigneed) {
        taskAssigneed.tasks = taskAssigneed.tasks.filter(
          (task) => task.toString() != idTask
        );
        await taskAssigneed.save();
      }
      taskDeleted = await Task.findByIdAndDelete(idTask);
      return {
        EM: "delete task successfully",
        EC: 2,
        DT: taskDeleted,
      };
    } else {
      return {
        EM: "Task not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service",
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
