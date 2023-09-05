import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { Header } from '../Components/Header';
import App from '../App';
import { mockFetch } from './mock';

describe('testando a aplicação', () => {
  beforeEach(() => {
    mockFetch();
  });

  test('Renderiza o título da aplicação', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
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
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId('toggle-search-button');
    fireEvent.click(searchButton);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    // expect(input).toBeVisible();
  });
  test('verifica se não existe o botão de search n página de Profile', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <App />
      </MemoryRouter>,
    );
    const input = screen.queryByTestId('search-input');
    expect(input).not.toBeInTheDocument();
  });
});
