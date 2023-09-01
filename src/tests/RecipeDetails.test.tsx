import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { vi } from 'vitest';
import { mockFetch } from './mock/index';
import App from '../App';

describe('testando a RecipeDetails', () => {
  const favoriteBtn = 'favorite-btn';
  mockFetch();
  test('Verifica se na rota [/meals/52977] existe o nome [Corba]', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals/52977'] }>
        <App />
      </MemoryRouter>,
    );
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();

    fireEvent.click(corba);

    const ingredients = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredients).toBeInTheDocument();

    const instructions = await screen.findByText('Instructions');
    expect(instructions).toBeInTheDocument();

    const side = await screen.findByText('Side');
    expect(side).toBeInTheDocument();
  });
  test('Verifica se na rota [/drinks/15997] existe o nome [GG]', async () => {
    mockFetch();
    render(
      <MemoryRouter initialEntries={ ['/drinks/15997'] }>
        <App />
      </MemoryRouter>,
    );
    const gg = await screen.findByText('GG');
    expect(gg).toBeInTheDocument();

    const alcohol = await screen.findByText('Optional alcohol');
    expect(alcohol).toBeInTheDocument();

    const ingredients = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredients).toBeInTheDocument();

    const instructions = await screen.findByText('Instructions');
    expect(instructions).toBeInTheDocument();

    const optionalAlcohol = await screen.findByText('Optional alcohol');
    expect(optionalAlcohol).toBeInTheDocument();
  });
  test('Verfica se Há um botão com uma imagem de like', async () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = await screen.findByTestId('email-input');
    const inputPassword = await screen.findByTestId('password-input');
    const btnLogin = await screen.findByTestId('login-submit-btn');
    const chickenHandi = await screen.findByText('Chicken Handi');

    fireEvent.change(inputEmail, { target: { value: 'email@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    fireEvent.click(btnLogin);
    fireEvent.click(chickenHandi);
    const like = await screen.findByTestId(favoriteBtn);
    expect(like).toBeInTheDocument();

    fireEvent.click(like);

    expect(like).toBeInTheDocument();

    fireEvent.click(like);

    expect(like).toBeInTheDocument();
  });
  // test.only('Verifica se o botão de like funciona', async () => {
  //   render(
  //     <MemoryRouter initialEntries={ ['/meals/52977'] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const like = await screen.findByTestId(favoriteBtn);
  //   expect(like).toBeInTheDocument();

  //   fireEvent.click(like);
  //   console.log(localStorage.getItem('favoriteRecipes'));
  //   const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  //   expect(favoriteRecipes).toBe([{
  //     id: '52977',
  //     type: 'meal',
  //     nationality: 'Turkish',
  //     category: 'Side',
  //     alcoholicOrNot: '',
  //     name: 'Corba',
  //     image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //   }]);
  // });
});
