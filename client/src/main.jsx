import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import "./index.css";
import { Toaster } from 'react-hot-toast';
import AuthProvider from './contexts/AuthProvider.jsx';
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index.js";

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
    </AuthProvider>
  //  </React.StrictMode>,
)
