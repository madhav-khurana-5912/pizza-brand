import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "pizza-brand",
  appId: "1:43186389722:web:d2afd5cc276583cacbdbe3",
  storageBucket: "pizza-brand.firebasestorage.app",
  apiKey: "AIzaSyDtcavhT3-mDjco0OYY7DHkk48DgORQBc0",
  authDomain: "pizza-brand.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "43186389722"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
