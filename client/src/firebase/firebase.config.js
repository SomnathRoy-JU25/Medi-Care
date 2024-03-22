// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCATuNsY6od6UIdX7hIN_huALu3OOhLnec",
  authDomain: "medi-care-353c5.firebaseapp.com",
  databaseURL: "https://medi-care-353c5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "medi-care-353c5",
  storageBucket: "medi-care-353c5.appspot.com",
  messagingSenderId: "738778873376",
  appId: "1:738778873376:web:c0e521b4aa953e7a070645",
  measurementId: "G-RJPJLCCQPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app(analytics)