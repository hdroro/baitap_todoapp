const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getAllUsers = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
    valueSearch: Joi.string(),
  }),
};

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
};
