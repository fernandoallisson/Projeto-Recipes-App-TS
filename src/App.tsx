import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Meals } from './Pages/Meals';
import { userContext } from './Context';

function App() {
  const [email, setEmail] = useState('');

  function writeLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return (
    userContext.Provider
      value={ {
        emailState: '',
        setEmailState: () => {},
      } }
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
    </Routes>
  );
}

export default App;
