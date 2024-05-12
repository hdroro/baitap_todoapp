const express = require("express");
const userController = require("../controller/userController");
const taskController = require("../controller/taskController");
const checkJWT = require("../middleware/jwtActions");

const router = express.Router();

// router.all("*", checkJWT.checkUserJWT);

router.get("/get-users", userController.readFunc);
router.post("/add-user", userController.createFunc);
router.delete("/delete-user/:id", userController.deleteFunc);

//task
router.get("/get-tasks", taskController.readFunc);
router.post("/add-task", taskController.createFunc);
router.put("/edit-task/:id", taskController.editFunc);
router.delete("/delete-task/:id", taskController.deleteFunc);

module.exports = router;
