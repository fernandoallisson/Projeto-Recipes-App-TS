import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Certifique-se de importar MemoryRouter
import { makeMockFetch } from './mock';

// Importe o componente RecipeDetails ou o componente relevante que deseja testar
import { RecipeDetails } from '../Pages/RecipeDetails'; // Substitua pelo caminho real do componente

describe('testando a RecipeDetails', () => {
  const btnToggleSearch = 'search-top-btn';
  const searchInput = 'search-input';
  const nameSearchRadio = 'name-search-radio'; // Corrija o nome da variável
  const execButton = 'exec-search-btn';
  const firstLetterSearchRadio = 'first-letter-search-radio';
  const rotaSushi = '/meals/53065';

  // Chame a função makeMockFetch antes de cada teste
  beforeEach(() => {
    makeMockFetch();
  });

  test.only('Verifica se na rota [/meals/53065] existe o nome [Sushi]', () => {
    render(
      <MemoryRouter initialEntries={[rotaSushi]}>
        <RecipeDetails /> {/* Renderize o componente relevante */}
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);
    const searchName = screen.getByText(/sushi/i);
    const sushi = screen.getByRole('heading', { name: /sushi/i });
    expect(sushi).toBeInTheDocument();
  });
});

  test('Verifica se na rota [/meals/53065] existe imagem [Sushi]', () => {
    render(
      <MemoryRouter initialEntries={ [rotaSushi] }>
        <App />
      </MemoryRouter>,
    );
    // const searchButton = screen.getByTestId(btnToggleSearch);
    // fireEvent.click(searchButton);
    // const searchFl = screen.getByText(/first letter/i);
    const sushi = screen.getByRole('img', { name: /sushi/i });
    expect(sushi).toBeInTheDocument();
  });
  test('Verifica se na rota [/meals/53065] existem 6 recomendacões de drinks', () => {
    render(
      <MemoryRouter initialEntries={ [rotaSushi] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);
    const searchIngredient = screen.getByText(/ingredient/i);
    expect(searchIngredient).toBeInTheDocument();
  });
  //   test('Verifica se aparece essa comida [Chicken Handi] pesquisando pelo NOME chicken', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/meals'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'chicken' } });

  //     const nameInput = screen.getByTestId(nameSeacrhRadio);
  //     fireEvent.click(nameInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     const chicken = screen.findByText(/Chicken Handi/i);
  //     expect(await chicken).toBeInTheDocument();
  //   });
  //   test('Verifica se aparece o nome [ Chicken Basquaise ] pesquisando pelo INGREDIENTE chicken', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/meals'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'chicken' } });

  //     const ingredientInput = screen.getByTestId('ingredient-search-radio');
  //     fireEvent.click(ingredientInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     const chicken = await screen.findByText(/Chicken Basquaise/i);
  //     expect(chicken).toBeInTheDocument();
  //   });
  //   test('Verifica se aparece o nome [Chicken & mushroom Hotpot] pesquisando pela PRIMEIRA LETRA A', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/meals'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'c' } });

  //     const firstLetterInput = screen.getByTestId(firstLetterSearchRadio);
  //     fireEvent.click(firstLetterInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     const apple = await screen.findByText(/Chicken & mushroom Hotpot/i);
  //     expect(apple).toBeInTheDocument();
  //   });
  //   test('Verifica se aparece o nome [Whitecap] pesquisando por Whitecap no filtro de ingredientes', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/drinks'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'Whitecap' } });

  //     const ingredientInput = screen.getByTestId('ingredient-search-radio');
  //     fireEvent.click(ingredientInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     const margarita = await screen.findByText(/Whitecap Margarita/i);
  //     expect(margarita).toBeInTheDocument();
  //   });
  //   test('Verrifica se aparece o nome [Blue Margarita] pesquisando por vodka no filtro de nome', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/drinks'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'margarita' } });

  //     const nameInput = screen.getByTestId(nameSeacrhRadio);
  //     fireEvent.click(nameInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     const vodka = await screen.findByText(/Blue Margarita/i);
  //     expect(vodka).toBeInTheDocument();
  //   });
  //   test('Verifica se aparece o nome [Tommy\'s Margarita] pesquisando pela PRIMEIRA LETRA V', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/drinks'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'm' } });

  //     const firstLetterInput = screen.getByTestId(firstLetterSearchRadio);
  //     fireEvent.click(firstLetterInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     const vesper = await screen.findByText(/Tommy's Margarita/i);
  //     expect(vesper).toBeInTheDocument();
  //   });
  //   test('Verifica se é levaddo à rota /mels:id ao achar digitar sushi pelo nome', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/meals'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'sushi' } });

  //     const nameInput = screen.getByTestId(nameSeacrhRadio);
  //     fireEvent.click(nameInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     const sushi = await screen.findByText(/Meals Detail/i);
  //     expect(sushi).toBeInTheDocument();
  //   });
  //   test('Verifica se é levado à rota /drinks:id ao achar digitar Vesper pelo nome', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/drinks'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'vesper' } });

  //     const nameInput = screen.getByTestId(nameSeacrhRadio);
  //     fireEvent.click(nameInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     const vesper = await screen.findByText(/Drink Details/i);
  //     expect(vesper).toBeInTheDocument();
  //   });
  //   test('Verifica se aparece um alert com a mensagem "Sorry, we haven\'t found any recipes for these filters."', async () => {
  //     makeMockFetch();
  //     render(
  //       <MemoryRouter initialEntries={ ['/meals'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'xablau' } });

  //     const nameInput = screen.getByTestId(nameSeacrhRadio);
  //     fireEvent.click(nameInput);

  //     // Cria um mock para o window.alert
  //     vi.spyOn(window, 'alert');
  //     // window.alert = vi.fn();

  //     // Clique no botão de pesquisa
  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     // Verifica se o window.alert foi chamado
  //     await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  //   });
  //   test('Verifica se aparece um alert com a mensagem "Sorry, we haven\'t found any recipes for these filters."', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/drinks'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'xablau' } });

  //     const nameInput = screen.getByTestId(nameSeacrhRadio);
  //     fireEvent.click(nameInput);

  //     // Cria um mock para o window.alert
  //     vi.spyOn(window, 'alert');

  //     // Clique no botão de pesquisa
  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     // Verifica se o window.alert foi chamado
  //     await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  //   });
  //   test('Verifica se aparece um alert com a mensagem "Your search must have only 1 (one) character"', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/meals'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'xx' } });

  //     vi.spyOn(window, 'alert');

  //     const firstLetterInput = screen.getByTestId(firstLetterSearchRadio);
  //     fireEvent.click(firstLetterInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character'));
  //   });
  //   test('Verifica se aparece um alert com a mensagem "Please, select an option', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/meals'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );

  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     vi.spyOn(window, 'alert');

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Please, select an option'));
  //   });
  //   test('Verifica se aparece um alert com a mensagem "Your search must have only 1 (one) character"', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/drinks'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     const input = screen.getByTestId(searchInput);
  //     fireEvent.change(input, { target: { value: 'xx' } });

  //     vi.spyOn(window, 'alert');

  //     const firstLetterInput = screen.getByTestId(firstLetterSearchRadio);
  //     fireEvent.click(firstLetterInput);

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

  //     await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character'));
  //   });
  //   test('Verifica se aparece um alert com a mensagem "Please, select an option', async () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/drinks'] }>
  //         <App />
  //       </MemoryRouter>,
  //     );

  //     const searchButton = screen.getByTestId(btnToggleSearch);
  //     fireEvent.click(searchButton);

  //     vi.spyOn(window, 'alert');

  //     const searchSubmit = screen.getByTestId(execButton);
  //     fireEvent.click(searchSubmit);

//     await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Please, select an option'));
//   });
});
