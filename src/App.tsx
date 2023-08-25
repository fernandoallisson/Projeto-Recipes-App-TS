import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Meals } from './Pages/Meals';
import { AuthProvider } from './Context/AuthProvider';
import { RecipesProvider } from './Context/RecipesProvider';
import { Drinks } from './Pages/Drinks';

function App() {
  return (
    <AuthProvider>
      <RecipesProvider>
        <Routes>
          <Route path="/" Component={ Login } />
          <Route path="/meals" Component={ Meals } />
          <Route path="/drinks" Component={ Drinks } />
        </Routes>
      </RecipesProvider>
    </AuthProvider>
  );
}

export default App;
