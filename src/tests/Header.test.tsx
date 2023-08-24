import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '../Components/Header/Header';
import { Meals } from '../Pages/Meals';
import { Profile } from '../Pages/Profile';

describe('testando a aplicação', () => {
  test('Renderiza o título da aplicação', () => {
    render(
      <Router>
        <Meals />
      </Router>,
    );
    const titulo = screen.getByRole('heading', { name: /recipe app/i });
    expect(titulo).toBeInTheDocument();
  });

  test('Renderiza links de navegação', () => {
    render(
      <Router>
        <Header title="Recipe App" />
      </Router>,
    );
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(1);
  });

  test('Verifica se os links têm os atributos corretos', () => {
    render(
      <Router>
        <Header title="Recipe App" />
      </Router>,
    );
    const links = screen.getAllByRole('link');

    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('href')).toMatch(/^\/\w+/); // Verifica se o href começa com '/' seguido de uma palavra.
    });
  });
  test('verifica o click no botão de search', () => {
    render(
      <Router>
        <Meals />
      </Router>,
    );
    const searchButton = screen.getByTestId('toggle-search-button');
    fireEvent.click(searchButton);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
  });
  test('verifica se não existe o botão de search n página de Profile', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );
    const input = screen.queryByTestId('search-input');
    expect(input).not.toBeInTheDocument();
  });
});
