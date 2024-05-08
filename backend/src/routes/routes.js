const express = require("express");
const userController = require("../controller/userController");
const taskController = require("../controller/taskController");

const router = express.Router();

router.get("/get-users", userController.readFunc);
router.post("/add-user", userController.createFunc);

//task
router.get("/get-tasks", taskController.readFunc);
router.post("/add-task", taskController.createFunc);
router.put("/edit-task", taskController.editFunc);
router.delete("/delete-task", taskController.deleteFunc);

module.exports = router;
