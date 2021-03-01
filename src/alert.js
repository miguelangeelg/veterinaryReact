import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const Alert = (props) => {
  const { onHideAlert, showAlert } = props;
  return (
    <Modal
      show={showAlert}
      onHide={onHideAlert}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        <Button className="color-close" onClick={props.onHideAlert}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default Alert;