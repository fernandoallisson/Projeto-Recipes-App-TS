import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export function ShareButton() {
  const [linkCopied, setLinkCopied] = useState(false);
  const { id } = useParams<{ id: string }>();

  const location = useLocation();

  const copyLinkToClipboard = () => {
    if (location.pathname.includes('meals')) {
      const shareLink = `http://localhost:3000/meals/${id}`;
      navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
    }
    if (location.pathname.includes('drinks')) {
      const shareLink = `http://localhost:3000/drinks/${id}`;
      navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
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
    </div>
  );
}
