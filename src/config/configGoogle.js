// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDzIWlD9XCmwps_o1ozNFhXaI5eFjzidkQ",
  authDomain: "testlogin-6db21.firebaseapp.com",
  databaseURL: "https://testlogin-6db21-default-rtdb.firebaseio.com",
  projectId: "testlogin-6db21",
  storageBucket: "testlogin-6db21.appspot.com",
  messagingSenderId: "962055316709",
  appId: "1:962055316709:web:f3f4f2e71392c0d191a00c",
  measurementId: "G-38224RW923"
};
const app = initializeApp(firebaseConfig);
export const database=getDatabase(app)
export const auth = getAuth(app);
export const provider= new GoogleAuthProvider()
