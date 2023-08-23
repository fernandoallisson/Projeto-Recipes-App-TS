import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../Pages/Login';
import App from '../App';
import { Header, HeaderProps } from '../Components/Header/Index';

describe('testando a aplicação', () => {
  test('Renderiza o título da aplicação', () => {
    render(
      <Router>
        <Header title="Recipe App" />
      </Router>,
    );
    const titulo = screen.getByText('Recipe App');
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
});

//     const emailInput = screen.getByTestId(EMAILID);
//     expect(emailInput).toBeInTheDocument();

//     const passwordInput = screen.getByTestId(PASSWORDID);
//     expect(passwordInput).toBeInTheDocument();

//     const loginButton = screen.getByTestId(LOGINBUTTONID);
//     expect(loginButton).toBeInTheDocument();
//   });
//   test('testa se o botão está desabilitado quando o email não é válido', () => {
//     render(
//       <Router>
//         <Login />
//       </Router>,
//     );
//     const loginButton = screen.getByTestId(LOGINBUTTONID);
//     expect(loginButton).toBeDisabled();
//   });
//   test('testa se o botão fica habilitado quando o email e senha é válido', () => {
//     render(
//       <Router>
//         <Login />
//       </Router>,
//     );
//     const loginButton = screen.getByTestId(LOGINBUTTONID);
//     const emailInput = screen.getByTestId(EMAILID);
//     const passwordInput = screen.getByTestId(PASSWORDID);

//     fireEvent.change(emailInput, { target: { value: EMAILTEST } });
//     fireEvent.change(passwordInput, { target: { value: '1234567' } });

//     expect(loginButton).not.toBeDisabled();
//   });
//   test('testa se a rota muda para /meals', () => {
//     render(
//       <Router>
//         <App />
//       </Router>,
//     );
//     const loginButton = screen.getByTestId(LOGINBUTTONID);
//     const emailInput = screen.getByTestId(EMAILID);
//     const passwordInput = screen.getByTestId(PASSWORDID);

//     fireEvent.change(emailInput, { target: { value: EMAILTEST } });
//     fireEvent.change(passwordInput, { target: { value: '1234567' } });
//     fireEvent.click(loginButton);

//     const mealsTitle = screen.getByRole('heading', { name: /comidas/i });
//     expect(mealsTitle).toBeInTheDocument();
//   });
