import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC980QENfS-rCzhYnrATntBKkG8es_Smig",
  authDomain: "godolfa-miniblog.firebaseapp.com",
  projectId: "godolfa-miniblog",
  storageBucket: "godolfa-miniblog.firebasestorage.app",
  messagingSenderId: "1065368662735",
  appId: "1:1065368662735:web:772e63421c36a68a083dba",
  measurementId: "G-0TWBZTMY67"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default app;
export { app, auth, db };