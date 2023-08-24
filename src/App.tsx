import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Meals } from './Pages/Meals';
import { AuthProvider } from './Context/AuthProvider';
import { MealsProvider } from './Context/MealsProvider';

function App() {
  return (
    <AuthProvider>
      <MealsProvider>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/meals" element={ <Meals /> } />
        </Routes>
      </MealsProvider>
    </AuthProvider>
  );
}

export default App;
