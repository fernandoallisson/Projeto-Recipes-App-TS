import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipesContext } from '../Context';

export function ButtonStart() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { ingredients } = useContext(RecipesContext);

  const id = pathname.split('/')[2];

  // Salvar no Local Storage Nesse formato
  //   {
  //     drinks: {
  //         id-da-bebida: [lista-de-ingredientes-utilizados],
  //         ...
  //     },
  //     meals: {
  //         id-da-comida: [lista-de-ingredientes-utilizados],
  //         ...
  //     }
  // }
  const saveToLocalStorage = () => {
    const inProgressRecipesStr = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesStr !== null) {
      const inProgressRecipes = JSON.parse(inProgressRecipesStr);
      if (pathname.includes('meals')) {
        if (inProgressRecipes) {
          const newInProgressRecipes = {
            ...inProgressRecipes,
            meals: {
              ...inProgressRecipes.meals,
              [id]: [ingredients],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
        } else {
          const newInProgressRecipes = {
            meals: {
              [id]: [ingredients],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
        }
      }
      if (pathname.includes('drinks')) {
        if (inProgressRecipes) {
          const newInProgressRecipes = {
            ...inProgressRecipes,
            drinks: {
              ...inProgressRecipes.drinks,
              [id]: [ingredients],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
        } else {
          const newInProgressRecipes = {
            drinks: {
              [id]: [ingredients],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
        }
      }
    }
  };

  const hanleStartRecipe = () => {
    if (pathname.includes('meals')) {
      saveToLocalStorage();
      navigate(`/meals/${id}/in-progress`);
    }
    if (pathname.includes('drinks')) {
      saveToLocalStorage();
      navigate(`/drinks/${id}/in-progress`);
    }
  };

  const handleTeste = () => {
    console.log(ingredients);
  };

  return (
    <div>
      <button onClick={ handleTeste }>Teste</button>
      <button
        className="startRecipe"
        data-testid="start-recipe-btn"
        onClick={ hanleStartRecipe }
      >
        Continue Recipe
      </button>
    </div>
  );
}
