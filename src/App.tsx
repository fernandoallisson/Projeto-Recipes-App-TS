import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Meals } from './Pages/Meals';
import { UserProvider } from './Context';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
      </Routes>
    </UserProvider>
  );
}

export default App;
