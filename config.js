import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyB93dDD8YeW1zfAnBVjpkuj7ERFbx17M80",
    authDomain: "book-santa-dd98b.firebaseapp.com",
    databaseURL: "https://book-santa-dd98b.firebaseio.com",
    projectId: "book-santa-dd98b",
    storageBucket: "book-santa-dd98b.appspot.com",
    messagingSenderId: "141727504981",
    appId: "1:141727504981:web:7c1c284f0f00ef5f8992dc",
    measurementId: "G-6JJCFSHHES"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();