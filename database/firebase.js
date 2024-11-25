import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFZ9slH7gUzqcMg9br7KK5bNep3i98mLw",
  authDomain: "snowpet-f3b04.firebaseapp.com",
  projectId: "snowpet-f3b04",
  storageBucket: "snowpet-f3b04.appspot.com",
  messagingSenderId: "799619646928",
  appId: "1:799619646928:web:a9db9db3b026a2efe525d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc }; // Exporta Firestore y las funciones necesarias
