import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Meals } from '../Pages/Meals';

describe('Footer Component', () => {
  it('Deve navegar para /drinks quando o botão drinks for clicado', () => {
    render(
      <Router>
        <Meals />
      </Router>,
    );

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksButton);
    expect(window.location.pathname).toBe('/drinks');
  });

  it('Deve navegar para /meals quando o botão meals for clicado', () => {
    render(
      <Router>
        <Meals />
      </Router>,
    );

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    fireEvent.click(mealsButton);
    expect(window.location.pathname).toBe('/meals');
  });
});
