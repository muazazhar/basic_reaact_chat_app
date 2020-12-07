import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAYl0wQ9yjq6EFI8H_JgY4qjiYtEy_8Wmk",
  authDomain: "reduxchatappbymuaz.firebaseapp.com",
  projectId: "reduxchatappbymuaz",
  storageBucket: "reduxchatappbymuaz.appspot.com",
  messagingSenderId: "743254923389",
  appId: "1:743254923389:web:16e0357d3ac20b9a917914",
  measurementId: "G-19ZWCRWNT1",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
