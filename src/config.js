import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAFR4mDCS5-UnDAAErvYuqask6OLsY0evc",
    authDomain: "personallib-fcd9e.firebaseapp.com",
    projectId: "personallib-fcd9e",
    storageBucket: "personallib-fcd9e.appspot.com",
    messagingSenderId: "833254903388",
    appId: "1:833254903388:web:df5edd2207595a821b2099",
    measurementId: "G-5TKQJDHTCP"
  });

  export default firebaseConfig;