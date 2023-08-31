import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

export function ButtonsRecipeDetails() {
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
  };

  const hanleStartRecipe = () => {
    if (pathname.includes('meals')) {
      navigate('/meals/52771/in-progress');
    }
    if (pathname.includes('drinks')) {
      navigate('/drinks/178319/in-progress');
    }
  };
  return (
    <div>
      <button
        id="copy-button"
        data-testid="share-btn"
        onClick={ () => {
          copyLinkToClipboard();
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      {linkCopied && <span>Link copied!</span>}
      <button
        className="startRecipe"
        data-testid="start-recipe-btn"
        onClick={ hanleStartRecipe }
      >
        Start Recipe
      </button>
    </div>
  );
}
