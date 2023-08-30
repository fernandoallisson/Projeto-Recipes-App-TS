import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [oltCategory, setOltCategory] = useState<string>('');
  const navigate = useNavigate();
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
    if (category === oltCategory) {
      fetchProducts();
      setOltCategory('');
    } else if (category !== '') {
      if (location.pathname === '/drinks') {
        const responseDrinks = await getSearchDrinksByCategory(category);
        const drinks = responseDrinks.drinks || [];
        setProductsToShow(drinks.slice(0, 12));
        setOltCategory(category);
      }
      if (location.pathname === '/meals') {
        const responseMeals = await getSearchMealsByCategory(category);
        const meals = responseMeals.meals || [];
        setProductsToShow(meals.slice(0, 12));
        setOltCategory(category);
      }
    }
  };

  const handleClick = (id: string) => {
    if (id) {
      navigate(id);
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
          role="button"
          tabIndex={ 0 }
          onClick={ () => { handleClick(product.idDrink || product.idMeal); } }
          onKeyDown={ (e) => {
            if (e.key === 'Enter') {
              handleClick(product.idDrink || product.idMeal);
            }
          } }
        >
          <p
            data-testid={ `${index}-card-name` }
          >
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
