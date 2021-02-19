import React,{ useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import { useSelector } from 'react-redux'

import './styles/App.css';
import Home from "./pages/Container";
import useAuth from "./Redux/useAuth"
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  
  const { isLogged } = useAuth()
  const handleRedirect = () => {
    if (!isLogged) return <Redirect to="/login" />
  }
  return (
    <div className="App">
      <Router>
            <Home />
      </Router>
    </div>
  );
}

export default App;
