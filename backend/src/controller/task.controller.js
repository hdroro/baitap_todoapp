const taskService = require("../service/task.service");

const readFunc = async (req, res) => {
  try {
    const { page, limit, title, progress } = req.query;
    const tasks = await taskService.getTaskPagniation(
      page,
      limit,
      title,
      progress
    );
    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const createFunc = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    return res.status(201).send(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const updateFunc = async (req, res) => {
  try {
    const task = await taskService.editTask(req.params.id, req.body);
    return res.status(200).send(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const deleteFunc = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    return res.status(200).send(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
