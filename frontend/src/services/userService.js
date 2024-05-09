import axios from "../setup/axios";

const fetchAllUsers = (page, limit, searchValue) => {
  return axios.get("/api/get-users", {
    params: {
      page,
      limit,
      searchValue,
    },
  });
};

const createNewUser = (username, name) => {
  return axios.post("/api/add-user", { username, name });
};

const deleteUser = (idUser) => {
  return axios.delete("/api/delete-user", {
    data: { idUser: idUser },
  });
};

export { fetchAllUsers, createNewUser, deleteUser };
