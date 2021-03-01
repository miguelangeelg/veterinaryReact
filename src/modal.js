import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalInfo = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="table-responsive">
            <table className="table">
              <thead className="color-head">
                <tr>
                  <th>Pet Name</th>
                  <th>Pet Type</th>
                  <th>Pet Breed</th>
                  <th>Pet Birth day</th>
                  <th>Owner Name</th>
                  <th>Owner Email</th>
                  <th>Owner Phone</th>
                  <th>Owner Address</th>
                </tr>
              </thead>
              <tbody>
                {

                  <tr key={props.pet.id}>
                    <td>{props.pet.petName}</td>
                    <td>{props.pet.petType}</td>
                    <td>{props.pet.petBreed}</td>
                    <td>{props.pet.petDateBirth}</td>
                    <td>{props.pet.ownerNames} {props.pet.ownerSurnames}</td>
                    <td>{props.pet.ownerEmail} </td>
                    <td>{props.pet.ownerPhone}</td>
                    <td>{props.pet.ownerAddress}</td>
                  </tr>

                }
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="color-close" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalInfo;