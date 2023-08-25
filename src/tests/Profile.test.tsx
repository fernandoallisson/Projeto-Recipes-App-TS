import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Profile } from '../Pages/Profile';

describe('Footer Component', () => {
  it('Deve navegar para /done-recipes quando o botão Done Recipes for clicado', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesButton);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('Deve navegar para /favorite-recipes quando o botão Favorite Recipes for clicado', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesButton);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('Deve navegar para / quando o botão Favorite Logout for clicado', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const logoutButton = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);
    expect(window.location.pathname).toBe('/');
  });
});
