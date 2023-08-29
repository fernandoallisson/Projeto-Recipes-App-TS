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
  const [productsFiltered, setProductsFiltered] = useState<string[]>([]); // [
  const [categories, setCategories] = useState<string[]>([]);
  const [valueButton, setValueButton] = useState<string>('');
  const location = useLocation();

  const fetchProducts = async () => {
    const responseDrinks = await getSearchDrinksByName('');
    const drinks = responseDrinks.drinks || [];

    const responseMeals = await getSearchMealsByName('');
    const meals = responseMeals.meals || [];

    if (location.pathname === '/drinks') setProductsToShow(drinks.slice(0, 12));
    if (location.pathname === '/meals') setProductsToShow(meals.slice(0, 12));
  };

  const fetchCategories = async () => {
    const responseDrinks = await getSearchDrinksCategories();
    const drinks = responseDrinks.drinks || [];

    const responseMeals = await getSearchMealsCategories();
    const meals = responseMeals.meals || [];

    if (location.pathname === '/drinks') setCategories(drinks.slice(0, 5));
    if (location.pathname === '/meals') setCategories(meals.slice(0, 5));
  };

  const fetchProductsByCategory = async (category: string) => {
    // const responseDrinks = await getSearchDrinksByCategory(category);
    // const drinks = responseDrinks.drinks || [];

    const responseMeals = await getSearchMealsByCategory(category);
    const meals = responseMeals.meals || [];

    if (location.pathname === '/drinks') setProductsFiltered(drinks.slice(0, 12));
    if (location.pathname === '/meals') setProductsFiltered(meals.slice(0, 12));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, valueButton]);

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
        onClick={ () => { setValueButton(''); } }
      >
        All
      </button>
      {productsFiltered.map((product: any, index: number) => (
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
