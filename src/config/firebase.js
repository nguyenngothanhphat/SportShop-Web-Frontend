import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjI3DmOmhPRlxM95utOTc8_LRMpvHY3qY",
    authDomain: "sportshop-bf8d0.firebaseapp.com",
    projectId: "sportshop-bf8d0",
    storageBucket: "sportshop-bf8d0.appspot.com",
    messagingSenderId: "642959755482",
    appId: "1:642959755482:web:b5496782095b5a0afa3de3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* Export */
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();