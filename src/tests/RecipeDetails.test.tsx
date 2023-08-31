import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockFetch } from './mock/index';
import App from '../App';

describe('testando a RecipeDetails', () => {
  // const execBtn = 'exec-search-btn';
  // const searchInput = 'search-input';
  // const searchTop = 'search-top-btn';
  // const corbaValue = 'Corba';
  beforeEach(() => {
    mockFetch();
  });
  test.only('Verifica se na rota [/meals/52977] existe o nome [Corba]', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals/52977'] }>
        <App />
      </MemoryRouter>,
    );
    // const searchTopBtn = await screen.findByTestId(searchTop);
    // fireEvent.click(searchTopBtn);

    // const input = await screen.findByTestId(searchInput);
    // fireEvent.change(input, { target: { value: corbaValue } });

    // const execButton = await screen.findByTestId(execBtn);
    // fireEvent.click(execButton);

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
});