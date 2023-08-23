import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/index';
import { Header, HeaderProps } from '../Components/Header/Index';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export function FavoriteRecipes() {
  const { emailState } = useContext(AuthContext);

  const handleSubmit = () => {
    const { pathname } = window.location;
  };
  return (

    <>
      <div>
        <Header title="Favorite Recipes" />
        <h1>{emailState}</h1>
      </div>
      {/* <div id="headerByHeader">
        { title === 'Meals'
          ? null
          : <Link to="/search"><img src={ searchIcon } alt="" /></Link>}
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
        </Link>
      </div> */}
      <label htmlFor="email">
        <div>
          <h1>{emailState}</h1>
        </div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          onClick={ () => handleSubmit() }
        >
          Enter
        </button>
      </label>

    </>
  );
}
