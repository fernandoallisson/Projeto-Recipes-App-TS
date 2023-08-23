import { useEffect, useState } from 'react';

export function SearchBar() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('');
  const [dataApi, setDataApi] = useState('');

  useEffect(() => {
    switch (filter) {
      case 'name':
        setDataApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
        break;
      case 'ingredient':
        setDataApi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`);
        break;
      case 'firstLetter':
        if (input.length === 1) {
          setDataApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`);
        } else {
          window.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        console.log('Please, select an option');
    }
  }, [filter, input]);

  const fetchApi = async () => {
    const response = await fetch(dataApi);
    const data = await response.json();
    return data;
  };

  console.log(filter);

  return (
    <div>
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
      >
        Search
      </button>
    </div>
  );
}
