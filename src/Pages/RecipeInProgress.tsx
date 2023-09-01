import { useContext } from 'react';
import { ButtonStart } from '../Components/ButtonStart';
import { RecipesContext } from '../Context';

export function RecipeInProgress() {
  const { ingredients } = useContext(RecipesContext);

  const handleTeste = () => {
    console.log(ingredients);
  };
  return (
    <div>
      <button onClick={ handleTeste }>Teste</button>
      <h1 data-testid="page-title">Recipe Details</h1>
      <ButtonStart />
    </div>
  );
}
