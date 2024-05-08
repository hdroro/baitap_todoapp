import axios from "../setup/axios";

const fetchAllUsers = () => {
  return axios.get("/api/get-users");
};

const createNewUser = (username, name) => {
  return axios.post("/api/add-user", { username, name });
};

export { fetchAllUsers, createNewUser };
