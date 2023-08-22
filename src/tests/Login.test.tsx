import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../Pages/Login';

describe('testando a aplicação', () => {
  const EMAILID = 'email-input';
  const PASSWORDID = 'password-input';
  const LOGINBUTTONID = 'login-submit-btn';
  const EMAILTEST = 'teste@teste.com';

  test('testa se a aplicação tem os elemento necessários do Login', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const emailInput = screen.getByTestId(EMAILID);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(PASSWORDID);
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByTestId(LOGINBUTTONID);
    expect(loginButton).toBeInTheDocument();
  });
  test('testa se o botão está desabilitado quando o email não é válido', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const loginButton = screen.getByTestId(LOGINBUTTONID);
    expect(loginButton).toBeDisabled();
  });
  test('testa se o botão fica habilitado quando o email e senha é válido', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const loginButton = screen.getByTestId(LOGINBUTTONID);
    const emailInput = screen.getByTestId(EMAILID);
    const passwordInput = screen.getByTestId(PASSWORDID);

    fireEvent.change(emailInput, { target: { value: EMAILTEST } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(loginButton).not.toBeDisabled();
  });
  test('testa se salva as informações no localStorage', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const loginButton = screen.getByTestId(LOGINBUTTONID);
    const emailInput = screen.getByTestId(EMAILID);
    const passwordInput = screen.getByTestId(PASSWORDID);

    fireEvent.change(emailInput, { target: { value: EMAILTEST } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginButton);

    const user = localStorage.getItem('user');
    const userObject = JSON.parse(user || '{}');
    expect(userObject.email).toBe('test@test.com');
  });
});
