
import React, { useState, useEffect } from 'react';
import { getPets, getInfoPet, addPet, updatePet, deletePet } from './actions';
import { size } from 'lodash';
import './App.css';
import { BoxLoading } from 'react-loadingg';
import TablePets from './table';
import ModalInfo from './modal';
import logo from './logo.png';
import ModalSavePet from './modalSavePet';
import AlertConfirm from './confirmAlert';
import Alert from './alert';

function App() {

  const [pets, setPets] = useState(null);
  const [petsReady, setPetsReady] = useState(false)
  const [modal, setModal] = useState(false);
  const [modalSave, setModalSave] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [editMode, setEditMode] = useState(false)
  const [petInfo, setPetInfo] = useState("");
  const [petID, setPetID] = useState(null);
  const [bodyAlert, setBodyAlert] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [acceptDelete, setAcceptDelete] = useState(false)


  useEffect(() => {
    (async () => {
      const pets = await getPets("pets");
      if (pets.statusR === false) {
        return;
      }
      setPets(pets.data);
      setPetsReady(true);
    })()
  }, [])


  const DeletePet = (ID) => {
    setShowDelete(true);
    setPetID(ID);
  }

  const confirmDelete = async () => {
    const resultDelete = await deletePet("pets", petID);
    if (resultDelete.statusR !== true) {
      return;
    }
    const petsAux = pets.filter(petI => petI.id !== petID);
    setPets(petsAux);
    setBodyAlert("The pet was deleted successfully");
    setModalAlert(true);
    setShowDelete(false);
  }

  const savePet = async (newPet) => {

    const result = await addPet("pets", newPet);

    if (!result.statusR) {
      return;
    }

    newPet.id = result.data;

    setPets([...pets, newPet]);
  }

  const editPet = async (pet_ID, data) => {
    const result = await updatePet("pets", pet_ID, data);
    if (result.statusR !== true) {
      return;
    }
    setPets(pets.map(petI => petI.id !== pet_ID ? petI : { ...data, id: pet_ID }));

    console.log(pets)
  }


  const MoreInfo = async (id) => {
    const pet = await getInfoPet("pets", id);
    if (pets.statusR === false) {
      return;
    }
    setPetInfo(pet.data);
    setModal(true);
  }

  const submitSave = (data) => {
    savePet(data);
  }

  const submitEdit = (pet_ID, data) => {
    editPet(pet_ID, data);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-8">
          <img className="mb-5" src={logo} alt="https://i.pinimg.com/564x/cf/9c/0b/cf9c0b4e69a7e2433c2913c46f940713.jpg." />
        </div>
        <div className="col-4">
          <div align="center" className="mt-5  " >
            <button onClick={() => { setModalSave(true); setEditMode(false) }} className="btn mt-5 btn-block btnAddPet" ><strong>Add Pet</strong></button>
          </div>
        </div>
      </div>
      {
        modalSave &&
        <ModalSavePet
          submitsave={submitSave}
          onHide={() => setModalSave(false)}
          editMode={editMode}
          show={modalSave}
          setModalSave={setModalSave}
          petID={petID}
          submitEdit={submitEdit}
          setModalAlert={setModalAlert}
          setBodyAlert={setBodyAlert}
        />
      }
      {
        <Alert
          title="successfully"
          body={bodyAlert}
          showAlert={modalAlert}
          onHideAlert={() => setModalAlert(false)}
        />
      }
      {
        <AlertConfirm
          show={showDelete}
          onHide={() => setShowDelete(false)}
          setAcceptDelete={setAcceptDelete}
          confirmDelete={confirmDelete}
        />
      }

      {
        size(pets) > 0 && petsReady ? (
          <div>
            { modal === true && (
              <ModalInfo onHide={() => setModal(false)} setEditMode={setEditMode} show={modal} pet={petInfo} title="Pet Information" />
            )
            }
            <TablePets
              pets={pets}
              MoreInfo={MoreInfo}
              setEditMode={setEditMode}
              setModalSave={setModalSave}
              setPetID={setPetID}
              DeletePet={DeletePet}
              setShowDelete={setShowDelete}
            />
          </div>
        ) : (
            petsReady ? (
              <div className="alert alert-custom" role="alert">
                <div align="center"><strong>No pets registered</strong></div>
              </div>
            ) : (< BoxLoading color="#956da5" />)
          )
      }
    </div>
  );
}

export default App;
