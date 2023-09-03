import { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Drink, Meal } from '../types';
import { RecipesContext } from '../Context';
import { getRecipesById } from '../Services/index';
import { ShareButton } from '../Components/ShareButton';
import { Carousel } from '../Components/Carousel';
import { StartRecipeButton } from '../Components/StartRecipeButton';
import { FavoriteButton } from '../Components/FavoriteButton';
import { AllIngredients } from '../Components/AllIngredients';

export function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const { hanleSetOnlyRecipes, onlyRecipes } = useContext(RecipesContext);
  const location = useLocation();

  const fetchDataRecipe = async () => {
    if (location.pathname.includes('meals')) {
      const data = await getRecipesById(`${id}`, 'meals');
      // setRecipe(data);
      hanleSetOnlyRecipes(data);
    }
    if (location.pathname.includes('drinks')) {
      const data = await getRecipesById(`${id}`, 'drinks');
      // setRecipe(data);
      hanleSetOnlyRecipes(data);
    }
  };
  // UseEffect para pegar as receitas
  useEffect(() => {
    fetchDataRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <div>
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
                <AllIngredients />
                <h3>Instructions</h3>
                <p data-testid="instructions">{ element.strInstructions }</p>
                <iframe
                  data-testid="video"
                  title={ element.strMeal }
                  src={ `https://www.youtube.com/embed/${element.strYoutube}` }
                  width="320"
                  height="240"
                  allowFullScreen
                />
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
                <AllIngredients />
                <h3>Instructions</h3>
                <p data-testid="instructions">{ element.strInstructions }</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Carousel />
      <ShareButton />
      <FavoriteButton />
      <StartRecipeButton />
    </div>
  );
}
