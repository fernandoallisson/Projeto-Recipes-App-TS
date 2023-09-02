import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RecipesContext } from '../Context';
import { Drink, Meal } from '../types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { ButtonsRecipeDetails } from '../Components/ButtonsRecipeDetails';
import { getRecipesById } from '../Services';

export function RecipeInProgress() {
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [measure, setMeasure] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const { onlyRecipes,
    ingredients,
    handleSetFavorite,
    hanleSetOnlyRecipes,
  } = useContext(RecipesContext);
  const [like, setLike] = useState(false);

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
  useEffect(() => {
    fetchDataRecipe();
    verifyFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
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
  useEffect(() => {
    if (ingredients.length > 0 && measure.length > 0) {
      const ingredientsAndMeasure = ingredients.map(
        (ingredient: string, index: number) => (
          `${ingredient} - ${measure[index]}`
        ),
      );
      console.log(ingredientsAndMeasure);
      setIngredientes(ingredientsAndMeasure);
    }
  }, [ingredients, measure]);
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
  const [isChecked, setIsChecked] = useState(Array(20).fill(false));
  const handleCheckboxChange = async (index: number) => {
    const newCheckedState = [...isChecked];
    newCheckedState[index] = !newCheckedState[index];
    setIsChecked(newCheckedState);
  };

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
              <h3>Ingredients</h3>
              <label>
                {
                  ingredientes.map((ingredient, index) => (
                    <label
                      id="in"
                      key={ ingredient + index }
                      data-testid={ `${index}-ingredient-step` }
                      className={
                        isChecked[index]
                          ? 'riscado'
                          : ''
                      }
                    >
                      <input
                        id="in"
                        type="checkbox"
                        checked={ isChecked[index] }
                        onChange={ () => handleCheckboxChange(index) }
                      />
                      {ingredient}
                    </label>
                  ))
                }
              </label>
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
              <h3>Ingredients</h3>
              <label>
                {
                  ingredientes.map((ingredient, index) => (
                    <label
                      id="in"
                      key={ ingredient + index }
                      data-testid={ `${index}-ingredient-step` }
                      className={ isChecked[index] ? 'riscado' : '' }
                    >
                      <input
                        id="in"
                        type="checkbox"
                        checked={ isChecked[index] }
                        onChange={ () => handleCheckboxChange(index) }
                      />
                      {ingredient}
                    </label>
                  ))
                }
              </label>
              <h3>Instructions</h3>
              <p data-testid="instructions">{ element.strInstructions }</p>
            </div>
          ))}
        </div>
      )}
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
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}
