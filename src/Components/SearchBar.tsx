import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSearchDrinksByFirstLetter,
  getSearchDrinksByIngredient,
  getSearchDrinksByName,
  getSearchMealsByFirstLetter,
  getSearchMealsByIngredient,
  getSearchMealsByName } from '../Services';
import { RecipesContext } from '../Context';

export function SearchBar() {
  const [input, setInput] = useState(''); // input do usuário
  const [filter, setFilter] = useState(''); // filtro selecionado pelo usuário
  const location = useLocation();
  const { setHanleProductsInfo, productsInfo } = useContext(RecipesContext);

  const handleChangeRadios = (e: any) => {
    if (location.pathname === '/meals') {
      setFilter(`M${e.target.value}`);
    } else if (location.pathname === '/drinks') {
      setFilter(`D${e.target.value}`);
    }
  };

  const handleSearch = async () => {
    if (location.pathname === '/meals') {
      switch (filter) {
        case 'Mname':
          setHanleProductsInfo(await getSearchMealsByName(input));
          break;
        case 'Mingredient':
          setHanleProductsInfo(await getSearchMealsByIngredient(input));
          break;
        case 'MfirstLetter':
          if (input.length === 1) {
            setHanleProductsInfo(await getSearchMealsByFirstLetter(input));
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
          setHanleProductsInfo(await getSearchDrinksByName(input));
          break;
        case 'Dingredient':
          setHanleProductsInfo(await getSearchDrinksByIngredient(input));
          break;
        case 'DfirstLetter':
          if (input.length === 1) {
            setHanleProductsInfo(await getSearchDrinksByFirstLetter(input));
          } else {
            window.alert('Your search must have only 1 (one) character');
          }
          break;
        default:
          console.log('Please, select an option');
      }
    }
  };

  const handleTeste = () => {
    console.log(productsInfo);
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
