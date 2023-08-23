import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Meals } from './Pages/Meals';
import { AuthProvider } from './Context/AuthProvider';
import { Drinks } from './Pages/Drinks';
import { MealsDetail } from './Pages/MealsDetail';
import { DrinksDetail } from './Pages/DrinksDetail';
import { Profile } from './Pages/Profile';
import { FavoriteRecipes } from './Pages/FavoriteRecipes';
import { DoneRecipes } from './Pages/DoneRecipes';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/meals/:id-da-receita" element={ <MealsDetail /> } />
        <Route path="/drinks/:id-da-receita" element={ <DrinksDetail /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
