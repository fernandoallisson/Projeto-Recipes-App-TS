import { useContext } from 'react';
import { AuthContext } from '../Context/index';

export function MealsDetail() {
  const { emailState } = useContext(AuthContext);
  const handleSubmit = () => {
    const { pathname } = window.location;
  };
  return (
    <label htmlFor="email">
      <div>
        <h1>{ emailState }</h1>
      </div>
      <button
        type="submit"
        data-testid="login-submit-btn"
        onClick={ () => handleSubmit() }
      >
        Enter
      </button>
    </label>
  );
}
