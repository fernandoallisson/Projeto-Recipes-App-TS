import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../Context';

export function RecipeInProgress() {
  const { ingredients } = useContext(RecipesContext);
  // const { pathname } = useLocation();

  const handleTeste = () => {
    console.log(ingredients);
  };
  return (
    <div>
      <button onClick={ handleTeste }>Teste</button>
      <h1 data-testid="page-title">Recipe Details</h1>
    </div>
  );
}
