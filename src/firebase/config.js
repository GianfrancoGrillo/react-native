import app from 'firebase/app'
import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAJLycFezSjsTtLqhfe_jD8_Nt4aVV8q5c",
    authDomain: "final-prog3-775c6.firebaseapp.com",
    projectId: "final-prog3-775c6",
    storageBucket: "final-prog3-775c6.appspot.com",
    messagingSenderId: "976609987222",
    appId: "1:976609987222:web:8fd18f9f82738e48f790b7",
    measurementId: "G-18E0G93E72"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = firebase.storage()
export const db = firebase.firestore()




