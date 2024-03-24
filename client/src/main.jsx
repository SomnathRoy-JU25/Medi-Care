import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store.js";
import "./styles/App.css";
import "./index.css";
import { Toaster } from 'react-hot-toast';
import Footer from './components/Home/Footer.jsx';
import Navbar from './components/Common/Navbar.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';

// import { Provider } from "react-redux";

// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducer";

// const store = configureStore({
//   reducer: rootReducer,
// });


import { Provider } from "react-redux";

// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducer";

// const store = configureStore({
//   reducer: rootReducer,
// });


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <App />
        <Toaster/>
        <hr />
        <Footer/>
      </BrowserRouter>
    </Provider>
    </AuthProvider>
  //  </React.StrictMode>,
)
