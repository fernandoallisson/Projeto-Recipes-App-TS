import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSearchDrinksByFirstLetter,
  getSearchDrinksByIngredient,
  getSearchDrinksByName,
  getSearchMealsByFirstLetter,
  getSearchMealsByIngredient,
  getSearchMealsByName } from '../Services';

export function SearchBar() {
  const [input, setInput] = useState(''); // input do usuário
  const [filter, setFilter] = useState(''); // filtro selecionado pelo usuário
  const [productInfo, setProductInfo] = useState([]); // informações do produto que posteriormente serão armaenadas no contexto

  const location = useLocation();

  const handleChangeRadios = (e: any) => {
    if (location.pathname === '/meals') {
      setFilter(`M${e.target.value}`);
    } else if (location.pathname === '/drinks') {
      setFilter(`D${e.target.value}`);
    }
  };

  const Condicao = async () => {
    if (location.pathname === '/meals') {
      switch (filter) {
        case 'Mname':
          setProductInfo(await getSearchMealsByName(input));
          break;
        case 'Mingredient':
          setProductInfo(await getSearchMealsByIngredient(input));
          break;
        case 'MfirstLetter':
          if (input.length === 1) {
            setProductInfo(await getSearchMealsByFirstLetter(input));
          } else {
            window.alert('Your search must have only 1 (one) character');
          }
          break;
        default:
          console.log('Please, select an option');
      }
    }
    if (location.pathname === '/drinks') {
      switch (filter) {
        case 'Dname':
          setProductInfo(await getSearchDrinksByName(input));
          break;
        case 'Dingredient':
          setProductInfo(await getSearchDrinksByIngredient(input));
          break;
        case 'DfirstLetter':
          if (input.length === 1) {
            setProductInfo(await getSearchDrinksByFirstLetter(input));
          } else {
            window.alert('Your search must have only 1 (one) character');
          }
          break;
        default:
          console.log('Please, select an option');
      }
    }
  };

  const handleTeste = async () => {
    console.log(filter);
    console.log(productInfo);
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
          onChange={ handleChangeRadios }
        />
        Name
        <input
          name="filter"
          type="radio"
          value="name"
          data-testid="name-search-radio"
          onChange={ handleChangeRadios }
        />
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
        onClick={ Condicao }
      >
        Search
      </button>
    </div>
  );
}
