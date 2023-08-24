import { useEffect, useState } from 'react';
import { getSearchByFirstLetter,
  getSearchByIngredient } from '../Services';

  type ProductType = {
    meals: [{
      idMeal: string;
      strArea: string;
    }];
  };

export function SearchBar() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('name');
  const [productInfoByName, setProductInfo] = useState<ProductType[]>([]);

  const fetchProductInfoByName = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`,
    );
    const data = await response.json();
    return data;
  };

  const fetchProductInfoByIngredient = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`,
    );
    const data = await response.json();
    setProductInfo(data);
    return data;
  };

  const fetchProductInfoByFL = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`,
    );
    const data = await response.json();
    setProductInfo(data);
    return data;
  };

  const handleFetchApi = async () => {
    switch (filter) {
      case 'name':
        setProductInfo(await fetchProductInfoByName());
        break;
      case 'ingredient':
        setProductInfo(await fetchProductInfoByIngredient());
        break;
      case 'firstLetter':
        if (input.length === 1) {
          setProductInfo(await fetchProductInfoByFL());
        } else {
          window.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        console.log('Please, select an option');
    }
  };
  const handleTeste = () => {
    console.log('Teste');
    // const { idMeal, strArea } = productInfoByName[0];
    console.log(productInfoByName);
  };
  return (
    <div>

      <button onClick={ handleTeste }>Teste</button>
      <label data-testid="search-top-btn">
        <input
          type="text"
          value={ input }
          data-testid="search-input"
          onChange={ (e) => setInput(e.target.value) }
        />
        Ingredient
        <input
          name="filter"
          type="radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ (e) => setFilter(e.target.value) }
        />
        Name
        <input
          name="filter"
          type="radio"
          value="name"
          data-testid="name-search-radio"
          onChange={ (e) => setFilter(e.target.value) }
        />
        First letter
        <input
          name="filter"
          type="radio"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          onChange={ (e) => setFilter(e.target.value) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleFetchApi }
      >
        Search
      </button>
    </div>
  );
}
