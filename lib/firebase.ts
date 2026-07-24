import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "big-outrider-b40ks",
  appId: "1:820728979520:web:6e4508d962b955936d3fa5",
  apiKey: "AIzaSyCwbUaXf1-N6ce8xUN8zF96_Zlgpg1PJUI",
  authDomain: "big-outrider-b40ks.firebaseapp.com",
  storageBucket: "big-outrider-b40ks.firebasestorage.app",
  messagingSenderId: "820728979520",
  measurementId: ""
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app, "ai-studio-gpsccdashboard-ffc73381-f406-4736-8dce-b4d69d0fb32c");
