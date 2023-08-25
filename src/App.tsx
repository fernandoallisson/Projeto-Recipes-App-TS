import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Meals } from './Pages/Meals';
import { AuthProvider } from './Context/AuthProvider';
import { RecipesProvider } from './Context/RecipesProvider';
import { MealsDetail } from './Pages/MealsDetail';
import { DrinksDetail } from './Pages/DrinksDetail';
import { Profile } from './Pages/Profile';
import { FavoriteRecipes } from './Pages/FavoriteRecipes';
import { DoneRecipes } from './Pages/DoneRecipes';
import { Drinks } from './Pages/Drinks';

function App() {
  return (
    <AuthProvider>
      <RecipesProvider>
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
      </RecipesProvider>
    </AuthProvider>
  );
}

export default App;
