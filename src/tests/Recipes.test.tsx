import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('testando a tela de receitas', () => {
  test('Verifica se as receitas são renderizadas', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const BeefButton = screen.getByTestId('Beef-recipe-card');
    expect(BeefButton).toBeInTheDocument();
  });

  test('Verifica se ao clicar em uma caregoria os elementos vem da API', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const btnOrdinaryDrink = screen.getByTestId('Ordinary Drink-category-filter');
    fireEvent.click(btnOrdinaryDrink);
    const drinksName = screen.getByText('3-Mile Long Island Iced Tea');
    expect(drinksName).toBeinTheDocument();
  });

  test('Verifica se ao clicar no card redireciona para o pagina de detalhes', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByTestId('0-recipe-card'));
    expect(screen.findAllByText('Detalhe de Drinks')).toBeInTheDocument();
  });
});
