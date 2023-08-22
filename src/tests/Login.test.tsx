import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../Pages/Login';

describe('testando a aplicação', () => {
  test.only('renders Login component', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });
});
