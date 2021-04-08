import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBgXCESA5ZoLm4CFO6D-QEqx4UZGm4MeZg",
    authDomain: "originalapp-home.firebaseapp.com",
    projectId: "originalapp-home",
    storageBucket: "originalapp-home.appspot.com",
    messagingSenderId: "523612192800",
    appId: "1:523612192800:web:dbab5735ed03fe52203c45",
    measurementId: "G-SW9RB6WGPC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();