import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected import
import NavHeader from "./components/Navigation/NavHeader";
import Task from "./components/Task/Task";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <div className="app-header">
          <NavHeader />
        </div>
        <Routes>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="/task" Component={Task}></Route>
          <Route path="*">404 NOT FOUND</Route>
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
