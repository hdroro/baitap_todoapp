import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Modal.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAllUsers } from "../../../services/userService";
import { editTask } from "../../../services/taskService";

function ModalEdit(props) {
  const data = props.dataModal;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [assgineeSelected, setAssgigneeSelected] = useState("");
  const [statusSelected, setStatusSelected] = useState("");
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      const data = await fetchAllUsers();
      setListUsers(data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const defaultValidInput = {
    isValidTitle: true,
    isValidContent: true,
    isValidStatus: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

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

    if (!statusSelected) {
      toast.error("Task state is required !");
      setObjCheckInput({ ...defaultValidInput, isValidStatus: false });
      return false;
    }
    return true;
  };

  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
    setAssgigneeSelected(data?.assignee ? data.assignee._id : "0");
    setStatusSelected(data.state);
  }, [data]);

  const handleUpdateTask = async () => {
    var checkValid = isValidInputs();

    if (checkValid) {
      let response = await editTask(
        data._id,
        title.trim(),
        content.trim(),
        assgineeSelected,
        statusSelected
      );
      if (response.code) {
        toast.error(response.message);
      } else {
        toast.success("Update successfully!");
        props.onChangeAction();
        props.handleCloseModalEdit();
      }
    }
  };
  return (
    <Modal
      size="lg"
      show={props.isShowModalEdit}
      onHide={props.handleCloseModalEdit}
      className="modal-user"
    >
      <Modal.Dialog style={{ margin: 0, maxWidth: "100%" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Edit task</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="content-body">
            <div className="row">
              <div className="col-12 col-sm-12 form-group mb-2">
                <label htmlFor="title" className="form-label">
                  <b>
                    Title (<span className="required-red">*</span>):
                  </b>
                </label>
                <input
                  id="title"
                  className={`form-control ${
                    objCheckInput.isValidTitle ? "" : "is-invalid"
                  }`}
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="col-12 col-sm-12 form-group mb-2">
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
                  onChange={(event) => setContent(event.target.value)}
                ></textarea>
              </div>

              <div className="d-flex gap-3 w-100 mb-2">
                <div className="w-50">
                  <label htmlFor="assignee" className="form-label">
                    <b>Assignee</b>
                  </label>
                  <select
                    className="form-select"
                    id="assignee"
                    value={assgineeSelected}
                    onChange={(e) => setAssgigneeSelected(e.target.value)}
                  >
                    <option value="0">--Select option--</option>
                    {listUsers &&
                      listUsers.length > 0 &&
                      listUsers.map((item, index) => (
                        <option value={item._id} key={index}>
                          {item.username}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-50">
                  <label className="form-label" htmlFor="state">
                    <b>
                      Status (<span className="required-red">*</span>):
                    </b>
                  </label>
                  <select
                    className={`form-select ${
                      objCheckInput.isValidStatus ? "" : "is-invalid"
                    }`}
                    id="state"
                    value={statusSelected}
                    onChange={(e) => setStatusSelected(e.target.value)}
                  >
                    <option value="todo">todo</option>
                    <option value="inprogress">inprogress</option>
                    <option value="done">done</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModalEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateTask}>
            Update
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default ModalEdit;
