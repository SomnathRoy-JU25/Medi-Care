import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import './App.css'
import "./index.css";
import Navbar from './components/Common/Navbar.jsx';
import Footer from './components/Common/Footer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <App />
        <Footer/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
