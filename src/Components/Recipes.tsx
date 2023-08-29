import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../Context/index';
import { getSearchDrinksByName, getSearchMealsByName } from '../Services/index';

export function Cards() {
  const [productsDefault, setProductsDefault] = useState<{ meals: []; }>({ meals: [] }); // products = [meals, drinks
  const { productsInfo, setHandleProductsInfo } = useContext(RecipesContext);
  const { meals, drinks } = productsInfo;
  const location = useLocation();

  const combinedProducts = [...(meals || []), ...(drinks || [])];
  const productsToShow = combinedProducts.slice(0, 12);

  const getDefaultProducts = async () => {
    const mealsProducts = await getSearchMealsByName('');
    const drinksProducts = await getSearchDrinksByName('');

    if (location.pathname === '/meals') {
      setHandleProductsInfo(mealsProducts.meals.slice(0, 12));
    }

    if (location.pathname === '/drinks') {
      setHandleProductsInfo(drinksProducts.drinks.slice(0, 12));
    }
  };

  getDefaultProducts();
  console.log(productsInfo);

  return (
    <div>
      {productsToShow.length !== 0 ? (productsToShow.map(
        (product: any, index: number) => (
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
        ),
      )) : (
        productsInfo.map((product: any, index: number) => (
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
        ))
      )}
    </div>
  );
}
