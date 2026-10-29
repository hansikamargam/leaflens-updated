import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8OGsm-Ywqnctz1sGPtk7rxKcWP6-w5IM",
  authDomain: "leaflens-528e1.firebaseapp.com",
  projectId: "leaflens-528e1",
  storageBucket: "leaflens-528e1.firebasestorage.app",
  messagingSenderId: "150287079439",
  appId: "1:150287079439:web:682c5f052e38442149eb7a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);