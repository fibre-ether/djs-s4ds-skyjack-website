// Import the functions you need from the SDKs you need
import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfJQ8ptAuWXFWe0oaUbhTe0MkWjxv6Gbg",
  authDomain: "djs-s4ds.firebaseapp.com",
  projectId: "djs-s4ds",
  storageBucket: "djs-s4ds.appspot.com",
  messagingSenderId: "588938652222",
  appId: "1:588938652222:web:c8b1118515207fece9bf6f",
  measurementId: "G-2KZGP8ZCV8"
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line 
const analytics = getAnalytics(app);
export default getFirestore();