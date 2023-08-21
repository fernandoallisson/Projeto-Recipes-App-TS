import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Logo from '../../images/Logo.svg';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) { // Revisar o tipo de title
  return (
    <header>
      <div id="headerByHeader">
        <img src={ Logo } alt="" />
        <h1>Recipe App</h1>
        <button>
          <img src={ searchIcon } alt="" />
        </button>
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
        </Link>
      </div>
      <div id="title">
        <img src={ title === 'Meals' ? mealIcon : drinkIcon } alt="" />
        <h1 data-testid="page-title">{ title }</h1>
      </div>
    </header>
  );
}
