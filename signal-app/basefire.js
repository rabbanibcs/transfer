import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";


const Config = {
  apiKey: "AIzaSyAPRyxakBcciWb2e--E_dKhp0alYbOgeeU",
  authDomain: "signal-clone-4c40f.firebaseapp.com",
  projectId: "signal-clone-4c40f",
  storageBucket: "signal-clone-4c40f.appspot.com",
  messagingSenderId: "819032542125",
  appId: "1:819032542125:web:cc8c7898bbc9e2638eaf24",
  measurementId: "G-J1JZ17JG64"
  };


let app;


app=firebase.initializeApp(Config);

const db = app.firestore()
const auth = firebase.auth()

export {db,auth};

