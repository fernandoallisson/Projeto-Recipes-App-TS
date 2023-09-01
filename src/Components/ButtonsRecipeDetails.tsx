import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

export function ButtonsRecipeDetails() {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
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
    </div>
  );
}
