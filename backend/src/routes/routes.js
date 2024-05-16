const express = require("express");
const userController = require("../controller/user.controller");
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");
const checkJWT = require("../middleware/authmiddleware");

const validate = require("../middleware/validate");
const {
  userValidation,
  taskValidation,
  authValidation,
} = require("../validations");

const router = express.Router();

router.post(
  "/refresh",
  validate(authValidation.refreshTokens),
  authController.refreshToken
);

router.all("*", checkJWT.checkUserJWT);

//auth
router.post(
  "/auth/login",
  validate(authValidation.login),
  authController.login
);

//users
router.get("/get-users", userController.readFunc);
router.post(
  "/add-user",
  validate(userValidation.createUser),
  userController.createFunc
);
router.delete(
  "/delete-user/:id",
  validate(userValidation.deleteUser),
  userController.deleteFunc
);

//task
router.get("/get-tasks", taskController.readFunc);
router.post(
  "/add-task",
  validate(taskValidation.createTask),
  taskController.createFunc
);
router.put(
  "/edit-task/:id",
  validate(taskValidation.updateTask),
  taskController.updateFunc
);
router.delete(
  "/delete-task/:id",
  validate(taskValidation.deleteTask),
  taskController.deleteFunc
);

module.exports = router;
