import React from 'react';

const TablePets = (props) => {

  return (
    <div>
      <div className="table-responsive">
        <div className="alert alert-custom" role="alert">
          <div align="center"><strong>Pets Registered</strong></div>
        </div>
        <table className="table">
          <thead className="color-head">
            <tr>
              <th>Pet Name</th>
              <th>Pet Type</th>
              <th>Peet Breed</th>
              <th>Owner</th>
              <th>More info</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.pets.map((pet) => {
              return (
                <tr key={pet.id}>
                  <td>{pet.petName}</td>
                  <td>{pet.petType}</td>
                  <td>{pet.petBreed}</td>
                  <td>{pet.ownerNames} {pet.ownerSurnames}</td>
                  <td>
                    <button onClick={() => { props.MoreInfo(pet.id) }} className="btn btn-sm blue1"><strong> More Info</strong></button>
                  </td>
                  <td>
                    <button onClick={() => { props.setEditMode(true); props.setModalSave(true); props.setPetID(pet.id) }} className="btn btn-sm blue2"> <strong> Edit </strong></button>
                  </td>
                  <td>
                    <button onClick={() => props.DeletePet(pet.id)} className="btn btn-sm gris1"> <strong>Delete</strong> </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

}


export default TablePets;