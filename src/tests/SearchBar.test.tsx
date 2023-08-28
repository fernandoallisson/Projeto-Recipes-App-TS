import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { makeMockFetch } from './mock';

describe('testando a Search Bar', () => {
  const btnToggleSearch = 'search-top-btn';
  const searchInput = 'search-input';
  const nameSeacrhRadio = 'name-search-radio';
  const execButton = 'exec-search-btn';

  test('Verifica o clique no botão de pesquisa se existe o campo de pesquisa name', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);
    const searchName = screen.getByText(/name/i);
    expect(searchName).toBeInTheDocument();
  });
  test('Verifica o clique no botão de pesquisa e se existe o campo de pesquisa ingredient', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);
    const searchFl = screen.getByText(/first letter/i);
    expect(searchFl).toBeInTheDocument();
  });
  test('Verifica o clique no botão de pesquisa e se existe o campo de pesquisa first letter', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);
    const searchIngredient = screen.getByText(/ingredient/i);
    expect(searchIngredient).toBeInTheDocument();
  });
  test('Verifica se aparece essa comida [Chicken Handi] pesquisando pelo NOME chicken', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);

    const input = screen.getByTestId(searchInput);
    fireEvent.change(input, { target: { value: 'chicken' } });

    const nameInput = screen.getByTestId(nameSeacrhRadio);
    fireEvent.click(nameInput);

    const searchSubmit = screen.getByTestId(execButton);
    fireEvent.click(searchSubmit);

    const chicken = screen.findByText(/Chicken Handi/i);
    expect(await chicken).toBeInTheDocument();
  });
  test('Verifica se aparece o nome [ Chicken Basquaise ] pesquisando pelo INGREDIENTE chicken', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);

    const input = screen.getByTestId(searchInput);
    fireEvent.change(input, { target: { value: 'chicken' } });

    const ingredientInput = screen.getByTestId('ingredient-search-radio');
    fireEvent.click(ingredientInput);

    const searchSubmit = screen.getByTestId(execButton);
    fireEvent.click(searchSubmit);

    const chicken = await screen.findByText(/Chicken Basquaise/i);
    expect(chicken).toBeInTheDocument();
  });
  test('Verifica se aparece o nome [Chicken & mushroom Hotpot] pesquisando pela PRIMEIRA LETRA A', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);

    const input = screen.getByTestId(searchInput);
    fireEvent.change(input, { target: { value: 'c' } });

    const firstLetterInput = screen.getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetterInput);

    const searchSubmit = screen.getByTestId(execButton);
    fireEvent.click(searchSubmit);

    const apple = await screen.findByText(/Chicken & mushroom Hotpot/i);
    expect(apple).toBeInTheDocument();
  });
  test('Verifica se aparece o nome [Margarita] pesquisando por vodka no filtro de ingredientes', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);

    const input = screen.getByTestId(searchInput);
    fireEvent.change(input, { target: { value: 'Margarita' } });

    const ingredientInput = screen.getByTestId('ingredient-search-radio');
    fireEvent.click(ingredientInput);

    const searchSubmit = screen.getByTestId(execButton);
    fireEvent.click(searchSubmit);

    const vodka = await screen.findByText(/Margarita/i);
    expect(vodka).toBeInTheDocument();
  });
  test('Verrifica se aparece o nome [Blue Margarita] pesquisando por vodka no filtro de nome', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);

    const input = screen.getByTestId(searchInput);
    fireEvent.change(input, { target: { value: 'margarita' } });

    const nameInput = screen.getByTestId(nameSeacrhRadio);
    fireEvent.click(nameInput);

    const searchSubmit = screen.getByTestId(execButton);
    fireEvent.click(searchSubmit);

    const vodka = await screen.findByText(/Blue Margarita/i);
    expect(vodka).toBeInTheDocument();
  });
  test('Verifica se aparece o nome [Tommy\'s Margarita] pesquisando pela PRIMEIRA LETRA V', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);

    const input = screen.getByTestId(searchInput);
    fireEvent.change(input, { target: { value: 'm' } });

    const firstLetterInput = screen.getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetterInput);

    const searchSubmit = screen.getByTestId(execButton);
    fireEvent.click(searchSubmit);

    const vesper = await screen.findByText(/Tommy's Margarita/i);
    expect(vesper).toBeInTheDocument();
  });
  // test('Verifica se é levaddo à rota /mels:id ao achar digitar sushi pelo nome', async () => {
  //   render(
  //     <MemoryRouter initialEntries={ ['/meals'] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const searchButton = screen.getByTestId(btnToggleSearch);
  //   fireEvent.click(searchButton);

  //   const input = screen.getByTestId(searchInput);
  //   fireEvent.change(input, { target: { value: 'sushi' } });

  //   const nameInput = screen.getByTestId(nameSeacrhRadio);
  //   fireEvent.click(nameInput);

  //   const searchSubmit = screen.getByTestId(execButton);
  //   fireEvent.click(searchSubmit);

  //   const sushi = await screen.findByText(/Sushi/i);
  //   expect(sushi).toBeInTheDocument();
  // });
  // test('Verifica se é levado à rota /drinks:id ao achar digitar Vesper pelo nome', async () => {
  //   render(
  //     <MemoryRouter initialEntries={ ['/drinks'] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const searchButton = screen.getByTestId(btnToggleSearch);
  //   fireEvent.click(searchButton);

  //   const input = screen.getByTestId(searchInput);
  //   fireEvent.change(input, { target: { value: 'Vesper' } });

  //   const nameInput = screen.getByTestId(nameSeacrhRadio);
  //   fireEvent.click(nameInput);

  //   const searchSubmit = screen.getByTestId(execButton);
  //   fireEvent.click(searchSubmit);

  //   const vesper = await screen.findByText(/Vesper/i);
  //   expect(vesper).toBeInTheDocument();
  // });
});
