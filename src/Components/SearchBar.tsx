import { useEffect, useState } from 'react';
import { getSearchByFirstLetter,
  getSearchByIngredient, getSearchByName } from '../Services';

  type ProductType = {
    id: string,
  };

export function SearchBar() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('name');
  const [productInfo, setProductInfo] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProductInfo = async () => {
      const productInfoApi = await getSearchByName(input);
      setProductInfo(productInfoApi);
    };
    fetchProductInfo();
  }, [input]);

  const handleFetchApi = async () => {
    switch (filter) {
      case 'name':
        productInfo.map((product: ProductType) => product.id);
        console.log(productInfo);
        break;

      case 'ingredient':
        getSearchByIngredient(input);
        break;
      case 'firstLetter':
        if (input.length === 1) {
          getSearchByFirstLetter(input);
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
      {productInfo.map((product: ProductType) => (
        <div key={ product.id }>
          <h1 data-testid="recipe-title">{product.id}</h1>
        </div>
      ))}

    </div>
  );
}
