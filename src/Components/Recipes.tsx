import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSearchDrinksByName, getSearchMealsByName } from '../Services';

export function Cards() {
  const [productsToShow, setProductsToShow] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchProducts() {
      const responseDrinks = await getSearchDrinksByName('');
      const dataDrinks = await responseDrinks.drinks;

      const responseMeals = await getSearchMealsByName('');
      const dataMeals = await responseMeals.meals;

      const drinks = dataDrinks;
      const meals = dataMeals;

      if (location.pathname === '/drinks') setProductsToShow(drinks.slice(0, 12));
      if (location.pathname === '/meals') setProductsToShow(meals.slice(0, 12));
    }

    fetchProducts();
  }, [location.pathname]);

  return (
    <div>
      {productsToShow.map((product: any, index: number) => (
        <div
          key={ product.idDrink || product.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <p data-testid={ `${index}-card-name` }>
            {product.strDrink || product.strMeal}
          </p>
          <img
            src={ product.strDrinkThumb || product.strMealThumb }
            alt={ product.strDrink || product.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </div>
  );
}
