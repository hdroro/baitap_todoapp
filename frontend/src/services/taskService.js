import axios from "../setup/axios";

const fetchTaskPagniation = (page, limit, title, progress) => {
  return axios.get("/api/get-tasks", {
    params: {
      page,
      limit,
      title,
      progress,
    },
  });
};

const createNewTask = (title, content, assignee, state) => {
  return axios.post("api/add-task", {
    title,
    content,
    assignee,
    state,
  });
};

const editTask = (idTask, title, content, assignee, state) => {
  return axios.put("api/edit-task", {
    idTask,
    title,
    content,
    assignee,
    state,
  });
};

const deleteTask = (idTask) => {
  return axios.delete("/api/delete-task", {
    data: { idTask: idTask },
  });
};

export { fetchTaskPagniation, createNewTask, editTask, deleteTask };
