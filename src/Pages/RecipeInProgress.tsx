import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonStart } from '../Components/ButtonStart';
import { RecipesContext } from '../Context';
import { IngredientsListType } from '../types';

export function RecipeInProgress() {
  const [receita, setReceita] = useState<IngredientsListType>();
  const { ingredients } = useContext(RecipesContext);
  const { pathname } = useLocation();

  const id = pathname.split('/')[2];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const teste = {
    id,
    ingredients,
    checked: false,
  };

  const handleTeste = () => {
    setReceita(teste);
    console.log(receita);
  };

  useEffect(() => {
    setReceita(teste);
  }, [teste]);

  return (
    <div>
      <button onClick={ handleTeste }>Teste</button>
      <h1 data-testid="page-title">Recipe Details</h1>
      { receita && (
        <div>
          <h1>{receita.id}</h1>
          <h1>{receita.ingredients}</h1>
        </div>
      )}
    </div>
  );
}
