import React, { useContext } from 'react';
import { RecipesContext } from '../Context/index';

export function Cards() {
  const { productsInfo } = useContext(RecipesContext);
  const { meals, drinks } = productsInfo;

  const combinedProducts = [...(meals || []), ...(drinks || [])];
  const productsToShow = combinedProducts.slice(0, 12);

  return (
    <div>
      {productsToShow && productsToShow.map((product: any, index: number) => (
        <div
          key={ product.idMeal || product.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <p data-testid={ `${index}-card-name` }>
            {product.strMeal
           || product.strDrink}

          </p>
          <img
            src={ product.strMealThumb || product.strDrinkThumb }
            alt={ product.strMeal || product.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </div>
  );
}
