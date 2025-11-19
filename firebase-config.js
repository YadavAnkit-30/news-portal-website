import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLWXsntvHFRmn-w_665gJexiYp7zmC-og",
  authDomain: "dailychronicle-a9ce1.firebaseapp.com",
  projectId: "dailychronicle-a9ce1",
  storageBucket: "dailychronicle-a9ce1.appspot.com", 
  messagingSenderId: "896770911755",
  appId: "1:896770911755:web:08eba447dbfc2e4a57610e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
