import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Certifique-se de importar MemoryRouter
import { makeMockFetch } from './mock';
import App from '../App'; // Certifique-se de importar o componente App

// Importe o componente RecipeDetails ou o componente relevante que deseja testar
import { RecipeDetails } from '../Pages/RecipeDetails'; // Substitua pelo caminho real do componente

describe('testando a RecipeDetails', () => {
  const btnToggleSearch = 'search-top-btn';
  const searchInput = 'search-input';
  const nameSearchRadio = 'name-search-radio'; // Corrija o nome da variável
  const execButton = 'exec-search-btn';
  const firstLetterSearchRadio = 'first-letter-search-radio';
  const rotaSushi = '/meals/53065';
  const rotaVesper = '/drinks/17218';

  // Chame a função makeMockFetch antes de cada teste
  beforeEach(() => {
    makeMockFetch();
  });

  test('Verifica se na rota [/meals/53065] existe o nome [Sushi]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaSushi] }>
        <RecipeDetails />
        {' '}
        {/* Renderize o componente relevante */}
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const sushi = screen.getByRole('heading', { name: /sushi/i });
    expect(sushi).toBeInTheDocument();
  });

  test('Verifica se na rota [/meals/53065] existe imagem [Sushi]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaSushi] }>
        <RecipeDetails />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const sushi = screen.getByRole('img', { name: /sushi/i });
    expect(sushi).toBeInTheDocument();
  });
  test('Verifica se na rota [/meals/53065] existe categoria [Sushi]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaSushi] }>
        <App />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const searchCategory = screen.getByText(/category/i);
    expect(searchCategory).toBeInTheDocument();
  });
  test.only('Verifica se na rota [/meals/53065] existem a categoria de drink [GG}', () => {
    render(
      <MemoryRouter initialEntries={ [rotaSushi] }>
        <App />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const category = screen.getByRole('heading', { name: /gg/i });
    expect(category).toBeInTheDocument();
  });
  // test('Verifica se na rota [/meals/53065] existe a categoria de drink [A1]', () => {
  //   render(
  //     <MemoryRouter initialEntries={ [rotaSushi] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const execButton = screen.getByTestId('exec-search-btn');
  //   fireEvent.click(execButton);
  //   const category = screen.getByRole('heading', { name: /a1/i });
  //   expect(category).toBeInTheDocument();
  // });
  // test('Verifica se na rota [/meals/53065] existe a categoria de drink [Ace]', () => {
  //   render(
  //     <MemoryRouter initialEntries={ [rotaSushi] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const execButton = screen.getByTestId('exec-search-btn');
  //   fireEvent.click(execButton);
  //   const category = screen.getByRole('heading', { name: /ace/i });
  //   expect(category).toBeInTheDocument();
  // });
  // test('Verifica se na rota [/meals/53065] existe a categoria de drink [747]', () => {
  //   render(
  //     <MemoryRouter initialEntries={ [rotaSushi] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const execButton = screen.getByTestId('exec-search-btn');
  // fireEvent.click(execButton);
  //   const category = screen.getByRole('heading', { name: /747/i });
  //   expect(category).toBeInTheDocument();
  // });
  // test('Verifica se na rota [/meals/53065] existe a categoria de drink [KIR]', () => {
  //   render(
  //     <MemoryRouter initialEntries={ [rotaSushi] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const execButton = screen.getByTestId('exec-search-btn');
  //   fireEvent.click(execButton);
  //   const category = screen.getByRole('heading', { name: /kir/i });
  //   expect(category).toBeInTheDocument();
  // });
  // test('Verifica se na rota [/meals/53065] existe a categoria de drink [ABC]', () => {
  //   render(
  //     <MemoryRouter initialEntries={ [rotaSushi] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const execButton = screen.getByTestId('exec-search-btn');
  //   fireEvent.click(execButton);
  //   const category = screen.getByRole('heading', { name: /abc/i });
  //   expect(category).toBeInTheDocument();
  // });
  test('Verifica se na rota [/drinks/17218] existe a categoria de comida [Corba]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaSushi] }>
        <App />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const category = screen.getByRole('heading', { name: /corba/i });
    expect(category).toBeInTheDocument();
  });
  test('Verifica se na rota [/drinks/17218] existe a categoria de comida [Kumpir]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaVesper] }>
        <App />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const category = screen.getByRole('heading', { name: /kumpir/i });
    expect(category).toBeInTheDocument();
  });
  test('Verifica se na rota [/drinks/17218] existe a categoria de comida [Burek]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaVesper] }>
        <App />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const category = screen.getByRole('heading', { name: /burek/i });
    expect(category).toBeInTheDocument();
  });
  test('Verifica se na rota [/drinks/17218] existe a categoria de comida [Sushi]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaVesper] }>
        <App />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const category = screen.getByText(/sushi/i);
    expect(category).toBeInTheDocument();
  });
  test('Verifica se na rota [/drinks/17218] existe a categoria de comida [Bistek', () => {
    render(
      <MemoryRouter initialEntries={ [rotaVesper] }>
        <App />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const category = screen.getByText(/bistek/i);
    expect(category).toBeInTheDocument();
  });
  test('Verifica se na rota [/drinks/17218] existe a categoria de comida [Tamiya]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaVesper] }>
        <App />
      </MemoryRouter>,
    );
    const execButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execButton);
    const category = screen.getByText(/tamiya/i);
    expect(category).toBeInTheDocument();
  });
});
