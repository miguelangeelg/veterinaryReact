import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBa3BfFPB-YhgsfFRScVeRUtHsPQwKDj3c",
    authDomain: "veterinaryreact.firebaseapp.com",
    projectId: "veterinaryreact",
    storageBucket: "veterinaryreact.appspot.com",
    messagingSenderId: "922432620062",
    appId: "1:922432620062:web:ebd7b29a482ec475e9d00f"
  };


  export const firebaseApp = firebase.initializeApp(firebaseConfig);