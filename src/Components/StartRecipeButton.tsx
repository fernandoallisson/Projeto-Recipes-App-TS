import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipesContext } from '../Context';

export function StartRecipeButton() {
  const { ingredients } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const id = pathname.split('/')[2];

  const saveInProgressRecipeToLocalStorage = () => {
    const inProgressRecipesStr = localStorage.getItem('inProgressRecipes') || '{}';
    const inProgressRecipes = JSON.parse(inProgressRecipesStr);

    const newInProgressRecipes = {
      ...inProgressRecipes,
      [pathname.includes('meals') ? 'meals' : 'drinks']: {
        ...inProgressRecipes[pathname.includes('meals') ? 'meals' : 'drinks'],
        [id]: [ingredients],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
  };

  const handleStartRecipe = () => {
    saveInProgressRecipeToLocalStorage();

    if (pathname.includes('meals')) {
      navigate(`/meals/${id}/in-progress`);
    } else if (pathname.includes('drinks')) {
      navigate(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div>
      <button
        className="startRecipe"
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipe }
      >
        Continue Recipe
      </button>
    </div>
  );
}
