import React, { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);
const GoogleProvider =  new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   create an account
   const createUser = (email, password) => {
       return createUserWithEmailAndPassword(auth, email, password);
   }

//    signup with gmail account
   const signupWithGmail = () => {
       return signInWithPopup(auth, GoogleProvider);
   }

//    login email & password
 const login = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
 }

//  logout
const logOut  = ()=>{
     signOut(auth)
}

// updateProfile

const updateProfile = ({name, photoURL})=>{
       return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
       })   
}

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
       if(currentUser){
        setUser(currentUser);
        setLoading(false);
       }else{
        
       }
    });
    return () => {
        return unsubscribe();
    }
  }, []);   

  const authInfo = {
    user,
    createUser,
    signupWithGmail,
    login,
    logOut,
    updateProfile

  };

  return (
    <AuthContext.Provider value={authInfo}>
    {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
