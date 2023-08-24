import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, FetchMealsContext } from '../Context';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();

  const { handleSetEmailState } = useContext(AuthContext);
  const { mealsState } = useContext(FetchMealsContext);
  const { meals } = mealsState;

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    handleSetEmailState(email);
    navigate('/meals');
  };

  const handleTeste = () => {
    console.log('teste');
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
      <button onClick={ handleTeste }>Teste</button>
      <div>
        { meals && meals.map((meal: any) => (
          <div key={ meal.idMeal }>
            <p data-testid={ `${meal.strMeal}-card-name` }>{ meal.strMeal }</p>
          </div>
        ))}
        {/* exemplo de como usar o context do meals OBS: replicar no drinks */}
        ;
      </div>
    </label>
  );
}
