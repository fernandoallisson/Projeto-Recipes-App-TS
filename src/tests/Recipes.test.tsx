import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { makeMockFetch } from './mock';

describe('testando a tela de receitas', () => {
  makeMockFetch();
  // Meals
  it('Verifica se aparece os botões vindos da API', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const breakfastBtn = await screen.findByText('Breakfast');
    const beefBtn = await screen.findByText('Beef');
    const chickenBtn = await screen.findByText('Chicken');
    const dessertBtn = await screen.findByText('Dessert');
    const goatBtn = await screen.findByText('Goat');
    expect(breakfastBtn).toBeInTheDocument();
    expect(beefBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
  });
  it('Verifica se aparece Chicken Handi Pie quando clicar em chicken', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const beefBtn = await screen.findByTestId('Chicken-category-filter');
    fireEvent.click(beefBtn);

    const beefAndMustardPie = await screen.findByText('Chicken Handi');
    expect(beefAndMustardPie).toBeInTheDocument();
  });
  it('Verifica se redireciona à página de detalhes quando clica no card Chicken', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const beefBtn = await screen.findByTestId('Chicken-category-filter');
    fireEvent.click(beefBtn);

    const beefAndMustardPie = await screen.findByText('Chicken Handi');
    expect(beefAndMustardPie).toBeInTheDocument();

    fireEvent.click(beefAndMustardPie);

    const startRecipe = await screen.findByText('Start Recipe');
    expect(startRecipe).toBeInTheDocument();
  });
  // Drinks
  it('Verifica se aparece os botões vindos da API', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const ordinarDyrinkBtn = await screen.findByText('Ordinary Drink');
    const cocktailBtn = await screen.findByText('Cocktail');
    const shakeBtn = await screen.findByText('Shake');

    expect(ordinarDyrinkBtn).toBeInTheDocument();
    expect(cocktailBtn).toBeInTheDocument();
    expect(shakeBtn).toBeInTheDocument();
  });
  it('Verifica se aparece 155 Belmont quando clicar em cocktail', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    fireEvent.click(cocktailBtn);

    const Belmont155 = await screen.findByText('155 Belmont');
    expect(Belmont155).toBeInTheDocument();
  });
  it('Verifica se redireciona à página de detalhes quando clica no card 155 Belmont', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    fireEvent.click(cocktailBtn);

    const Belmont155 = await screen.findByText('155 Belmont');
    expect(Belmont155).toBeInTheDocument();

    fireEvent.click(Belmont155);

    const startRecipe = await screen.findByText('Start Recipe');
    expect(startRecipe).toBeInTheDocument();
  });
});
