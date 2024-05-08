import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Modal.scss";
import { useState } from "react";
import { toast } from "react-toastify";

function ModalEdit(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [assgineeSelected, setAssgigneeSelected] = useState("");
  const [statusSelected, setStatusSelected] = useState("");

  const defaultValidInput = {
    isValidTitle: true,
    isValidContent: true,
    isValidStatus: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

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

    if (!statusSelected) {
      toast.error("Task status is required !");
      setObjCheckInput({ ...defaultValidInput, isValidStatus: false });
      return false;
    }
    return true;
  };

  const handleUpdateTask = () => {
    var checkValid = isValidInputs();

    if (checkValid) {
      console.log("title", title);
      console.log("content", content);
      console.log("assignee", assgineeSelected);
      console.log("status", statusSelected);
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
                <label>
                  <b>
                    Title (<span className="required-red">*</span>):
                  </b>
                </label>
                <input
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
                    <option defaultValue>--Select option--</option>
                    <option value="1">hdiem</option>
                    <option value="2">phuongha</option>
                    <option value="3">tson</option>
                  </select>
                </div>
                <div className="w-50">
                  <label className="form-label" htmlFor="status">
                    <b>
                      Status (<span className="required-red">*</span>):
                    </b>
                  </label>
                  <select
                    className={`form-select ${
                      objCheckInput.isValidStatus ? "" : "is-invalid"
                    }`}
                    id="status"
                    value={statusSelected}
                    onChange={(e) => setStatusSelected(e.target.value)}
                  >
                    <option defaultValue>--Select option--</option>
                    <option value="1">todo</option>
                    <option value="2">progress</option>
                    <option value="3">done</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModalEdit}>
            Cancer
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
