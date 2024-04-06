// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.MEDICARE_APP_APIKEY,
  authDomain: import.meta.env.MEDICARE_APP_AUTHDOMAIN,
  projectId: import.meta.env.MEDICARE_APP_PROJECTID,
  storageBucket: import.meta.env.MEDICARE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.MEDICARE_APP_MESSAGING_SENDERID,
  appId: import.meta.env.MEDICARE_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
