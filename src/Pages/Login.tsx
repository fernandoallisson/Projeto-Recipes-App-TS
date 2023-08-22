import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext, UserProvider } from '../Context';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const { emailState, setEmailState } = useUserContext();

  const handleSubmit = () => {
    navigate('/meals');
    localStorage.setItem('user', JSON.stringify({ email }));
    setEmailState(email);
  };

  return (
    <label>
      Email:
      <input
        type="email"
        data-testid="email-input"
        onChange={ (e) => setEmail(e.target.value) }
      />
      Senha:
      <input
        type="password"
        data-testid="password-input"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !(regexEmail.test(email) && password.length > 6) }
        onClick={ () => handleSubmit() }
      >
        Enter
      </button>
      <button onClick={ () => handleSubmit }>teste</button>
    </label>
  );
}
