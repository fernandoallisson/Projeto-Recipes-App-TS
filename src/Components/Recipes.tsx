import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getSearchDrinksByCategory,
  getSearchDrinksByName,
  getSearchDrinksCategories,
  getSearchMealsByCategory,
  getSearchMealsByName,
  getSearchMealsCategories,
} from '../Services';
import { RecipesContext } from '../Context';
import { Card } from './Card';

export function Recipes() {
  const [categories, setCategories] = useState<string[]>([]);
  const [oltCategory, setOltCategory] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setHandleProductsInfo } = useContext(RecipesContext);

  const fetchProducts = async () => {
    if (location.pathname === '/drinks') {
      const responseDrinks = await getSearchDrinksByName('');
      const { drinks } = responseDrinks;
      setHandleProductsInfo(drinks.slice(0, 12));
    }

    if (location.pathname === '/meals') {
      const responseMeals = await getSearchMealsByName('');
      const { meals } = responseMeals;
      setHandleProductsInfo(meals.slice(0, 12));
    }
  };

  const fetchCategories = async () => {
    if (location.pathname === '/drinks') {
      const responseDrinks = await getSearchDrinksCategories();
      const { drinks } = responseDrinks;
      setCategories(drinks.slice(0, 5));
    }
    if (location.pathname === '/meals') {
      const responseMeals = await getSearchMealsCategories();
      const { meals } = responseMeals;
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
        const { drinks } = responseDrinks;
        setHandleProductsInfo(drinks.slice(0, 12));
        setOltCategory(category);
      }
      if (location.pathname === '/meals') {
        const responseMeals = await getSearchMealsByCategory(category);
        const { meals } = responseMeals;
        setHandleProductsInfo(meals.slice(0, 12));
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
      <Card handleClick={ handleClick } />
    </div>
  );
}
