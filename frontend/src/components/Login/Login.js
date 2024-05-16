/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import {
  handleRefreshToken,
  handleUserLogin,
} from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const defaultValidInput = {
    isValidUsername: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const navigate = useNavigate();

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    // let re = /\S+@\S+\.\S+/;
    if (!username) {
      toast.error("Please enter your username !");
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
      return false;
    }

    if (!password) {
      toast.error("Password is required !");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }

    return true;
  };

  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    let checkValid = isValidInputs();
    if (checkValid) {
      let response = await handleUserLogin(username, password);
      let token = response.accesstoken;
      if (response.code) {
        toast.error(response.message);
      } else {
        localStorage.setItem("accesstoken", token);
        navigate("/tasks");
        toast.success("Login successfully!");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="content-left col-12 w-50 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none d-flex justify-content-center">
              Login
            </div>
            <input
              type="text"
              className={`form-control ${
                objCheckInput.isValidUsername ? "" : "is-invalid"
              }`}
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="password"
              className={`form-control ${
                objCheckInput.isValidPassword ? "" : "is-invalid"
              }`}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyPress={(event) => handlePressEnter(event)}
            />
            <button className="btn btn-login" onClick={handleLogin}>
              Login
            </button>
            <span className="text-center">
              <a className="forgotten-password" href="#">
                Forgot your password?
              </a>
            </span>
            <div className="text-center forward-to-register">
              Don’t have an account?
              <span> Sign up</span>
            </div>
          </div>

          <div className="content-right col-12 d-none col-sm-7 d-sm-block">
            <div className="detail d-flex justify-content-center mt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
