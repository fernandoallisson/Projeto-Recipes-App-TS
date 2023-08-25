import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '../Components/Header';
import { Meals } from '../Pages/Meals';
import { Profile } from '../Pages/Profile';

describe('testando a Search Bar', () => {
  const btnToggleSearch = 'toggle-search-button';
  test('Renderiza o título da aplicação', () => {
    render(
      <Router>
        <Meals />
      </Router>,
    );
    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();
  });

  test('Verifica o clique no botão de pesquisase existe o campo de pesquisa name', () => {
    render(
      <Router>
        <Meals />
      </Router>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);
    const searchName = screen.getByText(/name/i);
    expect(searchName).toBeInTheDocument();
  });
  test('Verifica o clique no botão de pesquisa e se existe o campo de pesquisa ingredient', () => {
    render(
      <Router>
        <Meals />
      </Router>,
    );
    const searchButton = screen.getByTestId(btnToggleSearch);
    fireEvent.click(searchButton);
    const searchFl = screen.getByText(/first letter/i);
    expect(searchFl).toBeInTheDocument();
  });
});
