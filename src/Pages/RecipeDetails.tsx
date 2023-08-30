import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipesById, getRecomendations } from '../Services/index';
import { Drink, Meal } from '../types';
import '../Components/Carousel.css';

type RecipeDetailsType = {
  meals: Meal[] | any;
  drinks: Drink[] | any;
};

export function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetailsType>(
    {} as RecipeDetailsType,
  );
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [measure, setMeasure] = useState<string[]>([]);
  const [recomendations, setRecomendations] = useState<RecipeDetailsType>({
  } as RecipeDetailsType);

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
  // UseEffect para pegar as receitas
  useEffect(() => {
    fetchDataRecipe();
  }, [id]);

  // UseEffect para pegar a measure
  useEffect(() => {
    if (recipe.meals) {
      const measureList = Object.keys(recipe.meals[0]).map((key) => {
        if (key.includes('strMeasure') && recipe.meals) {
          return recipe.meals[0][key];
        }
        return null;
      });
      setMeasure(measureList.filter((element) => element));
    }
    if (recipe.drinks) {
      const measureList = Object.keys(recipe.drinks[0]).map((key) => {
        if (key.includes('strMeasure') && recipe.drinks) {
          return recipe.drinks[0][key];
        }
        return null;
      });
      setMeasure(measureList.filter((element) => element));
    }
  }, [recipe]);

  // UseEffect para pegar os ingredientes
  useEffect(() => {
    if (recipe.meals) {
      const ingredientsList = Object.keys(recipe.meals[0]).map((key) => {
        if (key.includes('strIngredient') && recipe.meals) {
          return recipe.meals[0][key];
        }
        return null;
      });
      setIngredients(ingredientsList.filter((element) => element));
    }
    if (recipe.drinks) {
      const ingredientsList = Object.keys(recipe.drinks[0]).map((key) => {
        if (key.includes('strIngredient') && recipe.drinks) {
          return recipe.drinks[0][key];
        }
        return null;
      });
      setIngredients(ingredientsList.filter((element) => element));
    }
  }, [recipe]);

  // UseEffect para pegar recomendações de comidas ou bebidas
  useEffect(() => {
    if (location.includes('meals')) {
      const fetchData = async () => {
        const data = await getRecomendations('drinks');
        setRecomendations(data);
      };
      fetchData();
    }
    if (location.includes('drinks')) {
      const fetchData = async () => {
        const data = await getRecomendations('meals');
        setRecomendations(data);
      };
      fetchData();
    }
  }, [location]);

  return (
    <div>
      <div>
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
                  style={ { width: '300px', height: '200px' } }
                />
                <h3>Ingredients</h3>
                <ul>
                  {
                    ingredients.map((ingredient, index) => (
                      <li
                        key={ ingredient }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        { ingredient }
                        {' '}
                        -
                        {' '}
                        { measure[index] }
                      </li>
                    ))
                  }
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
                  {
                    ingredients.map((ingredient, index) => (
                      <li
                        key={ ingredient }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        { ingredient }
                        {' '}
                        -
                        {' '}
                        { measure[index] }
                      </li>
                    ))
                  }
                </ul>
                <h3>Instructions</h3>
                <p data-testid="instructions">{ element.strInstructions }</p>
              </div>
            ))}
          </div>
        )}
        {recomendations.drinks && (
          <div className="container">
            { recomendations.drinks.slice(0, 6).map((element: Drink, index: number) => (
              <div key={ element.idDrink } data-testid={ `${index}-recommendation-card` }>
                <h1
                  data-testid={ `${index}-recommendation-title` }
                >
                  { element.strDrink }
                </h1>
                <h3 data-testid="recipe-category">{ element.strAlcoholic }</h3>
                <img
                  data-testid="recipe-photo"
                  src={ element.strDrinkThumb }
                  alt={ element.strDrink }
                  style={ { width: '300px', height: '200px' } }
                />
              </div>
            ))}
          </div>
        )}
        {recomendations.meals && (
          <div className="container">
            { recomendations.meals.slice(0, 6).map((element: Meal, index: number) => (
              <div key={ element.idMeal } data-testid={ `${index}-recommendation-card` }>
                <h1
                  data-testid={ `${index}-recommendation-title` }
                >
                  { element.strMeal }
                </h1>
                <h3 data-testid="recipe-category">{ element.strCategory }</h3>
                <img
                  data-testid="recipe-photo"
                  src={ element.strMealThumb }
                  alt={ element.strMeal }
                  style={ { width: '300px', height: '200px' } }
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="startRecipe" data-testid="start-recipe-btn">Start Recipe</button>
    </div>
  );
}
