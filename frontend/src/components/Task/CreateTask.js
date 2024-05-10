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

  const defaultValidInput = {
    isValidTitle: true,
    isValidContent: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

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

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!title.trim()) {
      toast.error("Task title is required !");
      setObjCheckInput({ ...defaultValidInput, isValidTitle: false });
      return false;
    }

    if (!content.trim()) {
      toast.error("Task content is required !");
      setObjCheckInput({ ...defaultValidInput, isValidContent: false });
      return false;
    }

    return true;
  };

  const handleCreateTask = async () => {
    var checkValid = isValidInputs();

    if (checkValid) {
      let response = await createNewTask(
        title.trim(),
        content.trim(),
        assgineeSelected
      );
      if (response && +response.EC === 0) {
        toast.success(response.EM);
        setTitle("");
        setContent("");
        setAssgigneeSelected("");
        onChangeCreate();
      } else {
        toast.error(response.EM);
      }
    }
  };

  console.log(assgineeSelected);
  return (
    <div className="container container-task mt-5">
      <h4 className="d-flex ">Create Task</h4>
      <div className="container mt-3">
        <div className="d-flex gap-3 w-100">
          <div className="mb-3 w-50">
            <label htmlFor="title" className="form-label">
              <b>
                Title (<span className="required-red">*</span>):
              </b>
            </label>
            <input
              type="text"
              className={`form-control ${
                objCheckInput.isValidTitle ? "" : "is-invalid"
              }`}
              id="title"
              placeholder="Enter title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-50">
            <label htmlFor="assignee" className="form-label">
              <b>Assignee</b>
            </label>
            <select
              className="form-select"
              id="assignee"
              onChange={(event) =>
                setAssgigneeSelected(
                  event.target.value === "--Select option--"
                    ? null
                    : event.target.value
                )
              }
              value={assgineeSelected}
            >
              <option defaultValue={0}>--Select option--</option>
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.username}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            <b>
              Content (<span className="required-red">*</span>):
            </b>
          </label>
          <textarea
            className={`form-control ${
              objCheckInput.isValidContent ? "" : "is-invalid"
            }`}
            id="content"
            rows="3"
            placeholder="Enter content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
