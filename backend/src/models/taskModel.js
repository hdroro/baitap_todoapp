const mongoose = require("mongoose");
const { Schema } = mongoose;

const task = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo",
  },
});

const Task = mongoose.model("Task", task);
module.exports = { Task };
