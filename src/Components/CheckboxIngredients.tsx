import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../Context';
import { getRecipesById } from '../Services';

export type CheckboxProps = {
  id: string | undefined;
};

export function CheckboxIngredients({ id }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [measure, setMeasure] = useState<string[]>([]);
  const { onlyRecipes,
    ingredients,
    hanleSetOnlyRecipes,
    handleSetIngredients,
  } = useContext(RecipesContext);

  const location = useLocation();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
      handleSetIngredients(ingredientsAndMeasure);
    }
  }, [ingredients, measure]);

  return (
    <div>
      {ingredientes.map((ingredient, index) => (
        <label key={ ingredient } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            checked={ isChecked }
            onChange={ handleCheckboxChange }
          />
          <div className={ isChecked ? 'riscado' : '' }>{ingredient}</div>
        </label>
      ))}
    </div>
  );
}
