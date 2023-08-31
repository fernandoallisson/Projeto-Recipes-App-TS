import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { makeMockFetch } from './mock';

describe('testando a tela de receitas', () => {
  const chikenName = 'Chicken Handi';
  const startRecipeBtn = 'Start Recipe';

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
    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    fireEvent.click(chickenBtn);

    const chicken = await screen.findByText(chikenName);
    expect(chicken).toBeInTheDocument();
  });
  it('Verifica se redireciona à página de detalhes quando clica no card Chicken', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    fireEvent.click(chickenBtn);

    const chicken = await screen.findByText(chikenName);
    expect(chicken).toBeInTheDocument();

    fireEvent.click(chicken);

    const startRecipe = await screen.findByText(startRecipeBtn);
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

    const startRecipe = await screen.findByText(startRecipeBtn);
    expect(startRecipe).toBeInTheDocument();
  });
  it('Verifica se aparece algumas receitas de comidas quando clica em All', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const allBtn = await screen.findByTestId('All-category-filter');
    fireEvent.click(allBtn);

    const chickenHandi = await screen.findByText('Chicken Handi');
    const cickenMushroomHotpot = await screen.findByText('Chicken & mushroom Hotpot');
    const chickenBasquaise = await screen.findByText('Chicken Basquaise');

    expect(chickenHandi).toBeInTheDocument();
    expect(cickenMushroomHotpot).toBeInTheDocument();
    expect(chickenBasquaise).toBeInTheDocument();
  });
  it('Verifica se aparece algumas receitas de bebidas quando clica em All', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const allBtn = await screen.findByTestId('All-category-filter');
    fireEvent.click(allBtn);

    const margarita = await screen.findByText('Margarita');
    const blueMargarita = await screen.findByText('Blue Margarita');
    const tommyMargarita = await screen.findByText('Tommy\'s Margarita');
    const whitecapMargarita = await screen.findByText('Whitecap Margarita');

    expect(margarita).toBeInTheDocument();
    expect(blueMargarita).toBeInTheDocument();
    expect(tommyMargarita).toBeInTheDocument();
    expect(whitecapMargarita).toBeInTheDocument();
  });
  it('deve acionar a função handleClick quando a tecla Enter for pressionada', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );

    const cardElement = await screen.findByText('Margarita');
    fireEvent.keyDown(cardElement, { key: 'Enter' });

    const margarita = await screen.findByText('Start Recipe');

    expect(margarita).toBeInTheDocument();
  });
});
