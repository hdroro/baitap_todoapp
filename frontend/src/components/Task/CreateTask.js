import { useState } from "react";
import "./Task.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [assgineeSelected, setAssgigneeSelected] = useState("");
  // const [statusSelected, setStatusSelected] = useState("");

  const defaultValidInput = {
    isValidTitle: true,
    isValidContent: true,
    // isValidStatus: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const handleChangeTitle = (value) => {
    setTitle(value);
  };

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const handleOnChangeAssignee = (value) => {
    setAssgigneeSelected(value);
    console.log(value);
  };

  // const handleOnChangeStatus = (value) => {
  //   setStatusSelected(value);
  //   console.log(value);
  // };

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!title) {
      toast.error("Task title is required !");
      setObjCheckInput({ ...defaultValidInput, isValidTitle: false });
      return false;
    }

    if (!content) {
      toast.error("Task content is required !");
      setObjCheckInput({ ...defaultValidInput, isValidContent: false });
      return false;
    }

    // if (!statusSelected) {
    //   toast.error("Task status is required !");
    //   setObjCheckInput({ ...defaultValidInput, isValidStatus: false });
    //   return false;
    // }
    return true;
  };

  const handleCreateTask = () => {
    var checkValid = isValidInputs();

    if (checkValid) {
      console.log("title", title);
      console.log("content", content);
      console.log("assignee", assgineeSelected);
      // console.log("status", statusSelected);
    }
  };
  return (
    <div className="container container-task mt-5">
      <h4 className="d-flex ">Create Task</h4>
      <div className="container mt-3">
        <div className="d-flex gap-3 w-100">
          <div className="mb-3 w-50">
            <label htmlFor="title" className="form-label">
              <b>Title</b>
            </label>
            <input
              type="text"
              className={`form-control ${
                objCheckInput.isValidTitle ? "" : "is-invalid"
              }`}
              id="title"
              placeholder="Enter title here..."
              value={title}
              onChange={(e) => handleChangeTitle(e.target.value)}
            />
          </div>

          <div className="w-50">
            <label htmlFor="assignee" className="form-label">
              <b>Assignee</b>
            </label>
            <select
              className="form-select"
              id="assignee"
              onChange={(event) => handleOnChangeAssignee(event.target.value)}
              value={assgineeSelected}
            >
              <option defaultValue>--Select option--</option>
              <option value="1">hdiem</option>
              <option value="2">phuongha</option>
              <option value="3">tson</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            <b>Content</b>
          </label>
          <textarea
            className={`form-control ${
              objCheckInput.isValidContent ? "" : "is-invalid"
            }`}
            id="content"
            rows="3"
            placeholder="Enter content here..."
            value={content}
            onChange={(e) => handleChangeContent(e.target.value)}
          ></textarea>
        </div>

        <button
          type="button"
          className="btn btn-primary  mt-1 me-1 float-end"
          onClick={handleCreateTask}
        >
          Create task
        </button>
      </div>
    </div>
  );
}

export default CreateTask;
