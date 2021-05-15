import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDumPMxXK4VCRJLXJtvK7faRYqAbgjOMnA",
  authDomain: "southfitness-dash.firebaseapp.com",
  projectId: "southfitness-dash",
  storageBucket: "southfitness-dash.appspot.com",
  messagingSenderId: "605983637267",
  appId: "1:605983637267:web:187351f23202ed2a3a24e6",
  measurementId: "G-P0YPSCFLRE"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebaseApp.messaging();

export default {auth, db, provider, firebaseApp, messaging };