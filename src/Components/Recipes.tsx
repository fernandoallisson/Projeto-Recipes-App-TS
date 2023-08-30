import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getSearchDrinksByCategory,
  getSearchDrinksByName,
  getSearchDrinksCategories,
  getSearchMealsByCategory,
  getSearchMealsByName,
  getSearchMealsCategories,
} from '../Services';

export function Cards() {
  const [productsToShow, setProductsToShow] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const location = useLocation();

  const fetchProducts = async () => {
    if (location.pathname === '/drinks') {
      const responseDrinks = await getSearchDrinksByName('');
      const drinks = responseDrinks.drinks || [];
      setProductsToShow(drinks.slice(0, 12));
    }

    if (location.pathname === '/meals') {
      const responseMeals = await getSearchMealsByName('');
      const meals = responseMeals.meals || [];
      setProductsToShow(meals.slice(0, 12));
    }
  };

  const fetchCategories = async () => {
    if (location.pathname === '/drinks') {
      const responseDrinks = await getSearchDrinksCategories();
      const drinks = responseDrinks.drinks || [];
      setCategories(drinks.slice(0, 5));
    }
    if (location.pathname === '/meals') {
      const responseMeals = await getSearchMealsCategories();
      const meals = responseMeals.meals || [];
      setCategories(meals.slice(0, 5));
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    if (location.pathname === '/drinks') {
      const responseDrinks = await getSearchDrinksByCategory(category);
      const drinks = responseDrinks.drinks || [];
      setProductsToShow(drinks.slice(0, 12));
    }
    if (location.pathname === '/meals') {
      const responseMeals = await getSearchMealsByCategory(category);
      const meals = responseMeals.meals || [];
      setProductsToShow(meals.slice(0, 12));
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      {categories.map((categoryName: any) => (
        <button
          key={ categoryName.strCategory }
          data-testid={ `${categoryName.strCategory}-category-filter` }
          onClick={ () => { fetchProductsByCategory(categoryName.strCategory); } }
        >
          {categoryName.strCategory}
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ () => { fetchProducts(); } }
      >
        All
      </button>
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
