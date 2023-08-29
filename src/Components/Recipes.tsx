import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getSearchDrinksByName,
  getSearchDrinksCategories,
  getSearchMealsByName,
  getSearchMealsCategories,
} from '../Services';

export function Cards() {
  const [productsToShow, setProductsToShow] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDrinks = await getSearchDrinksByName('');
        const dataDrinks = responseDrinks.drinks || [];

        const responseMeals = await getSearchMealsByName('');
        const dataMeals = responseMeals.meals || [];

        const drinks = dataDrinks;
        const meals = dataMeals;

        if (location.pathname === '/drinks') setProductsToShow(drinks.slice(0, 12));
        if (location.pathname === '/meals') setProductsToShow(meals.slice(0, 12));

        const responseDrinksCategories = await getSearchDrinksCategories();
        const dataDrinksCategories = responseDrinksCategories.drinks || [];

        const responseMealsCategories = await getSearchMealsCategories();
        const dataMealsCategories = responseMealsCategories.meals || [];

        const drinksCategories = dataDrinksCategories;
        const mealsCategories = dataMealsCategories;

        if (location.pathname === '/drinks') setCategories(drinksCategories.slice(0, 5));
        if (location.pathname === '/meals') setCategories(mealsCategories.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.pathname]);

  return (
    <div>
      {categories.map((categoryName: any) => (
        <button
          key={ categoryName.strCategory }
          data-testid={ `${categoryName.strCategory}-category-filter` }
        >
          {categoryName.strCategory}
        </button>
      ))}
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
