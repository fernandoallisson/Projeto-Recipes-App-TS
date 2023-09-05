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
    if (productsInfo === null) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
      return null;
    }
    return null;
  };

  const handleChangeRadios = (e: any) => {
    if (location.pathname === '/meals') {
      setFilter(`M${e.target.value}`);
    } else if (location.pathname === '/drinks') {
      setFilter(`D${e.target.value}`);
    }
  };

  const oneProduct = () => {
    if (productsInfo && location.pathname === '/meals') {
      if (productsInfo.length === 1) {
        const idMeals = productsInfo[0].idMeal;
        navigate(idMeals);
      }
    } else if (productsInfo && location.pathname === '/drinks') {
      if (productsInfo.length === 1) {
        const idDrinks = productsInfo[0].idDrink;
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

  // eslint-disable-next-line complexity, sonarjs/cognitive-complexity
  async function handleSearch() {
    if (location.pathname === '/meals') {
      switch (filter) {
        case 'Mname': {
          const { meals } = await getSearchMealsByName(input);
          setHandleProductsInfo(meals && meals.slice(0, 12));
        }
          break;
        case 'Mingredient': {
          const { meals } = await getSearchMealsByIngredient(input);
          setHandleProductsInfo(meals && meals.slice(0, 12));
        }
          break;
        case 'MfirstLetter':
          if (input.length === 1) {
            const { meals } = await getSearchMealsByFirstLetter(input);
            setHandleProductsInfo(meals && meals.slice(0, 12));
          } else if (input.length > 1) {
            window.alert('Your search must have only 1 (one) character');
          }
          break;
        default:
          window.alert('Please, select an option');
      }
    }
    if (location.pathname === '/drinks') {
      switch (filter) {
        case 'Dname': {
          const { drinks } = await getSearchDrinksByName(input);
          setHandleProductsInfo(drinks && drinks.slice(0, 12));
        }
          break;
        case 'Dingredient': {
          const { drinks } = await getSearchDrinksByIngredient(input);
          setHandleProductsInfo(drinks && drinks.slice(0, 12));
        }
          break;
        case 'DfirstLetter':
          if (input.length === 1) {
            const { drinks } = await getSearchDrinksByFirstLetter(input);
            setHandleProductsInfo(drinks && drinks.slice(0, 12));
          } else if (input.length > 1) {
            window.alert('Your search must have only 1 (one) character');
          }
          break;
        default:
          window.alert('Please, select an option');
      }
    }
  }

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
