import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Components/Header/Index';
import { Teste } from './teste/teste';

function App() {
  return (
    <div className="App">
      <Header title="Meals" />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/meals" element={} /> */}
        {/* <Route path="/meals/:id" element={} /> */}
        {/* <Route path="/drinks" element={} /> */}
        {/* <Route path="/drinks/:id" element={} /> */}
        {/* <Route path="/meals/:id/in-progress" element={} /> */}
        {/* <Route path="/drinks/:id/in-progress" element={} /> */}
        <Route path="/profile" element={ <Teste /> } />
      </Routes>
    </div>
  );
}

export default App;
