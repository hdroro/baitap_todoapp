import axios from "../setup/axios";

const handleUserLogin = (username, password) => {
  return axios.post("/api/auth/login", {
    username,
    password,
  });
};

export { handleUserLogin };
