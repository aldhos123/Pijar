import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCUnMBzKoheJrV76OnfcoY2CGJkFvMP3ZQ",
    authDomain: "pijar-67637.firebaseapp.com",
    projectId: "pijar-67637",
    storageBucket: "pijar-67637.appspot.com",
    messagingSenderId: "332016675157",
    appId: "1:332016675157:web:d14e8b0f6dd170ab44e7dc",
    measurementId: "G-Q16XF4Q1LW"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()
export { auth }
export { firebase }