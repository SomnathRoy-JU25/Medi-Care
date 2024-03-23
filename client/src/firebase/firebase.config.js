// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWziqh9C6SqaxR0cHeszAl2pxmMWf69To",
  authDomain: "medi-care-d550b.firebaseapp.com",
  projectId: "medi-care-d550b",
  storageBucket: "medi-care-d550b.appspot.com",
  messagingSenderId: "343972851732",
  appId: "1:343972851732:web:73c3528e7e122ab9707701",
  measurementId: "G-F8FSMN2G9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;