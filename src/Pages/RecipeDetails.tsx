import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipesById } from '../Services/index';
import { Drink, Meal } from '../types';

type RecipeDetailsType = {
  meals: Meal[];
  drinks: Drink[];
};

export function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetailsType>(
    {} as RecipeDetailsType,
  );

  const location = window.location.pathname;

  const fetchDataRecipe = async () => {
    if (location.includes('meals')) {
      const data = await getRecipesById(`${id}`, 'meals');
      setRecipe(data);
    }
    if (location.includes('drinks')) {
      const data = await getRecipesById(`${id}`, 'drinks');
      setRecipe(data);
      console.log(recipe);
    }
  };

  useEffect(() => {
    fetchDataRecipe();
  }, [id]);

  const handleTeste = () => {
    console.log({ recipe });
  };
  console.log({ recipe });
  return (
    <div>
      <button onClick={ handleTeste }>Teste</button>
      {recipe.meals && (
        <div>
          { recipe.meals.map((element: Meal) => (
            <div key={ element.idMeal }>
              <h1 data-testid="recipe-title">{ element.strMeal }</h1>
              <h3 data-testid="recipe-category">{ element.strCategory }</h3>
              <img
                src={ element.strMealThumb }
                alt={ element.strMeal }
                data-testid="recipe-photo"
                style={ { width: '10px', height: '10px' } }
              />
              <h3>Ingredients</h3>
              <ul>
                { Object.keys(element).map((key, index) => {
                  if (key.includes('strIngredient') && element[key]) {
                    return (
                      <li
                        key={ key }
                        data-testid={ `${index - 9}-ingredient-name-and-measure` }
                      >
                        { element[key] }
                        {' '}
                        -
                        {' '}
                        { element[`strMeasure${key.slice(13)}`] }
                      </li>
                    );
                  }
                  return null;
                }) }
              </ul>
              <h3>Instructions</h3>
              <p data-testid="instructions">{ element.strInstructions }</p>
              <iframe
                data-testid="video"
                title={ element.strMeal }
                src={ `https://www.youtube.com/embed/${element.strYoutube.split('v=')[1]}` }
                width="320"
                height="240"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}
      {recipe.drinks && (
        <div>
          { recipe.drinks.map((element: Drink) => (
            <div key={ element.idDrink }>
              <h1 data-testid="recipe-title">{ element.strDrink }</h1>
              {/* <h3 data-testid="recipe-category">{ element.strCategory }</h3> */}
              <h3 data-testid="recipe-category">{ element.strAlcoholic }</h3>
              <img
                data-testid="recipe-photo"
                src={ element.strDrinkThumb }
                alt={ element.strDrink }
                style={ { width: '10px', height: '10px' } }
              />
              <h3>Ingredients</h3>
              <ul>
                { Object.keys(element).map((key, index) => { // index = 17;
                  if (key.includes('strIngredient') && element[key]) {
                    return (
                      <li
                        key={ key }
                        data-testid={ `${index - 17}-ingredient-name-and-measure` }
                      >
                        { element[key] }
                        {' '}
                        -
                        {' '}
                        { element[`strMeasure${key.slice(13)}`] }
                      </li>
                    );
                  }
                  return null;
                }) }
              </ul>
              <h3>Instructions</h3>
              <p data-testid="instructions">{ element.strInstructions }</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
