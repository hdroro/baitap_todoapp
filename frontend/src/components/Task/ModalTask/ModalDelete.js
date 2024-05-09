import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete(props) {
  return (
    <Modal
      show={props.isShowModalDelete}
      onHide={props.handleCloseModalDelete}
      centered
    >
      <Modal.Dialog style={{ margin: 0 }}>
        <Modal.Header closeButton>
          <Modal.Title>
            Delete {props.isDeleteUser ? "user" : "task"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure to delete this {props.isDeleteUser ? "user" : "task"}?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModalDelete}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default ModalDelete;
