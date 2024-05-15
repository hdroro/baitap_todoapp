const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getAllTasks = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
    title: Joi.string(),
    progress: Joi.string(),
  }),
};

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    assignee: Joi.string().custom(objectId).allow("", null),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      assignee: Joi.string().allow("", null),
      state: Joi.string(),
    })
    .min(2),
};

const deleteTask = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
