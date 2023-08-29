import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipesById } from '../Services/index';
import { Drink, Meal } from '../types';

type RecipeDetails = {
  meals: Meal;
  drinks: Drink;
};

export function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails>();

  const location = window.location.pathname;

  const fetchData = async () => {
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
    fetchData();
  }, [id]);

  const handleTeste = () => {
    console.log(recipe?.meals);
  };

  return (
    <div>
      <button onClick={ handleTeste }>Teste</button>
      <div id="titleRecipeType">
        {
          location.includes('meals') ? (
            <div>
              <h1>Meals Details</h1>
            </div>
          ) : (
            <div>
              <h1>Drinks Details</h1>
            </div>
          )
        }
      </div>
      <div>
        {recipe && (
          <div>
            <img
              src={ recipe.meals.strMealThumb || recipe.drinks.strDrinkThumb }
              alt={ recipe.meals.strMeal || recipe.drinks.strDrink }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">
              {
              recipe.meals.strMeal
              || recipe.drinks.strDrink
              }
            </h1>
            <h2 data-testid="recipe-category">
              { recipe.meals.strCategory
              || recipe.drinks.strCategory}
            </h2>
            <h3>Ingredients</h3>
            {Object.keys(recipe).map((key) => {
              if (key.includes('Ingredient') && recipe[key]) {
                return (
                  <p
                    key={ key }
                    data-testid={
                      `${parseInt(key.split(' ')[1], 10) - 1}-ingredient-name-and-measure`
                    }
                  >
                    {`${recipe[key]} - ${recipe[`strMeasure${key.split(' ')[1]}`]}`}
                  </p>
                );
              }
              return null;
            })}
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {
            recipe.meals.strInstructions
            || recipe.drinks.strInstructions
}
            </p>
            {/* {location.includes('meals') && (
              <div>
                <h3>Video</h3>
                <iframe
                  title="video"
                  data-testid="video"
                  width="320"
                  height="240"
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                />
              </div>
            )} */}
            <h3>Recomendations</h3>
            {/* <div>
              <div>
                {recipe.strDrink ? (
                  <div>
                    <img
                      src={ recipe.strDrinkThumb }
                      alt={ recipe.strDrink }
                      data-testid="recipe-photo"
                    />
                    <h4 data-testid="recipe-title">{recipe.strDrink}</h4>
                  </div>
                ) : (
                  <div>
                    <img
                      src={ recipe.strMealThumb }
                      alt={ recipe.strMeal }
                      data-testid="recipe-photo"
                    />
                    <h4 data-testid="recipe-title">{ recipe.strMeal }</h4>
                  </div>
                )}
              </div> */}
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
