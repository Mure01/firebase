import {getDatabase} from "firebase/database";


import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCLZTIdaOU0-P4Qv_enu68JsoZrMOigpvM",
  authDomain: "react-6cc14.firebaseapp.com",
  projectId: "react-6cc14",
  storageBucket: "react-6cc14.appspot.com",
  messagingSenderId: "459194910378",
  appId: "1:459194910378:web:5eb5641f4c80525dddb2d3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);