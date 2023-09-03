import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { onlyRecipes, handleSetFavorite } = useContext(RecipesContext);

  useEffect(() => {
    const favoriteRecipesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );
    const isRecipeAlreadyFavorite = favoriteRecipesStorage.some(
      (recipe: any) => recipe.id === id,
    );
    setIsFavorite(isRecipeAlreadyFavorite);
  }, [id]);

  function toggleFavorite() {
    if (!onlyRecipes.meals && !onlyRecipes.drinks) {
      return; // No recipes to toggle favorite for
    }

    const recipeData = onlyRecipes.meals || onlyRecipes.drinks;
    const {
      idMeal,
      idDrink,
      strArea,
      strCategory,
      strAlcoholic,
      strMeal,
      strDrink,
      strMealThumb,
      strDrinkThumb,
    } = recipeData[0];

    const newFavoriteRecipe = {
      id: idMeal || idDrink,
      type: idMeal ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };

    const favoriteRecipesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );

    const isRecipeAlreadyFavorite = favoriteRecipesStorage.some(
      (recipe: any) => recipe.id === newFavoriteRecipe.id,
    );

    if (!isFavorite) {
      if (!isRecipeAlreadyFavorite) {
        const newFavoriteRecipes = [...favoriteRecipesStorage, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        handleSetFavorite(newFavoriteRecipes);
      }
    } else {
      const newFavoriteRecipes = favoriteRecipesStorage.filter(
        (recipe: any) => recipe.id !== id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      handleSetFavorite(newFavoriteRecipes);
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <button onClick={ toggleFavorite }>
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        alt="White Heart"
      />
    </button>
  );
}
