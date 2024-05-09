import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { createNewUser } from "../../../services/userService";

function ModalForm(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const defaultValidInput = {
    isValidUsername: true,
    isValidName: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);

    if (!username) {
      toast.error("Username is required !");
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
      return false;
    }

    if (!name) {
      toast.error("Name is required !");
      setObjCheckInput({ ...defaultValidInput, isValidName: false });
      return false;
    }

    return true;
  };

  const handleCreateUser = async () => {
    var checkValid = isValidInputs();

    if (checkValid) {
      const response = await createNewUser(username, name);
      if (response && +response.EC === 0) {
        toast.success(response.EM);
        props.handleCloseModalForm();
      } else {
        toast.error(response.EM);
      }
    }
  };
  return (
    <Modal
      size="sm"
      show={props.isShowModalForm}
      onHide={props.handleCloseModalForm}
      className="modal-user"
    >
      <Modal.Dialog style={{ margin: 0, maxWidth: "100%" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Create user</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="content-body">
            <div className="row">
              <div className="col-12 col-sm-12 form-group mb-2">
                <label>
                  <b>
                    Username (<span className="required-red">*</span>):
                  </b>
                </label>
                <input
                  className={`form-control ${
                    objCheckInput.isValidUsername ? "" : "is-invalid"
                  }`}
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>

              <div className="col-12 col-sm-12 form-group mb-2">
                <label>
                  <b>Name:</b>
                </label>
                <input
                  className={`form-control ${
                    objCheckInput.isValidName ? "" : "is-invalid"
                  }`}
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModalForm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Create
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default ModalForm;
