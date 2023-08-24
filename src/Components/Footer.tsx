import { useNavigate } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      data-testid="footer"
    >
      <button
        onClick={ () => navigate('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="Página de Bebidas"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        onClick={ () => navigate('/meals') }
      >
        <img
          src={ mealIcon }
          alt="Página de Comidas"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}
