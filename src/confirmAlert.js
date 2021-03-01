import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AlertConfirm = (props) => {
 
  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you wanna delete it?</Modal.Body>
        <Modal.Footer>
          <Button className="color-close" onClick={props.onHide} >
            Close
        </Button>
          <Button variant="danger" onClick={() => { props.confirmDelete() }} >
            Delete
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default AlertConfirm;