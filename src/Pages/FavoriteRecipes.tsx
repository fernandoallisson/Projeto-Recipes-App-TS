import { useContext, useState } from 'react';
import { AuthContext } from '../Context/index';
import { Header } from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export function FavoriteRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);
  const { emailState } = useContext(AuthContext);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  const copyLinkToClipboard = (id: number) => {
    const shareLink = `http://localhost:3000/meals/${id}`;
    navigator.clipboard.writeText(shareLink);
    setLinkCopied(true);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <h1>{emailState}</h1>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {favoriteRecipes.map((recipe: any, index: number) => (
        <div key={ index }>
          <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}` }
            :
            { `${recipe.alcoholicOrNot}` }
          </p>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button onClick={ () => copyLinkToClipboard(recipe.id) }>
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {linkCopied && <span>Link copied!</span>}
          <button data-testid={ `${index}-horizontal-card-btn` }>See Details</button>
          <button>
            <img
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="White Heart"
            />
          </button>
        </div>
      ))}
    </div>
  );
}
