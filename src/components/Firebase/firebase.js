import firebase from'firebase'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDXSAZ09BuhZ2KH4qg8OL9cdLzd-2IjmaM",
    authDomain: "burguer-queen-31b62.firebaseapp.com",
    databaseURL: "https://burguer-queen-31b62.firebaseio.com",
    projectId: "burguer-queen-31b62",
    storageBucket: "burguer-queen-31b62.appspot.com",
    messagingSenderId: "70873857695",
    appId: "1:70873857695:web:fb02f99db39025ddbaacaa",
    measurementId: "G-S6JFLP42XW"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig).firestore();

  export default firebaseApp;

