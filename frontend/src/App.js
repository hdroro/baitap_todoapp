import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected import
import NavHeader from "./components/Navigation/NavHeader";
import Task from "./components/Task/Task";
import { ToastContainer } from "react-toastify";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Router>
        <div className="app-header">
          <NavHeader />
        </div>
        <Routes>
          <Route path="/" Component={Home} exact={true}></Route>
          <Route path="/tasks" Component={Task}></Route>
          <Route path="/users" Component={User}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="*" Component={NotFound}></Route>
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
