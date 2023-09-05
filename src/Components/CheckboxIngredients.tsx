import { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../Context';

export function CheckboxIngredients() {
  const [isChecked, setIsChecked] = useState(Array(20).fill(false));
  const [ingredients, setIngredientes] = useState<string[]>([]);
  const { onlyRecipes } = useContext(RecipesContext);

  const handleCheckboxChange = async (index: number) => {
    const newCheckedState = [...isChecked];
    newCheckedState[index] = !newCheckedState[index];
    setIsChecked(newCheckedState);
  };

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

  return (
    <div>
      <h3>Ingredients</h3>
      <label>
        {
        ingredients.map((ingredient, index) => (
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
    </div>
  );
}
