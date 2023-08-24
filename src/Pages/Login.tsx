import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/index';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();

  const { handleSetEmailState } = useContext(AuthContext);

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    handleSetEmailState(email);
    navigate('/meals');
  };

  return (
    <div>
      <label>
        Email:
        <input
          type="email"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !(regexEmail.test(email) && password.length > 6) }
        onClick={ () => handleSubmit() }
      >
        Entrar
      </button>
    </div>
  );
}
