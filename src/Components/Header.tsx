import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Logo from '../images/Logo.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const profile = 'Profile';
  const doneRecipes = 'Done Recipes';
  const favoriteRecipes = 'Favorite Recipes';

  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };
  return (
    <header>
      <div id="headerByHeader">
        <img src={ Logo } alt="" />
        <h1>Recipe App</h1>
      </div>
      <div id="headerByHeader">
        {title === profile
            || title === doneRecipes
            || title === favoriteRecipes
          ? null
          : (
            <button
              data-testid="toggle-search-button"
              type="button"
              onClick={ toggleSearch }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt=""
              />
            </button>)}

        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
        </Link>
      </div>
      <div id="title">
        <img src={ title === 'Meals' ? drinkIcon : mealIcon } alt="" />
        <h1 data-testid="page-title">{title}</h1>
      </div>
      {isSearchVisible && (
        <SearchBar />
      )}
    </header>
  );
}
