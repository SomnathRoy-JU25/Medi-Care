import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles/App.css";
import "./index.css";
import { Toaster } from 'react-hot-toast';
import Footer from './components/Home/Footer.jsx';
import Navbar from './components/Common/Navbar.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <App />
        <Toaster/>
        <hr />
        <Footer/>
      </BrowserRouter>
    </Provider>
  //  </React.StrictMode>,
)
