// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyAWziqh9C6SqaxR0cHeszAl2pxmMWf69To",
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  // authDomain: "medi-care-d550b.firebaseapp.com",
  projectId: import.meta.env.VITE_PROJECTID,
  // projectId: "medi-care-d550b",
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  // storageBucket: "medi-care-d550b.appspot.com",
  messagingSenderId: "343972851732",
  appId: "1:343972851732:web:0d73c837f0a36122707701"
};


// VITE_APIKEY = "AIzaSyAWziqh9C6SqaxR0cHeszAl2pxmMWf69To"
// VITE_AUTHDOMAIN = "medi-care-d550b.firebaseapp.com"
// # DB_URL = "https://medi-care-353c5-default-rtdb.asia-southeast1.firebasedatabase.app"
// VITE_PROJECTID = "medi-care-d550b",
// VITE_STORAGEBUCKET = "medi-care-d550b.appspot.com"
// VITE_MESSAGINGSENDERID = "343972851732"
// VITE_APPID =  "1:343972851732:web:0d73c837f0a36122707701"
// # MEASUREMENT_ID =  "G-5XMFM8DGR9"

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
