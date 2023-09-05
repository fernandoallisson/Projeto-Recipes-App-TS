import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = await screen.findByTestId('email-input');
    fireEvent.change(inputEmail, { target: { value: 'email@email.com' } });

    const inputPassword = await screen.findByTestId('password-input');
    fireEvent.change(inputPassword, { target: { value: '1234567' } });

    const btnLogin = await screen.findByTestId('login-submit-btn');
    fireEvent.click(btnLogin);

    const corba = await screen.findByText('Corba');
    fireEvent.click(corba);

    const like = await screen.findByTestId(favoriteBtn);
    expect(like).toBeInTheDocument();

    fireEvent.click(like);

    expect(like).toBeInTheDocument();

    fireEvent.click(like);

    expect(like).toBeInTheDocument();
  });
});
