import axios from "../setup/axios";

const fetchTaskPagniation = (page, limit, title) => {
  return axios.get("/api/get-tasks", {
    params: {
      page,
      limit,
      title,
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
  return axios.put("api/add-task", {
    idTask,
    title,
    content,
    assignee,
    state,
  });
};

const deleteTask = (idTask) => {
  return axios.delete("/api/delete-task", {
    data: { id: idTask },
  });
};

export { fetchTaskPagniation, createNewTask, editTask, deleteTask };
