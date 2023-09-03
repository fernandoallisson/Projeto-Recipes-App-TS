import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipesContext } from '../Context';
import {
  getSearchDrinksByFirstLetter,
  getSearchDrinksByIngredient,
  getSearchDrinksByName,
  getSearchMealsByFirstLetter,
  getSearchMealsByIngredient,
  getSearchMealsByName } from '../Services';

export function SearchBar() {
  const [input, setInput] = useState(''); // input do usuário
  const [filter, setFilter] = useState(''); // filtro selecionado pelo usuário

  const { setHandleProductsInfo, productsInfo } = useContext(RecipesContext);

  const location = useLocation();
  const navigate = useNavigate();

  const noProducts = () => {
    const string = Object.keys(productsInfo)[0];
    if (string === 'meals') {
      if (productsInfo.meals === null) {
        return window.alert("Sorry, we haven't found any recipes for these filters.");
      }
    } else if (string === 'drinks') {
      if (productsInfo.drinks === null) {
        return window.alert("Sorry, we haven't found any recipes for these filters.");
      }
    } else {
      return null;
    }
  };

  const handleChangeRadios = (e: any) => {
    if (location.pathname === '/meals') {
      setFilter(`M${e.target.value}`);
    } else if (location.pathname === '/drinks') {
      setFilter(`D${e.target.value}`);
    }
  };

  const oneProduct = () => {
    const string = Object.keys(productsInfo)[0];
    if (string === 'meals') {
      if (productsInfo.meals && productsInfo.meals.length === 1) {
        const idMeals = productsInfo.meals[0].idMeal;
        navigate(idMeals);
      }
    } else if (string === 'drinks') {
      if (productsInfo.drinks && productsInfo.drinks.length === 1) {
        const idDrinks = productsInfo.drinks[0].idDrink;
        navigate(idDrinks);
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    oneProduct();
    noProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsInfo]);

  const handleSearch = async () => {
    if (location.pathname === '/meals') {
      switch (filter) {
        case 'Mname':
          setHandleProductsInfo(await getSearchMealsByName(input));
          break;
        case 'Mingredient':
          setHandleProductsInfo(await getSearchMealsByIngredient(input));
          break;
        case 'MfirstLetter':
          if (input.length === 1) {
            setHandleProductsInfo(await getSearchMealsByFirstLetter(input));
          } else {
            window.alert('Your search must have only 1 (one) character');
          }
          break;
        default:
          window.alert('Please, select an option');
      }
    }
    if (location.pathname === '/drinks') {
      switch (filter) {
        case 'Dname':
          setHandleProductsInfo(await getSearchDrinksByName(input));
          break;
        case 'Dingredient':
          setHandleProductsInfo(await getSearchDrinksByIngredient(input));
          break;
        case 'DfirstLetter':
          if (input.length === 1) {
            setHandleProductsInfo(await getSearchDrinksByFirstLetter(input));
          } else {
            window.alert('Your search must have only 1 (one) character');
          }
          break;
        default:
          window.alert('Please, select an option');
      }
    }
  };

  return (
    <div>
      <label>
        <input
          type="text"
          value={ input }
          data-testid="search-input"
          onChange={ (e) => setInput(e.target.value) }
        />
      </label>
      <label htmlFor="ingredient">
        Ingredient
        <input
          name="filter"
          type="radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleChangeRadios }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          name="filter"
          type="radio"
          value="name"
          data-testid="name-search-radio"
          onChange={ handleChangeRadios }
        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          name="filter"
          type="radio"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          onChange={ handleChangeRadios }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}
