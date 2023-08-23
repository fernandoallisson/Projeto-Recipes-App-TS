import { useContext } from 'react';
import { AuthContext } from '../Context/index';
import { Header } from '../Components/Header/Index';

export function Profile() {
  const { emailState } = useContext(AuthContext);

  const handleSubmit = () => {
    const { pathname } = window.location;
  };
  return (

    <>
      <div>
        <Header title="Profile" />
        <h1>{emailState}</h1>
      </div>

      <label htmlFor="email">
        <div>
          <h1>{emailState}</h1>
        </div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          onClick={ () => handleSubmit() }
        >
          Enter
        </button>
      </label>

    </>
  );
}
