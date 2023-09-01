import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getRecipesById } from '../Services/index';
import { Drink, Meal } from '../types';
import { ButtonsRecipeDetails } from '../Components/ButtonsRecipeDetails';
import { Carousel } from '../Components/Carousel';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { RecipesContext } from '../Context';
import { ButtonStart } from '../Components/ButtonStart';

export function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [ingredients, setIngredientes] = useState<string[]>([]);
  const [measure, setMeasure] = useState<string[]>([]);
  const [like, setLike] = useState(false);

  const { hanleSetOnlyRecipes,
    onlyRecipes,
    handleSetFavorite,
    handleSetIngredients,
  } = useContext(RecipesContext);

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
    verifyFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // UseEffect para pegar a measure
  useEffect(() => {
    if (onlyRecipes.meals) {
      const measureList = Object.keys(onlyRecipes.meals[0]).map((key) => {
        if (key.includes('strMeasure') && onlyRecipes.meals) {
          return onlyRecipes.meals[0][key];
        }
        return null;
      });
      setMeasure(measureList.filter((element) => element));
    }
    if (onlyRecipes.drinks) {
      const measureList = Object.keys(onlyRecipes.drinks[0]).map((key) => {
        if (key.includes('strMeasure') && onlyRecipes.drinks) {
          return onlyRecipes.drinks[0][key];
        }
        return null;
      });
      setMeasure(measureList.filter((element) => element));
    }
  }, [onlyRecipes]);

  // UseEffect para pegar os ingredientes
  useEffect(() => {
    if (onlyRecipes.meals) {
      const ingredientsList = Object.keys(onlyRecipes.meals[0]).map((key) => {
        if (key.includes('strIngredient') && onlyRecipes.meals) {
          return onlyRecipes.meals[0][key];
        }
        return null;
      });
      setIngredientes(ingredientsList.filter((element) => element));
    }
    if (onlyRecipes.drinks) {
      const ingredientsList = Object.keys(onlyRecipes.drinks[0]).map((key) => {
        if (key.includes('strIngredient') && onlyRecipes.drinks) {
          return onlyRecipes.drinks[0][key];
        }
        return null;
      });
      setIngredientes(ingredientsList.filter((element) => element));
    }
  }, [onlyRecipes]);

  // UseEffect para juntar o ingrediente com a medida
  useEffect(() => {
    if (ingredients.length > 0 && measure.length > 0) {
      const ingredientsAndMeasure = ingredients.map(
        (ingredient: string, index: number) => (
          `${ingredient} - ${measure[index]}`
        ),
      );
      console.log(ingredientsAndMeasure);
      handleSetIngredients(ingredientsAndMeasure);
    }
  }, [ingredients, measure]);

  const verifyFavorite = () => {
    const favoriteRecipesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );
    const isRecipeAlreadyFavorite = favoriteRecipesStorage.some(
      (recipinha: any) => recipinha.id === id,
    );
    if (isRecipeAlreadyFavorite) {
      setLike(true);
    }
  };
  const saveToLocalStorage = (recipes: any) => {
    if (!like) {
      const recipeType = recipes.meals ? 'meal' : 'drink';
      const recipeData = recipes.meals || recipes.drinks;
      const favoriteRecipesStorage = JSON.parse(
        localStorage.getItem('favoriteRecipes') || '[]',
      );
      const newFavoriteRecipe = {
        id: recipeData[0].idMeal || recipeData[0].idDrink,
        type: recipeType,
        nationality: recipeData[0].strArea || '',
        category: recipeData[0].strCategory || '',
        alcoholicOrNot: recipeData[0].strAlcoholic || '',
        name: recipeData[0].strMeal || recipeData[0].strDrink,
        image: recipeData[0].strMealThumb || recipeData[0].strDrinkThumb,
      };
      const isRecipeAlreadyFavorite = favoriteRecipesStorage.some(
        (recipinha: any) => recipinha.id === newFavoriteRecipe.id,
      );
      if (!isRecipeAlreadyFavorite) {
        const newFavoriteRecipes = [...favoriteRecipesStorage, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        handleSetFavorite(newFavoriteRecipes);
      }
    }
    if (like) {
      const favoriteRecipesStorage = JSON.parse(
        localStorage.getItem('favoriteRecipes') || '[]',
      );
      const newFavoriteRecipes = favoriteRecipesStorage.filter(
        (recipinha: any) => recipinha.id !== id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      handleSetFavorite(newFavoriteRecipes);
    }
  };

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
                <h3>Ingredients</h3>
                <ul>
                  {
                    ingredients.map((ingredient, index) => (
                      <li
                        key={ ingredient }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        { ingredient }
                        -
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
                <h3>Ingredients</h3>
                <ul>
                  {
                    ingredients.map((ingredient, index) => (
                      <li
                        key={ ingredient }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        { ingredient }
                        -
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
      </div>
      <Carousel />
      <ButtonsRecipeDetails />
      <button
        onClick={ () => {
          setLike(!like);
          saveToLocalStorage(onlyRecipes);
        } }
      >
        <img
          src={ like ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="White Heart"
        />
      </button>
      <ButtonStart />
    </div>
  );
}
