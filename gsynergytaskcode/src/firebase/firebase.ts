import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// i used firebase , and created the key for Authentication 
const firebaseConfig = {
  apiKey: "AIzaSyCeBQ-J-n0Dso7LeICH7NdJx9SKIT0ly4Q",
  authDomain: "gsynergy-c0ea5.firebaseapp.com",
  projectId: "gsynergy-c0ea5",
  storageBucket: "gsynergy-c0ea5.appspot.com",
  messagingSenderId: "633163089273",
  appId: "1:633163089273:web:48539066f61aa99323dba8",
  measurementId: "G-M3J9QS5XPV"
};


const app = initializeApp(firebaseConfig);

console.log("✅ Firebase Initialized:", app.name);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
