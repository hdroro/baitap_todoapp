import axios from "../setup/axios";

const handleUserLogin = (username, password) => {
  return axios.post("/api/auth/login", {
    username,
    password,
  });
};

const handleRefreshToken = (refreshtoken) => {
  return axios.post("/api/refresh", {
    refreshtoken,
  });
};

export { handleUserLogin, handleRefreshToken };
