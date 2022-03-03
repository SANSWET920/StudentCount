import * as firebase from 'firebase';

import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCWT9rzzmt3DsgheT-iIJBHArugjviTkFw",
    authDomain: "contact-2a8ab.firebaseapp.com",
    databaseURL: "https://contact-2a8ab-default-rtdb.firebaseio.com",
    projectId: "contact-2a8ab",
    storageBucket: "contact-2a8ab.appspot.com",
    messagingSenderId: "616570946333",
    appId: "1:616570946333:web:8043d2670662a82e6197f4"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db,
};
