import { firebaseApp } from './firebase'
import firebase from 'firebase/app';
require('firebase/firestore');

const db = firebase.firestore(firebaseApp);

export const getPets = async (collection) => {
    let result = { statusR: false, data: null, error: null }
    try {
        const data = await db.collection(collection).get();
        let dataArray = data.docs.map(pet => ({ id: pet.id, ...pet.data() }));
        result.data = dataArray;
        result.statusR = true;
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const getInfoPet = async (collection, id) => {
    let result = { statusR: false, data: null, error: null }
    try {
        const data = await db.collection(collection).doc(id).get();
        let dataArray = { id: data.id, ...data.data() };
        result.data = dataArray;
        result.statusR = true;
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const addPet = async (collection, pet) => {
    let result = { statusR: false, data: null, error: null };
    try {
        const response = await db.collection(collection).add(pet);
        result.data = response.id;
        result.statusR = true;
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const updatePet = async (collection, petID, pet) => {
    let result = { statusR: false, data: null, error: null };
    try {
        await db.collection(collection).doc(petID).update(pet);
        result.statusR = true;
    } catch (error) {
        result.error = error;
    }
    return result;
}


export const deletePet = async (collection, id) => {
    const result = { statusR: false, data: null, error: null };

    try {
        await db.collection(collection).doc(id).delete();
        result.statusR = true;
    } catch (error) {
        result.error = true;
    }
    return result;
}

