const taskService = require("../service/task.service");
const catchAsync = require("../utils/catchAsync");

const readFunc = catchAsync(async (req, res) => {
  const { page, limit, title, progress } = req.query;
  const tasks = await taskService.getTaskPagniation(
    page,
    limit,
    title,
    progress
  );
  res.status(200).send(tasks);
});

const createFunc = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(201).send(task);
});

const updateFunc = catchAsync(async (req, res) => {
  const task = await taskService.editTask(req.params.id, req.body);
  res.status(200).send(task);
});

const deleteFunc = catchAsync(async (req, res) => {
  const task = await taskService.deleteTask(req.params.id);
  res.status(200).send(task);
});

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
