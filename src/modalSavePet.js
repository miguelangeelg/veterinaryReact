import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isEmpty } from 'lodash';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getInfoPet } from './actions';

const ModalSavePet = (props) => {

    const { submitsave, onHide, show, editMode, petID, submitEdit, setModalAlert, setModalSave, setBodyAlert } = props;
    const [input, setInput] = useState(
        {
            petName: "",
            petType: "",
            petBreed: "",
            petDateBirth: "",
            ownerNames: "",
            ownerSurnames: "",
            ownerPhone: "",
            ownerAddress: "",
            ownerEmail: ""
        });
    const [error, setError] = useState(null);
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        (async () => {
            if (editMode) {
                const infoPet = await getInfoPet("pets", petID);
                if (infoPet.statusR !== true) {
                    return;
                }
                const data = infoPet.data;
                setInput({
                    petName: data.petName,
                    petType: data.petType,
                    petBreed: data.petBreed,
                    petDateBirth: data.petDateBirth,
                    ownerNames: data.ownerNames,
                    ownerSurnames: data.ownerSurnames,
                    ownerPhone: data.ownerPhone,
                    ownerAddress: data.ownerAddress,
                    ownerEmail: data.ownerEmail
                });
                console.log(infoPet)
            }
        })();
    }, []);

    const submitSaveModal = () => {
        let validState = isValid(input);
        if (!validState.statusValid) {
            setError(validState.error);
            return;
        }
        if (!editMode) {
            setBodyAlert("The pet was saved successfully");
            submitsave(input);
            cleanInputs();
            setModalAlert(true);
            setModalSave(false);
        } else {
            setBodyAlert("The pet was updatedd successfully");
            submitEdit(petID, input);
            cleanInputs();
            setModalAlert(true);
            setModalSave(false);

        }
        //cleanInputs();
    }

    const isValid = (pet) => {
        let statusValid = { statusValid: true, error: [] };

        if (pet === undefined) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the information");
            return statusValid;
        }

        if (isEmpty(pet.petName)) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the pet name");
        }
        if (isEmpty(pet.petType)) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the pet type");
        }
        if (isEmpty(pet.petBreed)) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the pet breed");
        }
        if (isEmpty(pet.petDateBirth)) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the pet birth");
        }
        if (isEmpty(pet.ownerNames)) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the owner names");
        }

        if (isEmpty(pet.ownerSurnames)) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the owner surnames");
        }
        if (isEmpty(pet.ownerPhone)) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the owner phone");
        }
        if (isEmpty(pet.ownerAddress)) {
            statusValid.statusValid = false;
            statusValid.error.push("Entry the owner address");
        }

        return statusValid;
    }

    const cleanInputs = () => {
        setInput(
            {
                petName: "",
                petType: "",
                petBreed: "",
                petDateBirth: "",
                ownerNames: "",
                ownerSurnames: "",
                ownerPhone: "",
                ownerAddress: "",
                ownerEmail: ""
            });
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    {editMode === false ? ("Add a pet") : ("Edit pet")
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    submitSaveModal();
                }} >
                    <Form.Group >
                        <Form.Label>Pet Name</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="petName" type="text" placeholder="Pet Name" value={input.petName} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Pet Type</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="petType" type="text" placeholder="Pet Type" value={input.petType} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Pet Breed</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="petBreed" type="text" placeholder="Pet Breed" value={input.petBreed} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Pet Birth</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="petDateBirth" type="date" value={input.petDateBirth} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Owner Names</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="ownerNames" placeholder="Owner Names" value={input.ownerNames} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Owner Surnames</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="ownerSurnames" type="text" placeholder="Owner Surnames" value={input.ownerSurnames} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Owner Phone</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="ownerPhone" type="number" value={input.ownerPhone} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Owner Email</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="ownerEmail" type="email" value={input.ownerEmail} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Owner address</Form.Label>
                        <Form.Control onChange={(e) => { onChange(e) }} name="ownerAddress" type="text" placeholder="Owner Address" value={input.ownerAddress} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Button className="btn-block color-close" variant="primary" type="submit">
                        Submit
                </Button>
                    {
                        error !== null && (error.map(err => {
                            return (
                                <div className="alert alert-danger mt-2 mb-2" role="alert" key={err}>
                                    {err}
                                </div>
                            )
                        }))


                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="color-close" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalSavePet;