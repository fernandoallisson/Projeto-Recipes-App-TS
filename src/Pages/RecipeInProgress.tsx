import { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RecipesContext } from '../Context';
import { getRecipesById } from '../Services';
import { Drink, Meal } from '../types';
import { ShareButton } from '../Components/ShareButton';
import { FavoriteButton } from '../Components/FavoriteButton';
import { CheckboxIngredients } from '../Components/CheckboxIngredients';

export function RecipeInProgress() {
  const { id } = useParams<{ id: string }>();
  const { onlyRecipes, hanleSetOnlyRecipes } = useContext(RecipesContext);

  const location = useLocation();

  const fetchDataRecipe = async () => {
    if (location.pathname.includes('meals')) {
      const data = await getRecipesById(`${id}`, 'meals');
      hanleSetOnlyRecipes(data);
    }
    if (location.pathname.includes('drinks')) {
      const data = await getRecipesById(`${id}`, 'drinks');
      hanleSetOnlyRecipes(data);
    }
  };

  useEffect(() => {
    fetchDataRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h1 data-testid="page-title">Recipe Details</h1>
      {onlyRecipes.meals && (
        <div>
          { onlyRecipes.meals.map((element: Meal) => (
            <div key={ element.idMeal }>
              <h1 data-testid="recipe-title">{ element.strMeal }</h1>
              <h3 data-testid="recipe-category">{ element.strCategory }</h3>
              <img
                src={ element.strMealThumb }
                alt={ element.strMeal }
                data-testid="recipe-photo"
                style={ { width: '300px', height: '200px' } }
              />
              <CheckboxIngredients />
              <h3>Instructions</h3>
              <p data-testid="instructions">{ element.strInstructions }</p>
            </div>
          ))}
        </div>
      )}
      {onlyRecipes.drinks && (
        <div>
          { onlyRecipes.drinks.map((element: Drink) => (
            <div key={ element.idDrink }>
              <h1 data-testid="recipe-title">{ element.strDrink }</h1>
              <h3 data-testid="recipe-category">{ element.strAlcoholic }</h3>
              <img
                data-testid="recipe-photo"
                src={ element.strDrinkThumb }
                alt={ element.strDrink }
                style={ { width: '10px', height: '10px' } }
              />
              <CheckboxIngredients />
              <h3>Instructions</h3>
              <p data-testid="instructions">{ element.strInstructions }</p>
            </div>
          ))}
        </div>
      )}
      <ShareButton />
      <FavoriteButton />
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}
