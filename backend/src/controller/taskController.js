const taskService = require("../service/taskApiService");

const readFunc = async (req, res) => {
  try {
    const { page, limit, title } = req.query;
    let data = await taskService.getTaskPagniation(page, limit, title);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const createFunc = async (req, res) => {
  try {
    console.log("req.body", req.body);
    let data = await taskService.createTask(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const editFunc = async (req, res) => {
  try {
    console.log("req.bodyreq.body", req.body);
    let idTask = req.body.idTask;
    let data = await taskService.editTask(idTask, req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let idTask = req.body.idTask;
    if (idTask) {
      let data = await taskService.deleteTask(idTask);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  editFunc,
  deleteFunc,
};
