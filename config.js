import firebase from 'firebase';
require('@firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAHuQDnVcsAiJ8wkGk43pKjr8QSckeMAYo",
    authDomain: "story-hub-5b7ba.firebaseapp.com",
    projectId: "story-hub-5b7ba",
    storageBucket: "story-hub-5b7ba.appspot.com",
    messagingSenderId: "1098039703932",
    appId: "1:1098039703932:web:582f3bb21d6c7542e54cf9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();