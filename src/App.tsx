import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Meals } from './Pages/Meals';
import { AuthProvider } from './Context/AuthProvider';
import { MealsProvider } from './Context/MealsProvider';
import { DrinksProvider } from './Context/DrinksProvider';

function App() {
  return (
    <AuthProvider>
      <MealsProvider>
        <DrinksProvider>
          <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/meals" element={ <Meals /> } />
          </Routes>
        </DrinksProvider>
      </MealsProvider>
    </AuthProvider>
  );
}

export default App;
