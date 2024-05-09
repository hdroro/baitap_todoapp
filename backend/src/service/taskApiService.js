const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");

async function getTaskPagniation(
  page = 1,
  limit = 1,
  title = "",
  progress = ""
) {
  try {
    let data, totalPages;
    const totalCount = await Task.countDocuments({
      $and: [
        { title: { $regex: new RegExp(title, "i") } },
        { state: { $regex: new RegExp(progress, "i") } },
      ],
    });
    totalPages = Math.ceil(totalCount / limit);

    if (limit !== 1) {
      data = await Task.find({
        $and: [
          { title: { $regex: new RegExp(title, "i") } },
          { state: { $regex: new RegExp(progress, "i") } },
        ],
      })
        .populate("assignee", "username")
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      data = await Task.find({
        $and: [
          { title: { $regex: new RegExp(title, "i") } },
          { state: { $regex: new RegExp(progress, "i") } },
        ],
      });
    }
    let data_ = {
      data: data,
      totalPages: totalPages,
    };

    if (data_) {
      return {
        EM: "Get data success",
        EC: 0,
        DT: data_,
      };
    } else {
      return {
        EM: "Something wrongs with service heheh",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
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

    tasksave = await newTask.save();
    return {
      EM: "Create only new task successfully",
      EC: 0,
      DT: tasksave,
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

async function editTask(taskUpdateData) {
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

      const taskSwitch = await Task.findById(taskUpdateData.idTask);
      if (taskSwitch?.assignee) {
        const oldUser = await User.findById(taskSwitch.assignee);
        if (oldUser) {
          if (taskSwitch.assignee.toString() !== taskUpdateData.assignee) {
            oldUser.tasks = oldUser.tasks.filter(
              (task) => task.toString() !== taskUpdateData.idTask
            );
            await oldUser.save();
          }
        }
      }

      if (!newUserUpdate.tasks.includes(taskUpdateData.idTask))
        newUserUpdate.tasks.push(taskUpdateData.idTask);
      await newUserUpdate.save();
    }

    let { idTask, ...updateData } = taskUpdateData;

    let updatedTask = await Task.findByIdAndUpdate(
      taskUpdateData.idTask,
      updateData,
      {
        new: true,
      }
    );
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
