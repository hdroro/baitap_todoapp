import { useEffect, useState } from "react";
import "./Task.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { createNewTask } from "../../services/taskService";
import { fetchAllUsers } from "../../services/userService";

function CreateTask({ onChangeCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [assgineeSelected, setAssgigneeSelected] = useState("");
  // const [statusSelected, setStatusSelected] = useState("");

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    const data = await fetchAllUsers();
    if (data && +data.EC === 0) {
      setListUsers(data.DT.data);
    } else {
      toast.error(data.EM);
    }
  };

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

    return true;
  };

  const handleCreateTask = async () => {
    var checkValid = isValidInputs();

    if (checkValid) {
      let response = await createNewTask(title, content, assgineeSelected);
      if (response && +response.EC === 0) {
        toast.success(response.EM);
        fetchAllUser();
      } else {
        toast.error(response.EM);
      }
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
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item, index) => (
                  <option value={item._id}>{item.username}</option>
                ))}
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
