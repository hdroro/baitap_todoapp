const userService = require("../service/userApiService");

const readFunc = async (req, res) => {
  try {
    const { page, limit, searchValue } = req.query;
    let data = await userService.getAllUsers(page, limit, searchValue);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const createFunc = async (req, res) => {
  try {
    let data;
    let { username, name } = req.body;
    if (!username) {
      return res.status(200).json({
        EM: "Missing required parameters", //error message
        EC: "-1", // error code
        DT: "", //data
      });
    }

    data = await userService.createUser(username, name);

    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let idUser = req.params.id;
    if (idUser) {
      let data = await userService.deleteUser(idUser);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  deleteFunc,
};
