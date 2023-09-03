import { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../Context';

export function AllIngredients() {
  const [ingredients, setIngredientes] = useState<string[]>([]);
  const [measure, setMeasure] = useState<string[]>([]);

  const { onlyRecipes, handleSetIngredients } = useContext(RecipesContext);

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
      handleSetIngredients(ingredientsAndMeasure);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, ingredients]);
  return (
    <div>
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
    </div>
  );
}
